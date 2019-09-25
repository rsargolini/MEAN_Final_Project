"use strict";

/*
* This function creates Nav Links for Page.
*/
function createNavLinks()
{
    // Login Link
    $("#navbarLinks").append($("<li>", {
        id: "navLogin",
        class: "nav-item"
    }));
    $("#navLogin").append($("<a>", {
        class: "nav-link",
        href: "/users/login",
        html: "Login"
    }));
}

/*
* This function validates all fields on the Register Form.
*/
function validateRegisterForm()
{
    $("#invalidData").empty();

    const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

    let displayErrorMessage = [];

    let errorFound = false;

    // User Name Validation
    if ($("#inputUsername").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing User Name";
        errorFound = true;
    }

    // User Password Validation
    if ($("#inputPassword").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Password";
        errorFound = true;
    }


    // User Email Validation
    if ($("#inputEmail").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Email Address";
        errorFound = true;
    }
    else
    {
        if (emailFormat.test($("#inputEmail").val()))
        {
        }
        else
        {
            displayErrorMessage[displayErrorMessage.length] = "Invalid Email Address (nnnn@nnn.nnn)";
            errorFound = true;
        }
    }

    // Call Display Errors Function (errors.js)
    displayErrors($("#invalidData"), displayErrorMessage, errorFound);

    return errorFound;
}

//Connect Events to HTML Elements
$(function ()
{
    createNavLinks();

    // Cancel Button click
    $("#cancelBtn").on("click", function ()
    {
        location.href = "/users/login"
    })

    $('#registerForm').on('submit', (e) =>
    {
        e.preventDefault();

        let errorFound = validateRegisterForm();

        if (errorFound)
        {
            return;
        }

        // Call Hide Error Function (errors.js)
        hideError($("#invalidData"));

        let data = {
            "username": $('#inputUsername').val(),
            "password": $('#inputPassword').val(),
            "email": $('#inputEmail').val()
        };

        $.post("/users/register", data, function ()
        { })
            .done(function (res)
            {
                location.href = "/users/login"
            })
            .fail(function (e)
            {
                if (e.status === 403)
                {
                    let displayErrorMessage;

                    displayErrorMessage = "Username already exists.";
                    errorFound = true;

                    // Call Display Errors Function (errors.js)
                    displayError($("#invalidData"), displayErrorMessage, errorFound);
                }

                $('#inputUsername').focus();
            });
    });

})