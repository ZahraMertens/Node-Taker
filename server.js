const express = require('express');
const path = require('path');
const api = require("./routes/index.js");
const { clog } = require('./middleware/clog');

const PORT = process.env.PORT || 8080;
const app = express();

//Custom middleware
app.use(clog);
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('./public'));

//Initial load of page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Button click add notes path
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Wildcard for path which does not exist
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);