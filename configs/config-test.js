/**
 * Configurations used by API integration tests
 *
 * @type {{db: string, port: number, secret: string, timeoutInMin: number}}
 */
module.exports = {
    db : "mongodb://localhost/test",
    port : 3001,
    secret: "api test",
    timeoutInMin: 1
};