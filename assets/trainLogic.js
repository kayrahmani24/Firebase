
  

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
var trainDestination = $("#destination").val().trim();
var firstTrain = $("#first-train").val().trim();
var trainFrequency = $("#frequency-train").val().trim();

var newTrain = {
	train : trainLine,
	destination : trainDestination,
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

  


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	var trainLine = childSnapshot.val().train
  	var trainDestination = childSnapshot.val().destination
  	var firstTrain = childSnapshot.val().firstTrain
  	var trainFrequency = childSnapshot.val().frequency


  var tFrequency = 5;

    
    var firstTime = "4:00";

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  
    var currentTime = moment();
   

   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

   
    var minutesAway = tFrequency - tRemainder;

    if (minutesAway == '5'|| "0") {
      minutesAway == "Now";
    } else {
      minutesAway == tFrequency - tRemainder;
    };
    

    
    var nextTime = moment().add(minutesAway, "minutes");
   nextArrival = moment(nextTime).format("hh:mm");

$("#train-table > tbody").append("<tr><td>" + trainLine + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});


