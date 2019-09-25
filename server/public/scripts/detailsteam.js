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
* This function inserts a Header Row into the Players Table.
*/
function insertPlayerHeadRow()
{
    $("#players").append("<thead>");
    $("#players thead").append("<tr>");
    $("#players thead tr").append($("<th>", { text: "Player Name" }))
        .append($("<th>", { text: "Email Address" }));
}

/* 
* This function inserts Data Rows into the Players Table.
*
* @param details (Array) - Team Details array
* @param i (index to array) - Team Details array index
*/
function insertPlayerRow(details, i)
{
    $("#players tbody").append("<tr>")
    $("#players tbody tr:last").append($("<td>", { html: details.Members[i].MemberName }))
        .append($("<td>", { html: details.Members[i].Email }));
}

//Connect Events to HTML Elements
$(function ()
{
    let userID = sessionStorage.getItem("userId");
    let isAdmin = sessionStorage.getItem("isAdmin");

    createNavLinks(userID, isAdmin);

    let teamIdLoc = location.href.lastIndexOf('/') + 1;
    let teamSelected = location.href.substring(teamIdLoc, location.href.length);

    sessionStorage.setItem("page", "/detailsteam/" + teamSelected);
    
    // Get all data from Teams by Team Id JSON file
    $.getJSON("/teams/data/" + teamSelected,
        function (details)
        {
            let leagues = JSON.parse(sessionStorage.getItem("leagues"));

            let leaguesLength = leagues.length;

            for (let i = 0; i < leaguesLength; i++)
            {
                let option = $("<option>",
                    {
                        val: leagues[i].Code,
                        text: leagues[i].Name
                    })

                $("#leaguecode").append(option);
            }

            // Disable all Team Details Fields
            $("*", "#teamDetailsForm").prop('disabled', true);

            // Team Information Fieldset
            $("#teamid").val(details.TeamId);
            $("#teamname").val(details.TeamName);
            $("#leaguecode").val(details.League);
            $("#teamgender").val(details.TeamGender);
            $("#maxteammembers").val(details.MaxTeamMembers);
            $("#minmemberage").val(details.MinMemberAge);
            $("#maxmemberage").val(details.MaxMemberAge);

            // Manager Information Fieldset
            $("#managername").val(details.ManagerName);
            $("#managerphone").val(details.ManagerPhone);
            $("#manageremail").val(details.ManagerEmail);

            let playersLength = details.Members.length;

            if (playersLength >= 1)
            {
                // Call Create Table Head Row Function
                insertPlayerHeadRow();

                $("#players").append("<tbody>");

                for (let i = 0; i < playersLength; i++)
                {
                    insertPlayerRow(details, i);
                }
            }

            $("#addPlayerBtnDiv").append($("<a>", {
                href: "/newplayer/" + teamSelected,
                id: "addPlayerBtn",
                text: "Add Player",
                class: "col-md-1 btn btn-success btn-sm mb-2 mr-1",
                role: "button"
            }));

            if (Number($("#maxteammembers").val()) == playersLength)
            {
                $("#addPlayerBtn").hide();
                $("#teamFullDiv").show();
            }
            else
            {
                $("#addPlayerBtn").show();
                $("#teamFullDiv").hide();
            }

            $("#buttonsDiv").append($("<a>", {
                href: "/filterteams",
                id: "backBtn",
                text: "Back",
                class: "col-md-2 btn btn-primary btn-sm mb-1",
                role: "button"
            }));
        })
    return;
})