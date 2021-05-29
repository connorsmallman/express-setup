const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/greeting/:name', (req, res) => {
  res.send(`Welcome ${req.params.name}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
