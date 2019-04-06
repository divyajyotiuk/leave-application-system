import Firebase from './firebase';

const signOutButton = document.getElementById('sign-out');
const leaveButton = document.getElementById('create-leave');

//database part

let database = Firebase.database();

var userId, username;
Firebase.auth().onAuthStateChanged( (user)=> {
    if(user){
       userId = user.uid;
       username = trunc(user.email);

    }
    else{
        alert("no user Id found");
    }
});

function trunc(user){
    var i = user.indexOf("@");
    return user.slice(0,i);
}

const subject = document.getElementById('subject');
const reason = document.getElementById('reason');
const fromDate = document.getElementById('from-date');
const toDate = document.getElementById('to-date');
const submitButton = document.getElementById('leave-submit');


function writeUserData(username,uid,subject, reason, fromDate,toDate) {

  var userRequest = {
      Name: username,
      Category: "Manager",
      User: uid,
     Subject:subject.value,
     Reason: reason.value,
     FromDate : fromDate.value,
     ToDate:toDate.value,
     Status: 0
  };

  var requestKey = database.ref().child("applications").push().key;

  var requests = {};  
  requests["/applications/" + requestKey] = userRequest;

  return database.ref().update(requests);
  
   }

submitButton.addEventListener('click', () => {

  var s = writeUserData(username,userId,subject, reason, fromDate,toDate);

},false);

signOutButton.addEventListener('click',()=>{

    if (Firebase.auth().currentUser !== null) {
        window.location.href = "index.html";
        Firebase.auth().signOut();
    }

});

leaveButton.addEventListener('click',()=>{

    window.location.href="form.html";
});


