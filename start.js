"use strict";
var fs = require('fs');
var path = require('path');
var inquirer = require("inquirer");
var utils = require(__dirname + '/src/utils.js');
var c = utils.colors;
var db = require(__dirname + '/src/DataBases/fileSystem.js');
var gameEngine = require(__dirname+'/src/Game.js');

console.log(c.boldred(" ** Text Based Adventure Games ** "), '\n');
console.log(c.cyan(" Developed for the people with the  world's most powerful graphic chip - Imagination"), '\n');

console.log(c.green('Pick a Game to play'));

var gameScripts = fs.readdirSync(__dirname+'/Games');
var gameData =  [];

gameScripts.forEach(function(p){
    var p = __dirname+'/Games/'+p;
    var f = JSON.parse(fs.readFileSync(p, 'UTF-8'));
    
    gameData.push({
        name : f.name + " - "+ f.meta.tagline,
        value : p
    });
});

inquirer.prompt(
    [{
        type: "list",
        name: "game",
        message: "Which Adventure would you like to go for?",
        choices: gameData
    }],
    function(answers) {
        var Game = new gameEngine(db);
        Game.play(answers.game);
    });