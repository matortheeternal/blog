let currentTheme = null;
let themeToggle = null;
let rotation = 0;

const themeStyleTags = {
    dark: document.querySelector('link[href="night.css"]'),
    light: document.querySelector('link[href="day.css"]')
};

const svg = (
    `<svg viewBox="0 0 100 200" class="icon">
        <circle cx="50" cy="150" r="25" class="sun" />
        <circle cx="50" cy="50" r="25" class="moon" />
        <circle cx="35" cy="50" r="20" class="moon-cutout" />
    </svg>`
);

function getInitialTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark';
    if (window.matchMedia('(prefers-color-scheme: light)').matches)
        return 'light';
    const hour = new Date().getHours();
    return (hour >= 8 && hour < 17) ? 'light' : 'dark';
}

function setTheme(theme) {
    if (currentTheme) themeStyleTags[currentTheme].disabled = true;
    if (currentTheme || theme !== 'light') rotation++;
    themeStyleTags[theme].disabled = false;
    currentTheme = theme;
    themeToggle.style.transform = `translateY(-50%) rotate(${rotation * 180}deg)`;
}

function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function createThemeToggle() {
    const div = document.createElement('div');
    div.className = 'theme-toggle';
    div.title = 'Click to toggle between dark and light theme';
    div.innerHTML = svg;
    div.addEventListener('click', toggleTheme);
    document.body.appendChild(div);
    return div;
}

document.addEventListener('DOMContentLoaded', () => {
    themeToggle = createThemeToggle();
    setTheme(getInitialTheme());
    setTimeout(() => {
        document.documentElement.classList.add('transitions-enabled');
    }, 500)
});
