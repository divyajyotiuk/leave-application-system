import Firebase from './firebase';

var database = Firebase.database();

var userId = Firebase.auth().currentUser.uid;
var subject = document.getElementById('subject');
var reason = document.getElementById('reason');
var fromDate = document.getElementById('from-date');
var toDate = document.getElementById('to-date');
var button = document.getElementById('leave-submit');


function writeUserData(userId,subject, reason, fromDate,toDate) {

  var userRequest = {
      User: userId,
     Subject:subject.value,
     Reason: reason.value,
     FromDate : fromDate.value,
     ToDate:toDate.value,
     Status: false
  };

  var requestKey = database.ref().child("applications").push().key;
  alert(requestKey);
  var requests = {};  
  requests["/applications/" + requestKey] = userRequest;
  requests['/user-requests/' + userId + '/' + requestKey] = userRequest;
  //requests['/user-requests' + '/' + requestKey] = userRequest;

  return database.ref().update(requests);
  
   }

button.addEventListener('click', () => {

  alert(userId);
  writeUserData(userId,subject, reason, fromDate,toDate);  

},false);
