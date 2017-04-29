
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
		console.log(req.body);

		var bestFriendIndex = 0;
    	var minimumDifference = 40;

		// store new friend
		surveyData.push(req.body);

		function surveyPeople(cb){

			var db = [];
			surveyData.forEach(function(el){
				var dbObj = {};
				dbObj.name = el.name;
				var totalDifference = 0;
				el.scores.forEach(function(score, idx){
					var difference = Math.abs(parseInt(score) - parseInt(req.body.questionaires[idx]));
					totalDifference += difference;
				});

				var minimumDifference = dbObj.totalDifference;
				minimumDifference = 20;
				console.log(totalDifference);

				if(totalDifference < minimumDifference) {
					minimumDifference = totalDifference;
					db.push(dbObj);
				}
			});

			res.json(surveyData[bestFriendIndex]);

			cb(db);
		}

		surveyPeople(function(db){
			console.log(db);
			// Sort through the total different to grab the lowest scores.

		})

	});
}