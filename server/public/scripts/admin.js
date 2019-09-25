"use strict";

/*
* This function creates Nav Links for Page.
*/
function createNavLinks(userID, isAdmin)
{
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
* This function loads the Registered Users Table.
*/
function performLoadUserTable(users, usersLength)
{
    $("#regUsers").empty();

    // Call Create Table Head Row Function
    insertHeadRow();

    $("#regUsers").append("<tbody>");

    for (let i = 0; i < usersLength; i++)
    {
        insertRow(users, i);
    }
}

/* 
* This function inserts a Header Row into the Registered Users Table.
*/
function insertHeadRow()
{
    $("#regUsers").append("<thead>");
    $("#regUsers thead").append("<tr>");
    $("#regUsers thead tr").append($("<th>", { text: "User Name" }))
        .append($("<th>", { text: "Email Address" }));
}

/* 
* This function inserts Data Rows into the Registered Users Table.
* 
* @param users (Array) - Users array
* @param i (index to array) - Users array index
*/
function insertRow(users, i)
{
    $("#regUsers tbody").append("<tr>")
    $("#regUsers tbody tr:last").append($("<td>", { html: users[i].USERNAME }))
        .append($("<td>", { html: users[i].EMAIL }));
}

//Connect Events to HTML Elements
$(function ()
{
    let userID = sessionStorage.getItem("userId");
    let isAdmin = sessionStorage.getItem("isAdmin");

    createNavLinks(userID, isAdmin);

    let prevPage = sessionStorage.getItem("page");

    // Get all None Admin data from Users
    $.getJSON("/users/data",
        function (users)
        {
            let usersLength = users.length;

            performLoadUserTable(users, usersLength);

            $("#buttonsDiv").append($("<a>", {
                href: prevPage,
                id: "backBtn",
                text: "Back",
                class: "col-md-2 btn btn-primary btn-sm mb-1 mr-1",
                role: "button"
            }));
        })
})