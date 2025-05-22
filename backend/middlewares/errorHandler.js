const errorhandler = (err, req, res, next) => {
    if (err) {
        // change the status code to 500 if the status code is still 200 
        const statusCode = res.statusCode === 200 ? 500 : res.statuscode;
        res.status(statusCode);
        // send the err message to the user along with the stack
        res.json({
            message: err.message,
            stack: err.stack
        })
    }
    else {
        next()
    }
}

module.exports = errorhandler;