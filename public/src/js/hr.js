import Firebase from './firebase';

const signOutButton = document.getElementById('sign-out');

let currentUser = Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        return user;
    } else {
        Firebase.auth().signOut();
        window.location.href = "../index.html";
        return undefined;
    }
});

console.log(currentUser);

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}   

function clicked(item) {
    alert($(item).attr("id"));
}
var array = [];
Firebase.database().ref('applications').on('value', function(snapshot) {
    array = snapshotToArray(snapshot);
   console.log(array);
   //array contains objects of all requests at different indices.
   var managerTable = "";
   var empTable = "";
   for(var i =0;i<array.length;i++){
       if(array[i].Status == 0 ){
       if((array[i].Category).includes("Employee")){
        empTable += `<tr> <td>` + array[i].Name + `</td> <td class = "selectable cell modal" id = `+i+`>` + array[i].Subject + `</td> <td>` + array[i].FromDate + `</td> <td>` + array[i].ToDate + `</td> <td><button class='ui green button approve' id =` + i + ` >Approve</button><button class ='ui blue button ignore' id =` + i + `>Ignore</button> </td> </tr>`;
       }
       if((array[i].Category).includes("Manager")){
        managerTable += "<tr> <td>" + array[i].Name + "</td> <td  class ='selectable cell modal' id = "+i+" >" + array[i].Subject + "</td>  <td>" + array[i].FromDate + "</td> <td>" + array[i].ToDate + "</td> <td> <button class='ui green button approve'  id =" + i + " >Approve</button><button class ='ui blue button ignore'  id =" + i + ">Ignore</button></td> </tr>";
       }
    }
   }
   document.getElementById("EmployeeTable").innerHTML = empTable;
   document.getElementById("ManagerTable").innerHTML = managerTable;
});

function fillModal(text) {
    var modal = `<div class="ui modal">
    <div class="content">
    <p>`+ text + `</p>
    </div>
    <div class="actions">
    <div class="ui blue deny button">
    Okay
    </div>
    </div>
    </div>`;
    document.getElementById("forModal").innerHTML = modal;
}


document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'ui green button approve') {
        //console.log(array[evt.target.id].key);
        var userRequest = {
        Name: array[evt.target.id].Name,
        Category:array[evt.target.id].Category,
        User: array[evt.target.id].User,
        Subject:array[evt.target.id].Subject,
        Reason: array[evt.target.id].Reason,
        FromDate :array[evt.target.id].FromDate,
        ToDate:array[evt.target.id].ToDate,
        Status: 1
        };
        Firebase.database().ref('applications/' + array[evt.target.id].key).set(userRequest);
    
    } 
    if (evt.target.className === 'ui blue button ignore') {
        //console.log(array[evt.target.id].key);
        var userRequest = {
            Name: array[evt.target.id].Name,
            Category:array[evt.target.id].Category,
            User: array[evt.target.id].User,
            Subject:array[evt.target.id].Subject,
            Reason: array[evt.target.id].Reason,
            FromDate :array[evt.target.id].FromDate,
            ToDate:array[evt.target.id].ToDate,
            Status: 2
            };
            Firebase.database().ref('applications/' + array[evt.target.id].key).set(userRequest);
     
     }
    
}, false);

signOutButton.addEventListener('click',()=>{

    if (Firebase.auth().currentUser !== null) {
        window.location.href = "index.html";
        Firebase.auth().signOut();
    }

});

document.body.addEventListener('click', function (evt) {
    if (evt.target.className === 'selectable cell modal') {
        console.log(array[evt.target.id].key);
        fillModal(array[evt.target.id].Reason);
        $('body .modals').remove();
        $('.ui.modal').modal('show');
    }
}, false);