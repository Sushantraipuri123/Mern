var mongoose = require('mongoose');


const empSchema = new mongoose.Schema({
    employename: {
        type: String
    },
    employeid: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Employee', empSchema);