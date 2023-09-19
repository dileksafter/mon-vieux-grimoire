const http = require('http');
const app = require('./app');


const port = '4000'
app.set('port', port);

const server = http.createServer(app);

server.on('error', (error) => {
  console.error(error)
});
server.on('listening', () => {
  const address = server.address();
  console.log(`Listening on ${port}`);
  console.log(`http://localhost:${port}`)
});

server.listen(port);
