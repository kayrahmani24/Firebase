 console.log("hey");

 var config = {
    apiKey: "AIzaSyCrw62fZ78inX7GLYGF643CCxyHta2XmDw",
    authDomain: "trainproject-fe83c.firebaseapp.com",
    databaseURL: "https://trainproject-fe83c.firebaseio.com",
    storageBucket: "trainproject-fe83c.appspot.com"
   
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".btn").on('click', function(event){
  	event.preventDefault();

var trainLine = $("#train-line").val().trim();
var destination = $("#destination").val().trim();
var firstTrain = $("#first-train").val().trim();
var trainFrequency = $("#frequency-train").val().trim();

var newTrain = {
	train : trainLine,
	destination : destination,
	firstTrain : firstTrain,
	frequency : trainFrequency
};


database.ref().push(newTrain);

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);


$("#train-line").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency-train").val("");

  });

