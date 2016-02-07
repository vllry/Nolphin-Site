var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');





router.get('/', function(req, res) {
	res.json({'success':true});
});



router.get('/download/5', function(req, res) {
	var dir = path.join(__dirname, '../nolphins/5')
	fs.readdir(dir, function(err, items) {
		if (err) {
			console.log(err);
			res.json({'success':false, 'err':err})
			return;
		}
		
		for (var i=items.length-1; i>=0; i--) {
			if (fs.lstatSync(path.join(dir, items[i])).isDirectory()) {
				console.log(items[i]);
			}
		}
		res.json({'success':true});
	});
});



module.exports = router;
