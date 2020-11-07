$(document).ready(function () {
    if ($("#userInput").val() !== "") {
        userInputFocus();
    }

    function userInputFocus() {
        $("#userInputLabel").css({
            'fontSize': '14px',
            'top': '-30px',
            'fontStyle': 'italic'
        }, 300);
        $(".userInputLine").animate({
            width: '50%'
        }, 300);
    }

    if ($("#passwordInput").val() !== "") {
        passwordInputFocus();
    }

    function passwordInputFocus() {
        $("#passwordInputLabel").css({
            'fontSize': '14px',
            'top': '-30px',
            'fontStyle': 'italic'
        }, 300);
        $(".passwordInputLine").animate({
            width: '50%'
        }, 300);
    }

    // Animate for user input label
    var isUserInputFocus = true;
    $("#userInput").focus(function (e) {
        if (isUserInputFocus) {
            userInputFocus();
            isUserInputFocus = false;
        }
    });
    $("#userInput").focusout(function (e) {
        if ((!isUserInputFocus) && ($("#userInput").val() === "")) {
            $("#userInputLabel").css({
                'fontSize': '1rem',
                'top': '-5px',
                'fontStyle': 'normal'
            }, 300);
            $(".userInputLine").animate({
                width: '0px'
            }, 300);
            isUserInputFocus = true;
        }
    });
    // Animate for password input label
    var isPasswordInputFocus = true;
    $("#passwordInput").focus(function (e) {
        if (isPasswordInputFocus) {
            passwordInputFocus();
            isPasswordInputFocus = false;
        }
    });
    $("#passwordInput").focusout(function (e) {
        if (!isPasswordInputFocus && ($("#passwordInput").val() === "")) {
            $("#passwordInputLabel").css({
                'fontSize': '1rem',
                'top': '-5px',
                'fontStyle': 'normal'
            }, 400);
            $(".passwordInputLine").animate({
                width: '0px'
            }, 300);
            isPasswordInputFocus = true;
        }
    });
});

$(document).ready(function () {
    $('#userNameResetPassword').focus(function () {
        $('#userNameResetPassword').css({ 'display': 'inline' });
    });
    $('#userNameResetPassword').focusout(function () {
        if ($('#userNameResetPassword').val() == "") {
            $('#userNameResetPassword').css({ 'display': 'block' });
        }
    });
    $('#resetPass').click(function () {
        $('#contentTitle').css({ 'display': 'none' });
        $('#inputUserNameLogin').css({ 'display': 'none' });
        var accID = $('#userNameResetPassword').val();
        var email = "";
        $.ajax({
            async: false,
            type: "POST",
            url: "/Account/ResetPassword",
            data: { accountID: accID },
            dataType: "JSON",
            success: function (response) {
                email = response.result;
            }
        });
        $('#email-receive').html(email);
        $('#noficationResetPass').css({ 'display': 'block' });
        $('#resetPass').css({ 'display': 'none' });
        //$('#resetPasswordModal').modal('hide');
        //$('#contentTitle').css({ 'display': 'block' });
        //$('#inputUserNameLogin').css({ 'display': 'block' });
    });
    $('#closeResetPasswordModal').click(function () {
        $('#contentTitle').css({ 'display': 'block' });
        $('#inputUserNameLogin').css({ 'display': 'block' });
        $('#noficationResetPass').css({ 'display': 'none' });
        $('#resetPass').css({ 'display': 'block' });
    });
    $('#openResetPass').click(function () {
        var userName = $('#userInput').val();
        $('#userNameResetPassword').val(userName);
        if (userName != "") {
            $('#userNameResetPassword').css({ 'display': 'inline' });
        }
    });
});