var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
	res.render('index', {
		title: 'Home',
		activePage: 'home'
	});
});

router.get('/about', function(req, res) {
	res.render('about', {
		title: 'About',
		activePage: 'about'
	});
});



module.exports = router;
