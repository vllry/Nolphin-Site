var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
	res.render('nolpherino', {
		title: 'Nolpherino Chip',
		activePage: 'nolpherino'
	});
});



module.exports = router;
