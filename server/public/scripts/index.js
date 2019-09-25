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

//Connect Events to HTML Elements
$(function ()
{
    createNavLinks();

    // Get all data from Leagues
    $.getJSON("/leagues/data",
        function (leagues)
        {
            let leaguesLength = leagues.length;
      
            sessionStorage.setItem("leagues", JSON.stringify(leagues));

            sessionStorage.setItem("page", "/");

            // Clear out Search Criteria before Filter Teams page
            sessionStorage.removeItem("searchDivision");
            sessionStorage.removeItem("searchGender");
                   
            for (let i = 0; i < leaguesLength; i++)
            {
                // Dynamically create hockey divisions (Name and Description)
                $("#hockeyDivisions").append($("<div>", {
                    id: leagues[i].Code,
                    class: "col-sm-3"
                }));

                $("#hockeyDivisions div:last").append($("<h2>", {
                    text: leagues[i].Name,
                }));

                $("#hockeyDivisions div:last").append($("<p>", {
                    text: leagues[i].Description,
                }));
            }
        })
})