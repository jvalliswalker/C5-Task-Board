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
  const taskData = {
    taskTitle: $("#task-title").val(),
    taskDueDate: dayjs(Date($("#task-due-date").val())),
    taskDescription: $("#task-description").val(),
  };

  console.log(taskData);
}

// Boostrap validation, original source: https://getbootstrap.com/docs/5.0/forms/validation/#custom-styles
function validateFormData(event) {
  event.preventDefault();
  this.classList.add("was-validated"); // Add bootstrap class turning on validation

  if (this.checkValidity()) {
    // Check to see if validity returns true
    handleAddTask();
    $("#form-modal").modal("hide");
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // $("body").on("click", 'button[id="add-task"]', validateFormData);

  // Identify the form using "needs-validation" class and apply validation as submission listener to each
  $(".needs-validation").each(function (i, obj) {
    $(obj).on('submit', validateFormData);
  });

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });
});

