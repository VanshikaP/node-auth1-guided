const bcrypt = require('bcryptjs');

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const userInfo = req.body;

    // pwd will be hashed and re-hashed 2^8 times
    const rounds = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, rounds);

    userInfo.password = hash;

    Users.add(userInfo)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
        });

module.exports = router;
