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
  renderTaskList([task]);
}

function getAlertLevel(dueDate){
  const dateWrapper = dayjs(dueDate);
  const dateDifference = dateWrapper.diff(dayjs(), 'd');

  if (dateDifference < 0){
      return 'task-past-due';
  }
  else if (dateDifference == 0){
    return 'task-due-today';
  }
  else {
    return '';
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(taskCards) {

  taskCards.forEach( card => {
    // Query lane in which to create card element
    const lane = $(`#${card.lane}`)
    
    // Create card element and style
    const cardElement = $('<div>');
    cardElement.addClass('task-card');
    cardElement.addClass(getAlertLevel(card.taskDueDate));
    
    // Create title element, style, populate, and add append to card
    const title = $('<h5>')
    title.addClass('p-2')
    title.text(card.taskTitle);
    cardElement.append(title);

    // Create description element, style, populate, and append to card
    const description = $('<div>');
    description.addClass('p-2');
    description.text(card.taskDescription);
    cardElement.append(description);

    // Create due date element, style, populate, and append to card
    const dueDate = $('<div>');
    dueDate.addClass('p-2');
    dueDate.text(dayjs(card.taskDueDate).format('M/D/YYYY'));
    cardElement.append(dueDate);

    // Append completed card to lane
    lane.append(cardElement);

    // To do: create elements and add to appropriate lanes
  })

}

function resetStorage(){
  localStorage.setItem('c5-task-cards', '');
}

// Todo: create a function to handle adding a new task
function handleAddTask() {
  // Create task data from queried form elements
  const taskData = {
    taskTitle: $("#task-title").val(),
    taskDueDate: $("#task-due-date").val(),
    taskDescription: $("#task-description").val(),
    lane: 'todo-cards'
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
  $(".needs-validation").each(function () {
    $(this).on('submit', validateFormData);
  });

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });
});

