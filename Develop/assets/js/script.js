// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const cards = [];

function getCardsFromStorage(){

  const storageRaw = localStorage.getItem('c5-task-cards');

  if(storageRaw != null && storageRaw.startsWith('[')){
    const taskCards = JSON.parse(storageRaw);

    taskCards.forEach(card => {
      createTaskCard(card);
    })
  }
}

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Add card data to global cards list and save to local storage
function createTaskCard(task) {
  cards.unshift(task);
  localStorage.setItem('c5-task-cards', JSON.stringify(cards));
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask() {
  // Create task data from queried form elements
  const taskData = {
    taskTitle: $("#task-title").val(),
    taskDueDate: dayjs(Date($("#task-due-date").val())),
    taskDescription: $("#task-description").val(),
  };

  // Call create task function
  createTaskCard(taskData);
}

// Boostrap validation, original source: https://getbootstrap.com/docs/5.0/forms/validation/#custom-styles
function validateFormData(event) {
  event.preventDefault(); // Prevent default submission behavior
  this.classList.add("was-validated"); // Add bootstrap class turning on validation

  if (this.checkValidity()) { // Check form validity
    handleAddTask(); // Call task creation handler
    $("#form-modal").modal("hide"); // Close bootstrap modal
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

$(document).ready(function () {

  // To Do: 
  // Make lanes droppable
  
  // Render task list
  getCardsFromStorage();

  // Identify the form using "needs-validation" class and apply validation as submission listener to each
  $(".needs-validation").each(function (i, obj) {
    $(obj).on('submit', validateFormData);
  });

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });
});

