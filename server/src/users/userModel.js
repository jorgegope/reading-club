"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    displayName: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        trim: true,
        default: "",
    },
    username: {
        type: String,
        unique: "testing error message",
        required: "Please fill in a username",
        trim: true,
    },
    password: {
        type: String,
        default: "",
    },
    clubs: {
        type: Array,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    lastAccess: {
        type: Date,
    },
});

mongoose.model("User", UserSchema);
