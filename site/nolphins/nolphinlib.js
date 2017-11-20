//For functions (plausibly) applicable to both page generation and the API

var fs = require('fs');
var path = require('path');



function getDirectoriesSync(srcpath) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isDirectory();
	});
}
exports.getDirectoriesSync = getDirectoriesSync;

function getFilesSync(srcpath) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file)).isFile();
	});
}
exports.getFilesSync = getFilesSync;



function listVersionModelsSync(generation, model) {
	var genDir = path.join(__dirname, generation);
	var modelDir = path.join(genDir, model);
	var info = JSON.parse(fs.readFileSync(path.join(modelDir, 'info.json'), "utf8"));

	downloadTypes = [];
	if (fs.existsSync(path.join(modelDir,'advdupe'))) {
		downloadTypes.push('advdupe');
	}
	if (fs.existsSync(path.join(modelDir,'e1'))) {
		downloadTypes.push('e1');
	}
	if (fs.existsSync(path.join(modelDir,'e2'))) {
		downloadTypes.push('e2');
	}
	info['downloadTypes'] = downloadTypes;

	return info;
}
exports.listVersionModelsSync = listVersionModelsSync;



exports.listModelsSync = function(generation, mainLine) {
	var dict = {};

	var genDir = path.join(__dirname, generation);
	models = getDirectoriesSync(genDir);
	for (var i=0; i < models.length; i++) {
		dict[models[i]] = listVersionModelsSync(generation, models[i]);
	}
	return dict;
};
