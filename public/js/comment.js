window.onload = () => {
    const form = document.getElementById('comment-form');
    form.addEventListener('submit', (e) => {
        event.preventDefault();
        const commentContent = {
            comment: form.comment.value
        };
        $.ajax({
            type: 'post',
            url: `/users/${userId}/comment`,
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