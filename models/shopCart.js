const mongoose = require("mongoose");

const shopCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.objectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.objectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
}, {
    timestamps: {}
});

module.exports = mongoose.model("ShopCart", shopCartSchema);