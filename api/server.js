const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router.js');
const restricted = require('../auth/restricted-middleware.js');
const knex = require('../database/dbConfig.js'); // needed for storing session in the database

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
