var express = require('express');
var fs = require('fs');
var path = require('path');

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

	var generations = {};
	var gens = 5;
	
	function readGenInfo(i) {
		fs.readFile(path.join(__dirname, '../nolphins/'+i+'/info.json'), 'utf8', function(err, info) {
			if (err) {
				console.log(err);
			}
			generations[i] = {
				'gen' : i,
				'info' : JSON.parse(info)
			}
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
		description: info.description
	});
});



module.exports = router;
