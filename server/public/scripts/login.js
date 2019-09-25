"use strict";

/*
* This function creates Nav Links for Page.
*/
function createNavLinks()
{
    // Register Link
    $("#navbarLinks").append($("<li>", {
        id: "navRegister",
        class: "nav-item"
    }));
    $("#navRegister").append($("<a>", {
        class: "nav-link",
        href: "/users/register",
        html: "Register"
    }));
}

/*
* This function validates all fields on the Login Form.
*/
function validateLoginForm()
{
    $("#invalidData").empty();

    let displayErrorMessage = [];

    let errorFound = false;

    // Player Name Validation
    if ($("#inputUsername").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing User Name";
        errorFound = true;
    }

    // Player Contact Name Validation
    if ($("#inputPassword").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Password";
        errorFound = true;
    }

    // Call Display Errors Function (errors.js)
    displayErrors($("#invalidData"), displayErrorMessage, errorFound);

    return errorFound;
}

//Connect Events to HTML Elements
$(function ()
{
    createNavLinks();

    // Register Button click
    $("#registerBtn").on("click", function ()
    {
        location.href = "/users/register"
    })

    $('#loginForm').on('submit', (e) =>
    {
        e.preventDefault();

        let errorFound = validateLoginForm();

        if (errorFound)
        {
            return;
        }

        // Call Hide Error Function (errors.js)
        hideError($("#invalidData"));

        let data = {
            "username": $('#inputUsername').val(),
            "password": $('#inputPassword').val()
        };

        $.post("http://localhost:3000/users/login", data, function ()
        { })
            .done(function (res)
            {
                sessionStorage.setItem("userId", res.ID);
                sessionStorage.setItem("isAdmin", res.IS_ADMIN);

                location.href = "/filterteams";
            })
            .fail(function (e)
            {
                let displayErrorMessage;

                if (e.status === 403)
                {
                    displayErrorMessage = "Invalid Credentials";
                    errorFound = true;

                    // Call Display Errors Function (errors.js)
                    displayError($("#invalidData"), displayErrorMessage, errorFound);

                } 

                $('#inputUsername').focus();
            });
    });

})