import Firebase from './firebase';

const signOutButton = document.getElementById('sign-out');
const leaveButton = document.getElementById('create-leave');



let database = Firebase.database();

//authentication
let userObj = {
    userId: '',
    email: '',
};

Firebase.auth().onAuthStateChanged(user => {
    if(user){
        userObj.userId = user.uid
        userObj.email = user.email
       console.log(user)
    }
    else {
      console.log("no user Id found");
    }
})

console.log(userObj)

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
} 

function fillModal(subject,reason) {
    var modal = `<div class="ui modal">
    <div class="content">
    <p>Subject: `+ subject + `</p>
    <p>Reason: `+ reason + `</p>
    </div>
    <div class="actions">
    <div class="ui blue deny button">
    Okay
    </div>
    </div>
    </div>`;
    document.getElementById("forModal").innerHTML = modal;
}

var array = [];
Firebase.database().ref('applications/').on('value', function(snapshot) {
    array = snapshotToArray(snapshot);
    console.log(array);

    var prevTable = "";
    var activeTable = "";
    for(var i =0;i<array.length;i++){
       if(array[i].User===userObj.userId){
        if((array[i].Status)===0){
            activeTable += `<tr>
            <td>`+array[i].FromDate+`</td>
            <td>`+array[i].ToDate+`</td>
            <td>Pending</td>
            <td><button class = "ui primary button view" id=`+i+`>View Application</button></td>
            </tr>`;
        }
        if(array[i].Status===1){
            prevTable += `<tr>
            <td>`+array[i].FromDate+`</td>
            <td>`+array[i].ToDate+`</td>
            <td>Approved</td>
            <td><button class = "ui primary button view" id=`+i+`>View Application</button></td>
            </tr>`;
        }
        if(array[i].Status===2){
            prevTable += `<tr>
            <td>`+array[i].FromDate+`</td>
            <td>`+array[i].ToDate+`</td>
            <td>Rejected</td>
            <td><button class = "ui primary button view" id=`+i+`>View Application</button></td>
            </tr>`;
        }
    }
    }
    document.getElementById("active-req").innerHTML = activeTable;
    document.getElementById("prev-req").innerHTML = prevTable;
   // console.log(snapshot.child(userObj.userId).val());
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
      Name:username,
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
  //requests['/user-requests' + '/' + requestKey] = userRequest;

  return database.ref().update(requests);
  
   }

submitButton.addEventListener('click', () => {

  writeUserData(trunc(userObj.email),userObj.userId,subject, reason, fromDate,toDate);

},false);

signOutButton.addEventListener('click',()=>{

    if (Firebase.auth().currentUser !== null) {
        window.location.href = "index.html";
        Firebase.auth().signOut();
    }

});

document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'ui primary button view') {
        console.log(array[evt.target.id].key);
        fillModal(array[evt.target.id].Subject,array[evt.target.id].Reason);
        $('body .modals').remove();
        $('.ui.modal').modal('show');
    }
}, false);
