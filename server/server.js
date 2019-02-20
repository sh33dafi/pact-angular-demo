const port = 9000 || process.env.API_PORT;
const server = require('./provider').server;
server.listen(port, () => {
    console.log(`Provider Service listening on http://localhost:${port}`)
});
