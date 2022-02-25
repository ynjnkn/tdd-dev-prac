const mongoose = require('mongoose');

module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017/tdd-dev-prac', function (err) {
            if (err) {
                console.error('MongoDB Connection Error', err);
            }
            console.log('MongoDB Connected');
        });
    };
    connect();
    mongoose.connection.on('disconnected', connect);
}