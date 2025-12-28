function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function appendPostToList(post, list) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = post.url;
    a.textContent = post.title;

    const meta = document.createElement('span');
    meta.className = 'post-meta';
    meta.textContent = formatDate(post.published);

    li.appendChild(a);
    li.appendChild(meta);
    list.appendChild(li);
}

function showMorePostsLink(list, posts) {
    const li = document.createElement('li');
    li.className = 'more-posts';

    const a = document.createElement('a');
    a.href = '#show-posts';
    a.textContent = 'View all posts';
    a.addEventListener('click', event => {
        event.preventDefault();
        posts.slice(5).forEach(post => appendPostToList(post, list));
    });

    li.appendChild(a);
    list.appendChild(li);
}

function showError(postsList) {
    postsList.classList.add('error');
    postsList.innerHTML = '<li>The server did not respond with posts :(</li>';
}

(async () => {
    const postsList = document.querySelector('#recent-posts');
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();

        postsList.innerHTML = '';

        const recent = posts.slice(0, 5);
        for (const post of recent)
            appendPostToList(post, postsList);

        if (posts.length > 5) showMorePostsLink(postsList, posts);
    } catch (err) {
        console.error(err);
        showError(postsList);
    }
})();
