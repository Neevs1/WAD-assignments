const express = require('express');
const app = express();
const port = 3000;

const formData = [];

app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/submit', (req, res) => {
  const newEntry = {
    name: req.body.name || '',
    email: req.body.email || '',
    message: req.body.message || ''
  };
  formData.push(newEntry);
  res.send('name: ' + newEntry.name + ', email: ' + newEntry.email + ', message: ' + newEntry.message);
});

app.get('/data', (req, res) => {
  res.json(formData);
});