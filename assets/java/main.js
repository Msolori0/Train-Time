$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyCxcfFlodmIbzmhHoWV7MS3d6xZqJ1tkEI",
    authDomain: "train-time-53d63.firebaseapp.com",
    databaseURL: "https://train-time-53d63.firebaseio.com",
    projectId: "train-time-53d63",
    storageBucket: "train-time-53d63.appspot.com",
    messagingSenderId: "539695374501"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //when submit button is clicked
  $("#submit").on("click", function(event) {
    event.preventDefault();

    //grabing the html ids and setting them to the js variables
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var frequency = $("#frequency-input")
      .val()
      .trim();
    var firstTrain = $("#first-input")
      .val()
      .trim();

    var newTrainInfo = {
      name: trainName,
      destination: destination,
      frequency: frequency,
      firstTrain: firstTrain
    };

    database.ref().push(newTrainInfo);

    $("train-name-input").val("");
    $("destination-input").val("");
    $("frequency-input").val("");
    $("first-input").val("");

    return false;
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var firebaseName = childSnapshot.val().name;
    var firebaseDes = childSnapshot.val().destination;
    var firebaseFreq = childSnapshot.val().frequency;
    var firebaseTime = childSnapshot.val().firstTrain;

    var now = moment().format("HH:mm");
    var trainStart = moment.unix(firebaseTime).format("hh:mm");
    var diffTime = moment().diff(moment(firebaseTime, "hh:mm A"), "m");
    var minsAway = diffTime % firebaseFreq;
    var timeLeft = firebaseFreq - minsAway;
    var nextArrival = moment().add(timeLeft, "m");
    var newTrainInfo = moment(nextArrival).format("hh:mm A");
    var timeAway = timeLeft;

    $("#train-table tbody").append(
      "<tr><td>" +
        firebaseName +
        "</td><td>" +
        firebaseDes +
        "</td><td>" +
        firebaseFreq +
        "mins" +
        "</td><td>" +
        newTrainInfo +
        "</td><td>" +
        timeLeft +
        "</td></tr>"
    );
  });
});
