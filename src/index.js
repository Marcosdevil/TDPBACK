const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./database');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api', require('./routes/index'))


app.listen(3000);
console.log('Server on port' + 3000);;