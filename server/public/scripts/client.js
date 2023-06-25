// On DOM ready run function onReady
$(document).ready(onReady);

// Function will run getTask and event listeners/ handlers
function onReady() {
    getTask();

    // Event Listeners and Handlers
    // Add task button
    $('#add-task-button').on('click', addTask);

    // Checkbox button
    $('#table-body').on('click', '.checkbox-button', checkboxTask);

    // Delete task button
    $('#table-body').on('click', '.delete-button', deleteTask);

} // end onReady


// - FUNCTIONS/ HANDLERS -

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


/* Function to update task to completed or uncompleted (true/false) 
in database for order by, strike text-decoration and green background css activation.
Then run getTask. */
// PUT request
function checkboxTask() {
    // Logging
    console.log("In checkboxTask", $(this));

    // Selecting id of task
    let taskId = $(this).closest('tr').data('id');
    console.log("taskId is:", taskId);

    // Toggle CSS text strike through and green background on click
    $(this).closest('tr').toggleClass('checkbox');

    // PUT request to router
    // $.ajax({
    //     method: 'PUT',
    //     url: `/task/${taskId}`
    // }).then((response) => {

    // }).catch((error) => {

    // })
    

    


} // end checkboxTask


// Function to delete task from database then run getTask 
function deleteTask() {
    // Logging
    console.log("In deleteTask:", $(this));

    // Selecting id of task
    let taskId = $(this).closest('tr').data('id');
    console.log("taskId is:", taskId);

    // Remove row delete button resides in
    $(this).closest('tr').remove();


    // Deleting task with ajax
    $.ajax({
        method: 'DELETE',
        url: `/task/${taskId}`
    }).then((response) => {
        console.log("Deleted song:", response);
        getTask();
    }).catch((error) => {
        console.log("Error with delete request", error);
        alert("Error deleting task.");
    })

} //end deleteTask


// Function for input field validation
function formValidation() {

} // end formValidation



// Function to render tasks form database to table in DOM
function render(task) {
    // Empty table
    $('#table-body').empty()

    // Loop through to-do list data and render each property
    for (i = 0; i < task.length; i++)
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