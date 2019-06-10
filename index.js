const { Daemon, FunctionParser } = require('functionscript');

const cluster = require('cluster');
const PORT = process.env.PORT || 8000;
const MAX_REQUEST_SIZE = process.env.MAX_REQUEST_SIZE && parseInt(process.env.MAX_REQUEST_SIZE) || null;

if (cluster.isMaster) {

  // Start HTTP Daemon
  new Daemon(1).start(PORT);

} else {

  // Cluster to Gateway
  let gateway = new Daemon.Gateway({
    port: PORT,
    maxRequestSizeMB: MAX_REQUEST_SIZE,
    debug: true
  });
  let functionParser = new FunctionParser();
  try {
    gateway.define(functionParser.load(process.cwd(), 'functions'));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  gateway.listen();

}
