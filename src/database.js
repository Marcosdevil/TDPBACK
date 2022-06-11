const mongoose = require ('mongoose');
    
mongoose.connect('mongodb+srv://marcos:<password>@cluster0.e9kkb.mongodb.net/?retryWrites=true&w=majority/api', {

})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

