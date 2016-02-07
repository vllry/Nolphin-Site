var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
	res.render('generations', {
		title: 'Generations',
		activePage: 'generations'
	});
});


router.get('/:generation', function(req, res) {
	res.render('nolphin-list', {
		title: 'v'+req.params.generation,
		activePage: 'generations',
		generation: req.params.generation
	});
});



module.exports = router;
