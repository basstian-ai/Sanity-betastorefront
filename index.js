const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routes/posts');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/posts', postsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
