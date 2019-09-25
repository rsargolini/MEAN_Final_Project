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
* This function performs Team search by Division and/or Gender.
*/
function performTeamSearch(teams, teamsLength)
{
    $("#teams").empty();

    // Call Create Table Head Row Function
    insertHeadRow();

    $("#teams").append("<tbody>");

    for (let i = 0; i < teamsLength; i++)
    {
        if (($("#selectDivision option:selected").val() == "All") && (($("#selectGender option:selected").val() == "All")))
        {
            insertRow(teams, i);
        }
        else
        {
            if (($("#selectDivision option:selected").val() == teams[i].League) && ($("#selectGender option:selected").val() == "All"))
            {
                insertRow(teams, i);
            }
            else
            {
                if (($("#selectGender option:selected").val() == teams[i].TeamGender) && ($("#selectDivision option:selected").val() == "All"))
                {
                    insertRow(teams, i);
                }
                else
                {
                    if (($("#selectDivision option:selected").val() == teams[i].League) && ($("#selectGender option:selected").val() == teams[i].TeamGender))
                    {
                        insertRow(teams, i);
                    }
                }
            }
        }
    }
}

/* 
* This function inserts a Header Row into the Teams Table.
*/
function insertHeadRow()
{
    $("#teams").append("<thead>");
    $("#teams thead").append("<tr>");
    $("#teams thead tr").append($("<th>", { text: "Team Name" }))
        .append($("<th>", { text: "Division" }))
        .append($("<th>", { text: "Manager Name" }))
        .append($("<th>", { colspan: "2", text: "Actions", class: "text-center" }));
}

/* 
* This function inserts Data Rows into the Teams Table.
* 
* @param details (Array) - Team Details array
* @param i (index to array) - Team Details array index
*/
function insertRow(teams, i)
{
    $("#teams tbody").append("<tr>")
    $("#teams tbody tr:last").append($("<td>", { html: teams[i].TeamName }))
        .append($("<td>", { html: teams[i].League }))
        .append($("<td>", { html: teams[i].ManagerName }))
        .append("<td class='teamsBtn'>");

    $("#teams tbody tr:last td:last").append($("<a>", {
        href: "/detailsteam/" + teams[i].TeamId,
        id: "editBtn" + [i],
        class: "btn btn-outline-success btn-sm",
        role: "button"
    }));

    $("#teams tbody tr:last td:last a").append($("<i>", { class: "fa fa-edit" }))
        .append($("<span>", { class: "buttonText", text: "Details" }));

    $("#teams tbody tr:last").append("<td class='teamsBtn'>");
    $("#teams tbody tr:last td:last").append($("<a>", {
        href: "#",
        id: "deleteBtn" + [i],
        class: "btn btn-outline-danger btn-sm",
        role: "button"
    }));

    $("#teams tbody tr:last td:last a").append($("<i>", { class: "far fa-trash-alt" }))
        .append($("<span>", { class: "buttonText", text: "Delete" }));
}

//Connect Events to HTML Elements
$(function ()
{
    let userID = sessionStorage.getItem("userId");
    let isAdmin = sessionStorage.getItem("isAdmin");

    createNavLinks(userID, isAdmin);

    sessionStorage.setItem("page", "/filterteams");

    let leagues = JSON.parse(sessionStorage.getItem("leagues"));

    let leaguesLength = leagues.length;

    for (let i = 0; i < leaguesLength; i++)
    {
        let option = $("<option>",
            {
                val: leagues[i].Code,
                text: leagues[i].Name
            })

        $("#selectDivision").append(option);
    }

    // Set Search Criteria to previous criteria exists
    let searchDivision = sessionStorage.getItem("searchDivision");
    let searchGender = sessionStorage.getItem("searchGender");

    if (searchDivision != null) 
    {
        $("#selectDivision").val(searchDivision);
    }
    else
    {
        $("#selectDivision").val("All");
    }

    if (searchGender != null) 
    {
        $("#selectGender").val(searchGender);
    }
    else
    {
        $("#selectGender").val("All");
    }

    let selectedTeam;

    // Get all data from Teams
    $.getJSON("/teams/data",
        function (teams)
        {
            let teamsLength = teams.length;

            sessionStorage.setItem("teams", JSON.stringify(teams));

            performTeamSearch(teams, teamsLength);
            wireTeamDeleteBtn(teams, teamsLength);

            // Select Division Field changed
            $("#selectDivision").on("change", function ()
            {
                performTeamSearch(teams, teamsLength);
                wireTeamDeleteBtn(teams, teamsLength);
                sessionStorage.setItem("searchDivision", $("#selectDivision option:selected").val());
            })

            $("#modalBody").append("<b>Division: </b>" + $("#leaguecode").val())
                .append("<br />");

            // Select Gender Field changed
            $("#selectGender").on("change", function ()
            {
                performTeamSearch(teams, teamsLength);
                wireTeamDeleteBtn(teams, teamsLength);
                sessionStorage.setItem("searchGender", $("#selectGender option:selected").val());
            })

            // Confirm Delete Button click
            $("#confirmBtn").on("click", function ()
            {
                // Delete Team to API Teams
                $.ajax({
                    url: "teams/data/" + teams[selectedTeam].TeamId,
                    method: "DELETE"
                })
                    .done(function ()
                    {
                        $("#deleteTeamModal").modal("hide");
                        location.reload();
                    })

                    .fail(function ()
                    {
                        $("#savedModalText").html("Deletion has failed, please try again.")
                            .addClass("text-danger");
                        $("#savedModal").modal("show");
                    })
            })

            function wireTeamDeleteBtn(teams, teamsLength)
            {
                for (let i = 0; i < teamsLength; i++)
                {
                    $("#deleteBtn" + [i]).on("click", function ()
                    {
                        $("#deleteModalBody").empty();
                        $("#deleteTeamModalText").html("Are you sure you want to delete this Team?")
                            .addClass("text-danger");
                        $("#deleteModalBody").append("<b>Division: </b>" + teams[i].League)
                            .append("<br />")
                            .append("<b>Team Name: </b>" + teams[i].TeamName);
                        $("#deleteTeamModal").modal("show");
                        selectedTeam = [i];
                    })
                }
            }
        })

    // Add a New Team Button click
    $("#addTeamBtn").on("click", function ()
    {
        location.assign("/newteam");
    })

    // Back Button click
    $("#backBtn").on("click", function ()
    {
        location.assign("/");
    })
})