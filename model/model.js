const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    actived: {
        type: Boolean,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
    },
});

let License = mongoose.model("License", licenseSchema);

module.exports = { License };