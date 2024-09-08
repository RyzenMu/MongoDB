const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});