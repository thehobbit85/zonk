var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

//Public Functions
function DB() {
  this.models = [];
  settings = jsonfile.readFileSync(__dirname + '/settings.json');
  mongoCollectionName = settings.mongoCollectionName;
  mongoHost = settings.mongoHost;
  mongoPort = settings.mongoPort;
  datamodels = [{
    "Name" : "saves",
    "Schema" : {
      "savename" : "String",
      "inventory" : "Mixed",
      "score" : "Number",
      "currentRoom" : "Mixed",
      "keyWords" : ["String"],
      "game" : "String"
    }
  }]
  var that = this;
  if (datamodels && mongoCollectionName && mongoHost && mongoPort) {
    
    mongoose.connect(mongoHost + ':' + mongoPort + '/' + mongoCollectionName);
    
    var mon = mongoose.connection;
    
    mon.on('error', console.error.bind(console, 'connection error:'));
    mon.once('open', function() {

      datamodels.forEach(function(datamodel) {
        if (datamodel && datamodel.Name && datamodel.Schema) {
          
          var name = datamodel.Name;
          var schema = mongoose.Schema(datamodel.Schema);

          that.models[name] = mongoose.model(name, schema);
        }
      });
    });
  }
}

DB.prototype.close = function() {

  mongoose.connection.close();

  return null;
}

////////////////////////////////////////////////////////////////////////////////

DB.prototype.save = function(name, condition, callback) {

  var model = this.models[name];
  if (!model) { 
    return callback('error: no model');
  }

  return model.update(condition, condition, {upsert: true}, callback);
}

DB.prototype.restore = function(name, condition, callback) {

  var model = this.models[name];
  if (!model) { 
    return callback('error: no model');
  }

  return model.findOne(condition,function (err, data) {
    if (err) return callback(err);
    if (!data) return callback('no Save');
    return callback(null,data);
  });
}

module.exports = new DB();

