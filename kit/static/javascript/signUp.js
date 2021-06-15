$(document).ready(function() {
    $('#password, #repassword').on('keyup', function () {
        if ($('#password').val() == $('#repassword').val()) {
            $('#password-match-status').html('Matching').addClass('strong-password').removeClass("weak-password");
        } 
        else 
            $('#password-match-status').html('Not Matching').addClass('weak-password').removeClass("strong-password");
        });
    }
);


function checkPasswordStrength() {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    if($('#password').val().length<6) {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('weak-password');
    $('#password-strength-status').html("Weak (should be atleast 6 characters.)");
    } else {  	
    if($('#password').val().match(number) && $('#password').val().match(alphabets) && $('#password').val().match(special_characters)) {            
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('strong-password');
    $('#password-strength-status').html("Strong");
    } else {
    $('#password-strength-status').removeClass();
    $('#password-strength-status').addClass('medium-password');
    $('#password-strength-status').html("Medium (should include alphabets, numbers and special characters.)");
    }}
}

function deleteAccount(){
    var confirmation = confirm("Are you sure you want to delete your account?");
    if (confirmation == true) {
        window.location.href="deleteAccount";
    } 
}