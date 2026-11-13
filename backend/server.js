require('./db');
require('./seed')();
const createApp = require('./app');
const port = Number(process.env.PORT || 5050);
const host = process.env.HOST || '127.0.0.1';
const server = createApp().listen(port, host, () => {
  console.log(`SayAnonymous API: http://${host}:${port}`);
  console.log('Development app: http://127.0.0.1:5173');
});
server.on('error', error => { console.error(`Cannot start SayAnonymous: ${error.message}`); process.exitCode = 1; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
