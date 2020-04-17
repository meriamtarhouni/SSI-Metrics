const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//SSI_Metrics is the name of the database 
mongoose.connect('mongodb://localhost:27017/SSI_Metrics', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};