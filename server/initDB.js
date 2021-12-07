'use strict';

// it is called when starting

const mongoose = require('mongoose');
const Club = mongoose.model('Club');

module.exports.init = async function() {
    const nClubs = await Club.countDocuments();
    
    if (nClubs === 0) {
        createDefaultClubs();
    }
}

async function createDefaultClubs() {
    for(var i=1; i<=100; i++) {
        let club = new Club();
        club.id = i;
        club.name = "Club " + i;
        club.image = "https://source.unsplash.com/random/400x600?sig="+i;
        await club.save();
    }
    console.log("Create default clubs");
}