window.onload = () => {
    const userId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

    $.ajax({
        type: 'get',
        url: `/api/users/${userId}`,
        success: (data) => {
            $('#newsfeed').append(`
                ${data.posts.map((post) => {
                    return `
                        <h2>${data.information.username}</h2>
                        <p>${post.content}</p>
                        <a href="">Like ${post.like}</a>
                        <br>
                        ${post.comment.map((cmt) => {
                            return `
                                <span>${cmt.username}: <small>${cmt.content}</small></span>
                                <br>
                                <form class="comment-form">
                                    <input type="text" placeholder="write a comment" name="comment">
                                    <button type="submit" class="btn-primary">comment</button>
                                </form>
                            `
                        })}
                    `
                })}
            `);
            const form = document.getElementsByClassName('comment-form');
            console.log(form[1])
            if (form) {
                form.addEventListener('submit', (e) => {
                    event.preventDefault();
                    const commentContent = {
                        comment: form.comment.value
                    };
                    console.log(commentContent)
                    $.ajax({
                        type: 'post',
                        url: `/users/${userId}/`,
                        data: {
                            comment: commentContent
                        },
                        success: (data) => {
                            if (typeof data.message === 'string') {
                                if (data.message === 'email already exists'){
                                    $('#error-email').append(`
                                        <small>${data.message}</small>
                                    `);
                                    setTimeout(() => {window.location.href = `/sign-up`}, 2000)
                                } else if (data.message === 'password is at least 6 characters') {
                                    $('#error-password').append(`
                                        <small>${data.message}</small>
                                    `);
                                    setTimeout(() => {window.location.href = `/sign-up`}, 2000)
                                } else {
                                    $('#error-password-confirmation').append(`
                                        <small>${data.message}</small>
                                    `);
                                    setTimeout(() => {window.location.href = `/sign-up`}, 2000)
                                }
                            } else {
                                window.location.href = `/sign-in`
                            }
                        },
                        error: (error) => {
                            console.log(error);
                        }
                    });
                })
            }
        },
        error: (error) => {
            console.log(error)
        }
    });
}