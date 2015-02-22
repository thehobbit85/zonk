var jsonfile = require('jsonfile');
var saveFileName = __dirname + '/zonk-saves.json';

//Public Functions
function DB() {
  try {
    saveFile = jsonfile.readFileSync(saveFileName);
  }
  catch(err) {
    jsonfile.writeFileSync(saveFileName, {});
  }   
}

////////////////////////////////////////////////////////////////////////////////

DB.prototype.save = function(save_data, callback) {

  var savename = save_data.savename;
  jsonfile.readFile(saveFileName , function (err, saveFile) {
    if (err) return callback(err);
    
    saveFile[savename] = save_data;
    return jsonfile.writeFile(saveFileName, saveFile, callback);
  });
  
 
}

DB.prototype.restore = function(savename, callback) {

  jsonfile.readFile(saveFileName, function(err, saveFile) {
    if (err) return callback(err);
    if (saveFile[savename])
      return callback(null,saveFile[savename]);
    else 
      return callback('no Save');
  });
}

module.exports = new DB();

