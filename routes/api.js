var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');





router.get('/', function(req, res) {
	res.json({'success':true});
});



function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFiles(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

//I tried to async this and Gave Up
var findSuitableNolphin = function(genDir, downloadType, devVersion, funcOk) {
	arrayOfModels = getDirectories(genDir);
	for (var i=arrayOfModels.length-1; i>=0; i--) {
		var info = JSON.parse(fs.readFileSync(path.join(genDir, arrayOfModels[i]+'/info.json'), "utf8"));
		if (!info.main) { //Only look at the "main line" of Nolphins, not special derivatives.
			continue;
		}
		arrayOfSubversions = getFiles(path.join(genDir, arrayOfModels[i]+'/'+downloadType));
		for (var j=arrayOfSubversions.length-1; j>=0; j--) {
			if(devVersion || (arrayOfSubversions[j].indexOf('alpha') == -1 && arrayOfSubversions[j].indexOf('beta') == -1)) { //Only return alphas/betas if specified.
				funcOk({
					'success': true,
					'message': 'Nolphin downloaded',
					'name': arrayOfSubversions[j],
					'dataType': downloadType,
					'data': fs.readFileSync(path.join(genDir, arrayOfModels[i]+'/'+downloadType+'/'+arrayOfSubversions[j]), "utf8")
				});
				return;
			}
		}
	}
	funcOk({'success':false, 'message':'No Nolphin :('});

}

router.get('/download/:generation/:downloadType', function(req, res) {
	var generation = req.params.generation;
	var downloadType = req.params.downloadType;
	var dir = path.join(__dirname, '../nolphins/' + generation) + '/'

	fs.readdir(dir, function(err, models) {
		if (err) {
			res.json({'success':false, 'err':err})
			return;
		}

		findSuitableNolphin(dir, downloadType, req.query.dev, function(nolphin) {
			res.json(nolphin);
		});
	});
});



module.exports = router;
