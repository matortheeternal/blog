import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import renderPost from './post.html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_POSTS_DIR = path.join(PUBLIC_DIR, 'posts');
const POSTS_JSON_PATH = path.join(PUBLIC_DIR, 'posts.json');

marked.setOptions({
    mangle: false,
    headerIds: true
});

function getGitDates(filePath) {
    const published = execSync(
        `git log --reverse --format=%aI -- "${filePath}"`,
        { encoding: 'utf8' }
    ).split('\n')[0];

    const modified = execSync(
        `git log -1 --format=%aI -- "${filePath}"`,
        { encoding: 'utf8' }
    ).trim();

    return { published, modified };
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function buildPosts(files) {
    return files.map(file => {
        const filePath = path.join(POSTS_DIR, file);
        const slug = path.basename(file, '.md');
        const raw = fs.readFileSync(filePath, 'utf8');

        const match = raw.match(/^#\s+(.+)$/m);
        if (!match) {
            console.error(`Post "${file}" has no top-level heading`);
            return;
        }

        const title = match[1];
        const content = marked(raw.slice(match[0].length));
        const dates = getGitDates(filePath);
        const url = `posts/${slug}/`;

        return { slug, title, content, ...dates, url };
    }).filter(Boolean);
}

function assignPrevNext(posts) {
    posts.sort((a, b) =>
        new Date(b.published) - new Date(a.published)
    );

    posts.forEach((post, i) => {
        post.prev = posts[i + 1];
        post.next = posts[i - 1];
    });
}

function savePosts(posts) {
    posts.forEach(post => {
        const postHtml = renderPost(post);
        const postDir = path.join(OUTPUT_POSTS_DIR, post.slug);
        ensureDir(postDir);

        const postHtmlPath = path.join(postDir, 'index.html');
        fs.writeFileSync(postHtmlPath, postHtml, 'utf8');
    });

    const postsJson = JSON.stringify(posts.map(post => ({
        title: post.title,
        published: post.published,
        modified: post.modified,
        url: post.url
    })), null, 2);
    fs.writeFileSync(POSTS_JSON_PATH, postsJson, 'utf8');
}

export default function build() {
    ensureDir(OUTPUT_POSTS_DIR);

    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md'));

    const posts = buildPosts(files);
    assignPrevNext(posts);
    savePosts(posts);

    console.log(`Built ${posts.length} post(s).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    build()
}
