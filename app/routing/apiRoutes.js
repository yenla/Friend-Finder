
var surveyData = require("../data/friends");

var path = require("path");


module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(surveyData);
		console.log(surveyData);

	});

	app.post("/api/friends", function(req, res) {
		console.log('inside post');
		console.log(typeof(surveyData));
		console.log(surveyData);
		// console.log(req.body);

		var bestFriendIndex = 0;
    	var minimumDifference = 40;

		// store new friend

		function surveyPeople(request, cb){

			var body = req.body;
			var db = [];
			surveyData.forEach(function(el){
				var dbObj = {};
				dbObj.name = el.name;
				dbObj.photo = el.photo;
				var totalDifference = 0;
				console.log(el.scores);
				el.scores.forEach(function(score, idx){
					var difference = Math.abs(parseInt(score) - parseInt(req.body.questionaires[idx]));
					totalDifference += difference;
				});

				dbObj.totalDifference = totalDifference;
				db.push(dbObj);

			}); // this closes forEach

			cb(db, body);
		}

		surveyPeople(req, function(db, reqBody){
			console.log('this is the processed db');
			console.log(db);

			var sortedDb = db.sort(function(a,b){
				return a.totalDifference - b.totalDifference;
			});

			console.log(sortedDb[0]);

			surveyData.push(reqBody);

			res.json(sortedDb[0]);
			// Sort through the total different to grab the lowest scores.

		})

	});
}