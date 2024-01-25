const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({

    id: {
        type: Boolean,
    },
    role: {
        type: String,
    },
},

    { timestamps: true }

);

const Roles = mongoose.model("Roles", RoleSchema);

module.exports = Roles;