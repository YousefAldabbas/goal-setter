// all middleware is a function that executes during the request response sycle
//err to override the default error handler
const errorHandler = (err, req, res, next) => {
// change middleware default error handler from html to json
const statusCode = res.statusCode ? res.statusCode : 500;

res.status(statusCode)
res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack //aditional info for development
})

}

module.exports = {
    errorHandler,
}