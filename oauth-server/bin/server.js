const http = require("http");

const logger = require("../../common/logger");
const app = require("../src/app");

const port = 3000;

http.createServer(app).listen(port);

logger.info(`listening on port ${port}`);
