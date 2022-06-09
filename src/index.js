const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./database');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use('/api', require('./routes/index'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Servidor escuchando en el puerto', PORT);
});
