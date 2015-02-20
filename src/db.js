var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

var models = {};

//Public Functions
var init = function() {
  
  var settings = jsonfile.readFileSync(__dirname + '/settings.json');

  var mongoCollectionName = settings.mongoCollectionName;
  var mongoHost = settings.mongoHost;
  var mongoPort = settings.mongoPort;
  var datamodel = [{
    "Name" : "saves",
    "Schema" : {
      "savename" : {
        "type": "String",
        "index": {
          "unique": true
        }
      },
      "inventory" : "Mixed",
      "score" : "Number",
      "currentRoom" : "Mixed",
      "keyWords" : ["String"],
      "game" : "String"
    }
  }]

  if (datamodel && mongoCollectionName && mongoHost && mongoPort) {
    mongoose.connect(mongoHost + ':' + mongoPort + '/' + mongoCollectionName);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {

      init_data_base(datamodel);

      //test(mongoose);
    });
  }

  return null;
}

var close = function() {

  mongoose.connection.close();

  return null;
}

////////////////////////////////////////////////////////////////////////////////

var init_data_base = function(datamodels) {

  datamodels.forEach(function(datamodel) {
    if (datamodel && datamodel.Name && datamodel.Schema) {
      
      var name = datamodel.Name;
      var schema = mongoose.Schema(datamodel.Schema);
      var model = mongoose.model(name, schema);
      var name = name.toLowerCase();
    
      models[name] = model;

      init_data (name, datamodel, function(err, result) {
        if (err) console.log(err);

      });
    }
  });
  
  return null;
}

var init_data = function(name, datamodel, callback) {

  if ((datamodel.Data != undefined) && datamodel.hasOwnProperty('Data'))
  {
    var data = datamodel.Data;
    data.forEach(function(doc) {
      upsert(name, doc, doc, callback);
    });
  }
}


var upsert = function(name, condition, insert, callback) {

  var model = models[name];
  if (!model) { 
    return callback('error: no model');
  }

  return model.update(condition, insert, {upsert: true}, callback);
}

var find = function(name, condition, callback) {

  var model = models[name];
  if (!model) { 
    return callback('error: no model');
  }

  return model.findOne(condition,callback);
}

module.exports = {
  init : init,
  close : close,
  upsert : upsert,
  find : find
}

