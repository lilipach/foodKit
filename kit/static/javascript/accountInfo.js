// $( document ).ready(function() {
//     console.log("doc is ready")
//     $("#editable-name").click(function(){
//         console.log("table name clicked");
//         $(this).siblings("td").html("")
//         $(this).siblings("td").append(
//             `
//                 <input type="text" class="form-control mb-2" name="firstName" id="firtsName" placeholder="Fist Name" value="">
//                 <input type="text" class="form-control " name="lastName" id="lastName" placeholder="Last Name">
//              `
//         );
//     })

//     $("#editable-email").click(function(){
//         console.log("table email clicked");
//         $(this).siblings("td").html("")
//         $(this).siblings("td").append(
//             `<input type="email" class="form-control h-25" id="emailChange" placeholder="Enter email"></input>`
//         );

//     })
// });

function deleteAccount(){
    var confirmation = confirm("Are you sure you want to delete your account?");
    if (confirmation == true) {
        window.location.href="deleteAccount";
    } 
}

function processUpdates(){
    good
}

