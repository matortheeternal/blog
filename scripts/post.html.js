function modifiedTitle(published, modified) {
    return modified - published < 86400000
        ? `title="Last modified ${modified.slice(0, 10)}"`
        : '';
}

function indent(str, n) {
    return str.split('\n').map(line => ' '.repeat(n) + line).join('\n');
}

function makePostNav(prev, next) {
    return [prev, next].map((post, index) => {
        if (!post) return '<a></a>';
        const linkClass = index === 0 ? 'prev' : 'next';
        return post
            ? `<a class="${linkClass}" href="${post.url}">${post.title}</a>`
            : '<a></a>';
    }).join('');
}

export default ({ title, content, published, modified, prev, next }) =>
`<!doctype html>
<html lang="en">
<head>
    <base href="/blog/" />
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="night.css" disabled/>
    <link rel="stylesheet" href="day.css" disabled/>
    <link rel="stylesheet" href="style.css" />
    <script src="themeManager.js"></script>
</head>
<body>
    <main class="page">
        <nav><a href=".">Back to all posts</a></nav>
        <article class="container">
            <h1>${title}</h1>
            <p class="meta">
                <span>Published by <a href="/">Mator</a></span>
                <span ${modifiedTitle(published, modified)}>
                    ${published.slice(0, 10)}
                </span>
            </p>
            ${indent(content, 12).trim()}
        </article>
        <nav class="post-nav">
            ${makePostNav(prev, next)}
        </nav>
    </main>
</body>
</html>`;
