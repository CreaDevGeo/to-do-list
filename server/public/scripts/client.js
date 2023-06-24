// On DOM ready run function onReady
$(document).ready(onReady);

// Function will run getTask
function onReady() {
    getTask();
} // end onReady

// Function to request all to-do list tasks from database and render to DOM
function getTask() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        console.log("GET /tasks response", response)
        // Render response to DOM

    }).catch((error) => {
        console.log("Error with GET request to server:", error);
        alert("Error retrieving to-do list from server :(");
    })
}; // end getTask