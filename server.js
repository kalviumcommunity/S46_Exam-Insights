const express = require('express');
const {connectToDB, isConnected} = require("./db.js");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'pong',
    database: isConnected() ? 'connected' : 'not connected'
  })
})

app.listen(port, async () => {
  await connectToDB();  
  console.log(`🚀 server running on PORT: ${port}`);
});

