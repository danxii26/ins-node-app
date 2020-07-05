window.onload = () => {
    const userId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

    $.ajax({
        type: 'get',
        url: `/api/users/${userId}`,
        success: (data) => {
            $('#newsfeed').append(`
                ${data.posts.map((post) => {
                    return `
                        <h2>${post.content}</h2>
                    `
                })}
            `);
        },
        error: (error) => {
            console.log(error)
        }
    });
}