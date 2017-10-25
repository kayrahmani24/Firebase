
  

 console.log("hey");
//database setup
 var config = {
    apiKey: "AIzaSyCrw62fZ78inX7GLYGF643CCxyHta2XmDw",
    authDomain: "trainproject-fe83c.firebaseapp.com",
    databaseURL: "https://trainproject-fe83c.firebaseio.com",
    storageBucket: "trainproject-fe83c.appspot.com"
   
  };
  firebase.initializeApp(config);

  var database = firebase.database();
//button click function
  $(".btn").on('click', function(event){
  	event.preventDefault();
//taking "values" that user has logged
var trainLine = $("#train-line").val().trim();
var trainDestination = $("#destination").val().trim();
var firstTrain = $("#first-train").val().trim();
var trainFrequency = parseInt($("#frequency-train").val().trim());

//object to show values in database
var newTrain = {
	train : trainLine,
	destination : trainDestination,
	firstTrain : firstTrain,
	frequency : trainFrequency
};

//pushing object to database
database.ref().push(newTrain);

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

//emptying inputs after submit button has been pressed
$("#train-line").val("");
$("#destination").val("");
$("#first-train").val("");
$("#frequency-train").val("");

  });

  


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //up to date changes being accounted for in database
  	var trainLine = childSnapshot.val().train
  	var trainDestination = childSnapshot.val().destination
  	var firstTrain = childSnapshot.val().firstTrain
  	var trainFrequency = childSnapshot.val().frequency


  var tFrequency = 0;

    
    var firstTime = 0;

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  
    var currentTime = moment();
   
//Time formulas using moment
   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

   
    var minutesAway = trainFrequency - tRemainder;
//trying to make this work but it wont lol
    if (minutesAway == trainFrequency) {
      minutesAway == "Arriving Now!";
    } else {
      minutesAway == trainFrequency - tRemainder;
    };
    

    
    var nextTime = moment().add(minutesAway, "minutes");
   nextArrival = moment(nextTime).format("HH:mm");
//appending results into table
$("#train-table > tbody").append("<tr><td>" + trainLine + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});


