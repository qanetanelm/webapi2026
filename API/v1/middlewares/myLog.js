module.exports = (req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.statusCode} ${req.ip}--My Log`);
    next();
};