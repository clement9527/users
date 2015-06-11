/**
 * Configurations used by development
 *
 * @type {{db: string, port: number, secret: string, timeoutInMin: number}}
 */
module.exports = {
    db : "mongodb://localhost/dev",
    port : 3000,
    secret: "i2x interview",
    timeoutInMin: 10
};