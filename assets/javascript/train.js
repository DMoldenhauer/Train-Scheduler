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
  var config = {
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

//Add Trains info to current HTML train schedule table via form submit button click
// 2. Button for adding Employees

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// Grabs user input
  var trainName = $("#inputTrainName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  var firstTrainTime = moment($("#inputFirstTrainTIme").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#inputFrequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
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

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var firstTrainTime = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
  
    // Prettify the employee start
    var firstTrainTimePretty = moment.unix(empStart).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var nextArrival = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(nextArrival);            //was empMonths
  
    // Calculate the total billed rate
    var minutesAway = empMonths * empRate;     
    console.log(minutesAway);   //was empBilled
  
    // Add each train's data into the table
    $("#trainsTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway +  "</td></tr>");
  });




//FUNCTIONS
//------------------------------------------------------