//REQUIREMENTS
//----------------------------------------------------


// ### Overview

// In this assignment, you'll create a train schedule application that incorporates Firebase to host arrival and departure data. Your app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

// - - -

// ### Setup

// * We'll leave that up to you -- however you like. Just make sure you're using Firebase to store data, GitHub to backup your project, and GithHub Pages to host your finished site.

// ### Instructions

// * Make sure that your app suits this basic spec:

//   * When adding trains, administrators should be able to submit the following:

//     * Train Name

//     * Destination 

//     * First Train Time -- in military time

//     * Frequency -- in minutes

//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.

//   * Users from many different machines must be able to view same train times.

//   * Styling and theme are completely up to you. Get Creative!

// ### Example Site

// ![train homework](Train_Time_Image.png)

// ### Bonus (Extra Challenges)

// * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attTraint this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.



//PSEUDOCODE
//-----------------------------------------------------

//Add Trains info to current train schedule table via form

//Send new train info to firebase

//Call train info from firebase

//Display firebase response in table



//GLOBAL VARIABLES
//-----------------------------------------------------

// Initialize Firebase
var config =
  {
    apiKey: "AIzaSyBMNLJ2UPDImJTf1Z_R-jXL7WGZrLUAR_Q",
    authDomain: "train-scheduler-4dafa.firebaseapp.com",
    databaseURL: "https://train-scheduler-4dafa.firebaseio.com",
    projectId: "train-scheduler-4dafa",
    storageBucket: "train-scheduler-4dafa.appspot.com",
    messagingSenderId: "187905086045"
  };
firebase.initializeApp(config);

var database = firebase.database();


//MAIN PROCESS
//-----------------------------------------------------

//Send new train info to firebase
//adds a new train object to the database upon submit button click
// 

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#inputTrainName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  var firstTrainTime = $("#inputFirstTrainTIme").val().trim();
  var trainFrequency = $("#inputFrequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain =
    {
      name: trainName,
      destination: trainDestination,
      first: firstTrainTime,
      frequency: trainFrequency
    };
  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#inputTrainName").val("");
  $("#inputDestination").val("");
  $("#inputFirstTrainTIme").val("");
  $("#inputFrequency").val("");

});
// Call each train object from firebase
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log("TRAIN NAME:  " + trainName);
  console.log("TRAIN DESTINATION:  " + trainDestination);
  console.log("FIRST TRAIN TIME:  " + firstTrainTime);
  console.log("TRAIN FREQUENCY:  " + trainFrequency);

// perform momentjs functions for time calculations
  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, 'years');
  console.log("FIRST TIME CONVERTED:  " + firstTimeConverted);

  
  // Current Time
  var currentTime = moment();  //defaults to current time
  console.log("CURRENT TIME: " + currentTime.format("hh:mm"));

  // Difference between current time and firstTrain Time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // compute derived entries in table for Next Arrival and Minutes Away columns
  // Time apart (remainder)
  var tRemainder = Math.abs(diffTime) % trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  var nextTrainDisplay = (moment(nextTrain).format("hh:mm A"));

  // //Display firebase response + calculated fields in the table
  $("#trainsTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrainDisplay + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});




//FUNCTIONS
//------------------------------------------------------


  //  // Prettify the employee start
  //  var firstTrainTimePretty = moment.unix(empStart).format("HH:mm");

  //  // Calculate the months worked using hardcore math
  //  // To calculate the months worked
  //  var nextArrival = moment().diff(moment.unix(empStart, "X"), "months");
  //  console.log(nextArrival);            //was empMonths

  //  // Calculate the total billed rate
  //  var minutesAway = empMonths * empRate;     
  //  console.log(minutesAway);   //was empBilled