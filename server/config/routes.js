var names = require('../controllers/controller.js');
var discussions = require('../controllers/controller.js');
var answers = require('../controllers/controller.js');


module.exports = function(app) {
	var session;

	app.get('/', function (req, res) {
		session = req.session;
	})

	app.get('/users', function (req, res) {
	    names.showName(req, res);
	})

	app.get('/view_user/:id', function (req, res){
		names.viewOneName(req, res);
	})

	app.post('/add_name', function (req, res) {
		//session = req.session;
		//session.name = req.body.name;
		//console.log(session.name);
		names.addName(req, res);
	})

	app.get('/:id/remove_name', function (req, res){
		names.removeName(req, res);
	})

	app.get('/discussions', function (req, res) {
	    discussions.showDiscussion(req, res);
	})

	app.post('/add_discussion', function (req, res) {
		discussions.addDiscussion(req, res);
	})

	app.get('/view_discussion/:id', function (req, res) {
		discussions.viewOneDiscussion(req, res);
	})

	app.get('/:id/remove_discussion', function (req, res){
		discussions.removeDiscussion(req, res);
	})

}