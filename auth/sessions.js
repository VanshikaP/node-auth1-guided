const bcrypt = require('bcryptjs');

const router = require("express").Router();


const rounds = process.env.HASHING_ROUNDS || 8;
const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    // pwd will be hashed and re-hashed 2^8 times
    const hash = bcrypt.hashSync(userInfo.password, rounds);

    userInfo.password = hash;

    Users.add(userInfo)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    const { username, password} = req.body;

    Users.findBy({username})
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                //remember this client
                req.session.user = {
                    id: user.id,
                    username: user.username
                };
                res.status(200).json({ message: `hello ${user.username}`});
            } else {
                res.status(401).json({ message: 'invalid credentials' });
            }
        })
        .catch(err =>{
            res.status(500).json({ message: 'error finding the user' });
        });
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({ message: 'you can checkout any time you like, but you can never log out' });
            } else {
                res.status(200).json({ message: 'successfully logged out' });
                // res.status(204).end(); - all good but no data for you
            }
        })
    } else {
        res.status(204).end();
    }
})

module.exports = router;
