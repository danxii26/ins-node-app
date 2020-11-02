const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/sign-up', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/html/sign-up.html'));
});

server.post('/sign-up', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('Server err')
        } 
        const users = JSON.parse(data);
        let user;
        users.forEach(item => {
            if (item.information.email == req.body.email) {
                user = item;
            }
        });
        if (user) {
            res.status(200).json({
                message: "email already exists"
            })
        } else {
            if (req.body.password.length < 6) {
                res.status(200).json({
                    message: "password is at least 6 characters"
                })
            } else if (req.body.password != req.body.password_confirmation) {
                res.status(200).json({
                    message: "password confirmation does not match"
                })
            } else {
                newUser = {
                    id: users.length,
                    information: {
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                    },
                    posts: [],
                    following: [],
                    follower: [],
                    createAt: new Date().toLocaleString()
                }
                users.push(newUser);
                fs.writeFile('./data.json', JSON.stringify(users), (err) => {
                    if (err) {
                        res.status(500).send('Server err')
                    } 
                    res.status(200).json(newUser);
                })
            }
        }
    })
})

server.get('/sign-in', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/html/sign-in.html'));
});

server.post('/sign-in', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('Server err')
        }
        const users = JSON.parse(data);
        let user;
        users.forEach(item => {
            if (item.information.email == req.body.email) {
                user = item;
            }
        });
        if (user) {
            if (user.information.password == req.body.password) {
                res.status(200).json(user);
            } else {
                res.status(200).json({
                    message: "password incorrect"
                });
            }
        } else {
            res.status(200).json({
                message: "email does not exist"
            });
        }
    })
});
// /users/${userId}/${post.content}/comment
server.post('/users/:userId/:postContent/comment', (req, res) => {
    try {
        const { userId, postContent } = req.params;
        console.log(req.body)
        fs.readFile('./data.json', (err, data) => {
            if (err) {
                res.status(500).send('Server err')
            }
            const users = JSON.parse(data);
            users.forEach(user => {
                if (user.id == userId) {
                    res.status(200).json(user);
                }
            });
        })
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'server error');
    }
});

server.get('/users/:userId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/html/newsfeed.html'));
}); 

server.get('/api/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        fs.readFile('./data.json', (err, data) => {
            if (err) {
                res.status(500).send('Server err')
            }
            const users = JSON.parse(data);
            users.forEach(user => {
                if (user.id == userId) {
                    res.status(200).json(user);
                }
            });
        })
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'server error');
    }
});

server.get('/posts', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/post-new.html'));
});

server.post('/posts', (req, res) => {
    // fs.readFile('./data.json', (err, data) => {
    //     if (err) {
    //         res.status(500).send('Server err')
    //     } 
    //     const users = JSON.parse(data);
    //     users.push({
    //         id: users.length,
    //         information: {
    //             email: req.body.email,
    //             username: req.body.username,
    //             password: req.body.password
    //         },
    //         posts: [],
    //         following: [],
    //         follower: [],
    //         createAt: new Date().toLocaleString()
    //     })
    //     fs.writeFile('./data.json', JSON.stringify(users), (err) => {
    //         if (err) {
    //             res.status(500).send('Server err')
    //         } 
    //         res.status(201).end('success');
    //     })
    // })
});

server.listen(3001, (error) => {
  if (error) {
    throw error;
  }
  console.log('Server listen on port 3000...');
});
