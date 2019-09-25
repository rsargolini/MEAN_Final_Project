"use strict";

/*
* This function creates Nav Links for Page.
*/
function createNavLinks(isAdmin)
{
    // Admin Link
    if (isAdmin == 1)
    {
        $("#navbarLinks").append($("<li>", {
            id: "navAdmin",
            class: "nav-item"
        }));
        $("#navAdmin").append($("<a>", {
            class: "nav-link",
            href: "/admin",
            html: "Admin"
        }));
    }

    // Logout Link
    $("#navbarLinks").append($("<li>", {
        id: "navLogout",
        class: "nav-item"
    }));
    $("#navLogout").append($("<a>", {
        class: "nav-link",
        href: "/users/logout",
        html: "Log Out"
    }));
}

/*
* This function validates Email fields on the User Profile Form.
*/
function validateEmail()
{
    $("#invalidData").empty();

    const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

    let displayErrorMessage = [];

    let errorFound = false;

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
    let isAdmin = sessionStorage.getItem("isAdmin");

    createNavLinks(isAdmin);

    let userIDLoc = location.href.lastIndexOf('/') + 1;
    let userID = location.href.substring(userIDLoc, location.href.length);

    let prevPage = sessionStorage.getItem("page");

    // Get all data from Users by User Name JSON file
    $.getJSON("/users/data/" + userID,
        function (details)
        {   
            $("#inputUsername").val(details.USERNAME);
            $("#inputEmail").val(details.EMAIL);
        })

    // Back Button click
    $("#backBtn").on("click", function ()
    {
        location.href = prevPage
    })

    $('#userProfileForm').on('submit', (e) =>
    {
        e.preventDefault();

        let errorFound = validateEmail();

        if (errorFound)
        {
            return;
        }

        // Call Hide Error Function (errors.js)
        hideError($("#invalidData"));

        // Put (Update) Form to Users
        $.ajax({
            url: "/users/data/" + userID,
            method: "PUT",
            data: "email=" + $("#inputEmail").val()
        })
            .done(function ()
            {
                $("#modalBody").empty();
                $("#savedModalText").html("User Profile has been successfully updated.")
                    .addClass("text-primary");
                $("#savedModal").modal("show");
            })

            .fail(function ()
            {
                $("#savedModalText").html("Update has failed, please try again.")
                    .addClass("text-danger");
                $("#savedModal").modal("show");
            })
    })

    // Save Modal Ok Button click
    $("#okBtn").on("click", function ()
    {
        location.reload();
        $('#inputEmail').focus();
    })

    $("#deleteBtn").on("click", function ()
    {
        $("#deleteModalBody").empty();
        $("#deleteUserAccountText").html("Are you sure you want to delete your User Profile?")
            .addClass("text-danger");
        $("#deleteUserAccountModal").modal("show");
    })

    // Confirm Delete Button click
    $("#modalConfirmBtn").on("click", function ()
    {
        // Delete User Profile
        $.ajax({
            url: "http://localhost:3000/users/data/" + userID,
            method: "DELETE"
        })
            .done(function ()
            {
                $("#deleteUserAccountModal").modal("hide");
                location.href = "/users/logout";
            })

            .fail(function ()
            {
                $("#savedModalText").html("Deletion has failed, please try again.")
                    .addClass("text-danger");
                $("#savedModal").modal("show");
            })
    })
});