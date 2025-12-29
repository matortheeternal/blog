import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import build from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '..', 'posts');

let timer = null;
fs.watch(POSTS_DIR, { recursive: true }, (eventType, filename) => {
    if (!filename || !filename.endsWith('.md')) return;

    clearTimeout(timer);
    timer = setTimeout(() => {
        try {
            build();
        } catch (err) {
            console.error('Build failed:', err);
        }
    }, 50);
});

console.log('Watching posts…');
