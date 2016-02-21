var express = require('express');
var fs = require('fs');
var path = require('path');

var nolphinlib = require('../nolphins/nolphinlib');

var router = express.Router();



router.get('/', function(req, res) {

	var doneFunc = 	function(generations) {
		console.log(generations);
		res.render('generations', {
			title: 'Generations',
			activePage: 'generations',
			'generations': generations
		});
	}

	var generations = [];
	var gens = 5;
	
	function readGenInfo(i) {
		fs.readFile(path.join(__dirname, '../nolphins/'+i+'/info.json'), 'utf8', function(err, info) {
			if (err) {
				console.log(err);
			}
			generations.push({
				'gen' : i,
				'info' : JSON.parse(info)
			})
			if (i > 1) {
				readGenInfo(i-1, doneFunc);
			}
			else {
				doneFunc(generations);
			}
		});
	}

	readGenInfo(gens);
});



router.get('/:generation', function(req, res) {
	var info = require('../nolphins/'+req.params.generation+'/info');
	res.render('nolphin-list', {
		title: 'v'+req.params.generation,
		activePage: 'generations',
		generation: req.params.generation,
		name: info.name,
		name_full: info.name_full,
		description: info.description,
		models: nolphinlib.listModelsSync(req.params.generation, true)
	});
});



router.get('/:generation/:version', function(req, res) {
	var generation = req.params.generation;
	var version = req.params.version;
	//var genInfo = fs.readFileSync(path.join(__dirname, '../nolphins/'+generation+'/'+version+'/info.json'), 'utf8');
	res.render('nolphin', {
		title: 'v'+version,
		activePage: 'generations',
		generation: generation,
		//description: info['description'],
		//name: info['name'],
		'version': version,
		info: nolphinlib.listVersionModelsSync(generation, version, true)
	});
});



module.exports = router;
