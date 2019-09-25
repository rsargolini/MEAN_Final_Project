"use strict";

/*
* This function creates Nav Links for Page.
*/
function createNavLinks(userID, isAdmin)
{
    // Add Team Link
    $("#navbarLinks").append($("<li>", {
        id: "navNewTeam",
        class: "nav-item"
    }));
    $("#navNewTeam").append($("<a>", {
        class: "nav-link",
        href: "/newteam",
        html: "Add Team"
    }));

    // Edit Profile Link
    $("#navbarLinks").append($("<li>", {
        id: "userProfile",
        class: "nav-item"
    }));
    $("#userProfile").append($("<a>", {
        class: "nav-link",
        href: "/editprofile/" + userID,
        html: "Edit Profile"
    }));

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
* This function validates all fields on the Player Details Form.
*/
function validatePlayerDetailsForm(teamGender, teamMinAge, teamMaxAge)
{
    $("#invalidData").empty();

    const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    const phoneFormat = /^\d{3}-\d{3}-\d{4}$/;

    let displayErrorMessage = [];

    let errorFound = false;

    // Player Name Validation
    if ($("#membername").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Name";
        errorFound = true;
    }

    // Player Contact Name Validation
    if ($("#contactname").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Contact Name";
        errorFound = true;
    }

    // Player Email Validation
    if ($("#email").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Email Address";
        errorFound = true;
    }
    else
    {
        if (emailFormat.test($("#email").val()))
        {
        }
        else
        {
            displayErrorMessage[displayErrorMessage.length] = "Invalid Email Address (nnnn@nnn.nnn)";
            errorFound = true;
        }
    }

    // Player Gender vs Team Gender Validation
    if ($("input[name='gender']:checked").val() == null)
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Gender";
        errorFound = true;
    }
    else
    {
        if (teamGender == "Any")
        {
        }
        else
        {
            if ($("input[name='gender']:checked").val() != teamGender)
            {
                displayErrorMessage[displayErrorMessage.length] = "Player's Gender not allowed on this Team.";
                errorFound = true;
            }
        }
    }

    // Player Age vs Team Age Validation
    if ($("#age").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Age";
        errorFound = true;
    }
    else
    {
        if (Number($("#age").val()) < teamMinAge)
        {
            displayErrorMessage[displayErrorMessage.length] = "Player is too young for Team. Min Age is " + teamMinAge + ".";
            errorFound = true;
        }
        else
        {
            if (Number($("#age").val()) > teamMaxAge)
            {
                displayErrorMessage[displayErrorMessage.length] = "Player is too old for Team. Max Age is " + teamMaxAge + ".";
                errorFound = true;
            }
        }
    }

    // Player Phone Validation
    if ($("#phone").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Phone Number";
        errorFound = true;
    }
    else
    {
        if (phoneFormat.test($("#phone").val()))
        {
        }
        else
        {
            displayErrorMessage[displayErrorMessage.length] = "Invalid Phone Number (999-999-9999)";
            errorFound = true;
        }
    }

    // Player Position Validation
    if ($("#position").val().trim() == "None")
    {
        displayErrorMessage[displayErrorMessage.length] = "Must select a Position";
        errorFound = true;
    }

    // Player Shoots Validation
    if ($("input[name='shoots']:checked").val() == null)
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Shoots";
        errorFound = true;
    }

    // Call Display Errors Function (errors.js)
    displayErrors($("#invalidData"), displayErrorMessage, errorFound);

    return errorFound;
}

//Connect Events to HTML Elements
$(function ()
{
    let userID = sessionStorage.getItem("userId");
    let isAdmin = sessionStorage.getItem("isAdmin");

    createNavLinks(userID, isAdmin);

    let teamIdLoc = location.href.lastIndexOf('/') + 1;
    let teamSelected = location.href.substring(teamIdLoc, location.href.length);

    sessionStorage.setItem("page", "/newplayer/" + teamSelected);

    // Get all data from Teams by Team Id JSON file
    $.getJSON("/teams/data/" + teamSelected,
        function (details)
        {
            let teams = details;

            let teamGender = teams.TeamGender;
            let teamMinAge = teams.MinMemberAge;
            let teamMaxAge = teams.MaxMemberAge;

            let popOverGender = teams.TeamGender;

            if (teamGender == "Any")
            {
                popOverGender = "Coed";
            }
            else
            {
                popOverGender = teamGender;
            }

            $("#leaguecode").val(teams.League);
            $("#teamname").val(teams.TeamName);

            $("#popoverData").popover({
                content: "<b>Min Age - " + teamMinAge + "<br/>Max Age - " + teamMaxAge + "</br>Gender - " + popOverGender + "</b>",
                html: true
            });

            $("#buttonsDiv").append($("<a>", {
                href: "#",
                id: "savePlayerBtn",
                text: "Save",
                class: "col-md-2 btn btn-success btn-sm mb-1 mr-1",
                role: "button"
            }));

            $("#buttonsDiv").append($("<a>", {
                href: "/detailsteam/" + teamSelected,
                id: "cancelBtn",
                text: "Cancel",
                class: "col-md-2 btn btn-danger btn-sm mb-1",
                role: "button"
            }));

            // Save Player Details Button click
            $("#savePlayerBtn").on("click", function ()
            {
                let errorFound = validatePlayerDetailsForm(teamGender, teamMinAge, teamMaxAge);

                if (errorFound)
                {
                    return;
                }

                // Call Hide Error Function (errors.js)
                hideError($("#invalidData"));

                // Post Add Player Form to API Teams
                $.post("/teams/data/" + teamSelected + "/members/data", $("#addPlayerForm").serialize(),
                    function (data)
                    { })

                    .done(function ()
                    {
                        $("#savedModalText").html("Player has been successfully added.")
                            .addClass("text-primary");
                        $("#modalBody").append("<b>Division: </b>" + $("#leaguecode").val())
                            .append("<br />")
                            .append("<b>Team Name: </b>" + $("#teamname").val())
                            .append("<br />")
                            .append("<b>Player Name: </b>" + $("#membername").val());
                        $("#savedModal").modal("show");

                        // Ok Button click
                        $("#okBtn").on("click", function ()
                        {
                            location.href = "/detailsteam/" + teamSelected;
                        })
                    })

                    .fail(function ()
                    {
                        $("#savedModalText").html("Failed to Add Player to Team, please try again.")
                            .addClass("text-danger");
                        $("#savedModal").modal("show");
                    })

                return false;
            })
        })
})