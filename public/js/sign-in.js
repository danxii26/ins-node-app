window.onload = () => {
    const form = document.getElementById('sign-in-form');
    form.addEventListener('submit', (e) => {
        event.preventDefault();
        const userInformation = {
            email: form.email.value,
            password: form.password.value
        };
        $.ajax({
            type: 'post',
            url: '/sign-in',
            data: {
                email: userInformation.email,
                password: userInformation.password
            },
            success: (data) => {
                if (typeof data.message === 'string') {
                    if (data.message === 'password incorrect'){
                        $('#error-password').append(`
                            <small>${data.message}</small>
                        `);
                        setTimeout(() => {window.location.href = `/sign-in`}, 3000)
                    } else {
                        $('#error-email').append(`
                            <small>${data.message}</small>
                        `);
                        setTimeout(() => {window.location.href = `/sign-in`}, 3000)
                    }
                } else {
                    window.location.href = `/users/${data.id}`
                }
            },
            error: (error) => {
                console.log(error);
            }
        });
    })
}