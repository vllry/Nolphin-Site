var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
	res.render('nolphiner', {
		title: 'Nolphiner Chip',
		activePage: 'nolphiner'
	});
});



module.exports = router;
