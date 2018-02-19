import 'babel-polyfill';
import 'whatwg-fetch';


(() => {
    window.addEventListener('load', () => {
        const new_blog = document.getElementById('post-new-blog'),
            controls = document.getElementById('controls');

        if (new_blog)
            new_blog.addEventListener('click', post);

        if (controls) {
            for (let button of controls.childNodes) {
                switch (button.value) {
                    case 'edit':
                        button.addEventListener('click', editBlog);
                        break;
                    case 'delete':
                        button.addEventListener('click', deleteBlog);
                        break;
                    case 'save':
                        button.addEventListener('click', saveChanges);
                        break;
                }
            }
        }
    });
})(window, document, undefined);

const post = () => {
    const title = document.getElementById('blog-title'),
        body = document.getElementById('blog-body');

    fetch(`/api/blogs/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value
        })
    })
        .then(response => response.json())
        .then(item => {
            title.value = '';
            body.value = '';

            const block = document.getElementById('reading'),
                div = document.createElement('div'),
                time = document.createElement('time'),
                link = document.createElement('a');

            link.href = `api/blogs/${item._id}`;
            link.innerText = item.title;
            time.innerText = item.date;

            div.append(time);
            div.appendChild(link);
            block.appendChild(div);

            document.getElementById('empty-blog').remove();
        })
};

const editBlog = () => {
    const title_div = document.getElementById('title-div'),
        body_div = document.getElementById('body-div'),
        controls = document.getElementById('controls');

    const input = document.createElement('input'),
        textarea = document.createElement('textarea');

    input.value = title_div.innerText;
    input.id = 'blog-title';
    textarea.value = body_div.innerText;
    textarea.id = 'blog-body';

    title_div.innerHTML = '';
    title_div.appendChild(input);
    body_div.innerHTML = '';
    body_div.appendChild(textarea);

    for (let button of controls.childNodes)
        button.style.visibility = button.value === 'save' ? '' : 'hidden';
};

const saveChanges = () => {
    const id = document.getElementById('blog-reading').dataset.id,
        title = document.getElementById('blog-title').value,
        body = document.getElementById('blog-body').value,
        controls = document.getElementById('controls');

    fetch(`/api/blogs/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body
        })
    })
        .then(() => {
            document.getElementById('title-div').innerHTML = `<h2>${title}</h2>`;
            document.getElementById('body-div').innerHTML = `<span>${body}</span>`;

            for (let button of controls.childNodes)
                button.style.visibility = button.value !== 'save' ? '' : 'hidden';
        })
};

const deleteBlog = () => {
    const id = document.getElementById('blog-reading').dataset.id;

    fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            document.location.href = '/';
        });
};