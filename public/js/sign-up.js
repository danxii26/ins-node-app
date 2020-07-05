window.onload = () => {
    const form = document.getElementById('sign-up-form');
    form.addEventListener('submit', (e) => {
        event.preventDefault();
        const userInformation = {
            email: form.email.value,
            username: form.username.value,
            password: form.password.value,
            password_confirmation: form.password_confirmation.value,
        };
        $.ajax({
            type: 'post',
            url: '/sign-up',
            data: {
                email: userInformation.email,
                username: userInformation.username,
                password: userInformation.password,
                password_confirmation: userInformation.password_confirmation
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