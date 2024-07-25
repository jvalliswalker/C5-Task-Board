// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask() {

  console.log("logging new obj");
  const taskData = {
    taskTitle: $("#task-title").val(),
    taskDueDate: dayjs(Date($("#task-due-date").val())),
    taskDescription: $("#task-description").val(),
  };

  console.log(taskData);
}

function validateFormData(event) {
  console.log("validating form");

  const form = $("#create-task-form");

  // console.log(form);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // $("body").on("click", 'button[id="add-task"]', validateFormData);

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });
});

// Boostrap validation, source: https://getbootstrap.com/docs/5.0/forms/validation/#custom-styles
(function () { // Create Immediately invoked function expression
  "use strict"; // Implements strict mode, applying more stringent javascript syntax
  var forms = $(".needs-validation"); // Fetch all the forms we want to apply custom Bootstrap validation styles to

  Array.prototype.slice.call(forms).forEach(function (form) { // Loop over returned form elements, applying function to each
    form.addEventListener( // Add event listener to form element
      "submit", // fire on submission
      function (event) { // Create anonymous function
        event.preventDefault(); // Prevent standard submission
        event.stopPropagation(); // prevent bubbling
        form.classList.add('was-validated'); // Add bootstrap class turning on validation 

        if(form.checkValidity()){ // Check to see if validity returns true
          handleAddTask();
          $('#form-modal').modal('hide');
        }
      },
      false // Set "capture" parameter of event listener to false (excluding it from bubbling phase)
    ); // Close function for form element
  }); // Close for each loop
})(); // Close and call function
