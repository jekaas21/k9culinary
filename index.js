const express = require('express');
const { createServer } = require('http');
const { server: wisp } = require('@mercuryworkshop/wisp-js/server');
const path = require('path');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

server.on('upgrade', (req, socket, head) => {
  if (req.url.includes('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`✅ Proxy live at: https://${process.env.REPL_SLUG || 'localhost:' + PORT}`);
});
