"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports.authenticate = function (req, res) {
    User.findOne({ username: req.body.username, password: req.body.password })
        .then((u) => {
            if (u) {
                res.jsonp(u);
            } else {
                res.status(500).send({
                    message: "Username or password is incorrect",
                });
            }
        })
        .catch((error) => res.status(500).send({ message: error }));
};

module.exports.register = function (req, res) {
    var user = new User(req.body);

    User.findOne({ username: user.username }).then((u) => {
        if (u) {
            res.status(500).send({
                message: 'Username "' + user.username + '" is already taken',
            });
        }
    });

    user.save()
        .then((u) => res.jsonp(u))
        .catch((error) => res.status(500).send({ message: error }));
};

module.exports.follow = function (req, res) {
    const username = req.body.username;
    User.findOne({ username }).then((userFound) => {
        if (userFound) {
            if (userFound.clubs.some((club) => club == req.body.club.id)) {
                userFound.clubs = userFound.clubs.splice(
                    userFound.clubs.indexOf(req.body.club.id),
                    1
                );
            } else {
                userFound.clubs.push(req.body.club.id);
            }

            userFound
                .save()
                .then((userFound) => res.jsonp(userFound))
                .catch((error) => res.status(500).send({ message: error }));
        }
    });
};
