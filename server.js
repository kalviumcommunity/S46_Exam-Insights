const express = require('express');
const {connectToDB, isConnected} = require("./db.js");
const app = express();
const port = 3000;
const cors = require('cors');
const routes = require("./routes.js");

app.use(cors());
app.use(express.json());
app.use('/', routes)


app.get('/status', (req, res) => {
  res.json({
    message: 'pong',
    database: isConnected() ? 'connected' : 'not connected'
  })
})

app.listen(port, async () => {
  await connectToDB();  
  console.log(`🚀 server running on PORT: ${port}`);
});

