module.exports = (req, res, next) => {
    // check that we remember the client,
    // that the client is logged in already
    console.log('session', req.session);

    next();
}