const mongoose = require ('mongoose');
    
mongoose.connect('mongodb+srv://user_node_TDA:pexumePDF7NIwwGV@cluster0.1xjii.mongodb.net/senioritty/api', {

})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

