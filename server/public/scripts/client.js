// On DOM ready run function onReady
$(document).ready(onReady);

// Function will run getTask
function onReady() {
    getTask();

    // Event Listeners and Handlers
    // Add task button
    $('#add-task-button').on('click', addTask);


} // end onReady






// Function to request all to-do list tasks from database and render to DOM
// GET request
function getTask() {
    console.log("Sent GET request to retrieve all tasks from server.");

    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((response) => {
        console.log("GET /tasks response:", response)

        // Render response to DOM
        render(response)

    }).catch((error) => {
        console.log("Error with GET request to server:", error);
        alert("Error retrieving to-do list :(");
    })
}; // end getTask




// Function to capture input field add a task to the to-do list database
// POST request
function addTask() {
    // Log to console
    console.log("Sent POST request to add task to server.");

    // Capture values from input fields inside an object
    // Changing priority input value to integer
    let priority = $('#priority-input').val();
    
    let task = {
        task: $('#task-input').val(),
        priority: parseInt($('#priority-input').val()),
        dueDate: $('#due-date-input').val(),
    } // end taskInputVals

    // Form validation function goes here

    $.ajax({
        method: 'POST',
        url: '/task',
        data: task
    }).then((response) => {
        console.log("Success, task sent!", response);

        // Run getTask function to refresh data in DOM
        getTask();

        // Clear input fields
        $('#task-input').val('');
        $('#priority-input').val('');
        $('#due-date-input').val('');
    }).catch((error) => {
        console.log("Error with POST request sending task", error);
        alert("Error sending task :(");
    })

} // end addTask

// Function for input field validation
function formValidation() {

} // end formValidation



// Function to render tasks form database to table in DOM
function render(task) {
    // Empty table
    $('#table-body').empty()

    // Loop through to-do list data and render each property
    for (i = 0; i < task.length; i ++)
        $('#table-body').append(`
            <tr data-id="${task[i].id}">
                <td>${task[i].task}<button class="edit-button" type="button">✎</button></td>
                <td>${task[i].priority}</td>
                <td>${task[i].due_date}</td>
                <td>
                    <button class="checkbox-button" type="button">✅</button>
                    <button class="delete-button" type="button">❌</button>
                </td> 
            </tr>
    `)
} // end render