// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const cards = [];

function getCardsFromStorage() {
  const storageRaw = localStorage.getItem("c5-task-cards");
  console.log(storageRaw);
  if (storageRaw != null && storageRaw.startsWith("[")) {
    JSON.parse(storageRaw).forEach((card) => {
      cards.push(card);
    });
  }

  renderTaskList(cards);
}

function storeCardData() {
  localStorage.setItem("c5-task-cards", JSON.stringify(cards));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Add card data to global cards list and save to local storage
function createTaskCard(task) {
  cards.unshift(task);
  storeCardData();
  renderTaskList([task]);
}

function getAlertLevel(dueDate) {
  const dateWrapper = dayjs(dueDate);
  const dateDifference = dateWrapper.diff(dayjs(), "d");

  if (dateDifference < 0) {
    return "task-past-due";
  } else if (dateDifference == 0) {
    return "task-due-today";
  } else {
    return "";
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(taskCards) {
  taskCards.forEach((card) => {
    // Query lane in which to create card element
    const lane = $(`#${card.lane}`);

    // Create card element and style
    const cardElement = $("<div>");
    cardElement.addClass("task-card");
    cardElement.addClass(getAlertLevel(card.taskDueDate));

    // Create title element, style, populate, and add append to card
    const title = $("<h5>");
    title.addClass("p-2");
    title.text(card.taskTitle);
    cardElement.append(title);

    // Create description element, style, populate, and append to card
    const description = $("<div>");
    description.addClass("p-2");
    description.text(card.taskDescription);
    cardElement.append(description);

    // Create due date element, style, populate, and append to card
    const dueDate = $("<div>");
    dueDate.addClass("p-2");
    dueDate.text(dayjs(card.taskDueDate).format("M/D/YYYY"));
    cardElement.append(dueDate);

    // Create Delete button
    const deleteButton = $("<button>");
    deleteButton.addClass("btn btn-danger task-delete-button");
    deleteButton.text("Delete");
    cardElement.append(deleteButton);

    // Append and hide identifier
    const identifier = $("<div>");
    identifier.addClass("hidden");
    identifier.addClass("identifier");
    identifier.text(card.identifier);
    cardElement.append(identifier);

    // Append completed card to lane
    lane.append(cardElement);
  });
}

function resetStorage() {
  localStorage.setItem("c5-task-cards", "");
}

// Todo: create a function to handle adding a new task
function handleAddTask() {
  // Create task data from queried form elements
  const taskData = {
    taskTitle: $("#task-title").val(),
    taskDescription: $("#task-description").val(),
    taskDueDate: $("#task-due-date").val(),
    identifier: Math.random().toString(16).substring(2, 8),
    lane: "todo-cards",
  };

  // Call create task function
  createTaskCard(taskData);
}

// Boostrap validation, original source: https://getbootstrap.com/docs/5.0/forms/validation/#custom-styles
function validateFormData(event) {
  event.preventDefault(); // Prevent default submission behavior
  this.classList.add("was-validated"); // Add bootstrap class turning on validation

  if (this.checkValidity()) {
    // Check form validity
    handleAddTask(); // Call task creation handler
    $("#form-modal").modal("hide"); // Close bootstrap modal
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const card = $(this).parent();

  let cardElementIdentifier;

  card.children("identifier").each(function () {
    cardElementIdentifier = $(this).text();
  });

  cards.forEach((card) => {
    if (card.identifier == cardElementIdentifier) {
      indexToRemove = cards.indexOf(card);
      cards.splice(indexToRemove, 1);
    }
  });

  storeCardData();
  card.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

$(document).ready(function () {
  // To Do:
  // Make lanes droppable

  // Render task list
  getCardsFromStorage();

  // Add delete listeners to cards
  $(".swim-lane")
    .children(".task-card")
    .children(".btn-danger")
    .on("click", handleDeleteTask);

  // Identify the form using "needs-validation" class and apply validation as submission listener to each
  $(".needs-validation").each(function () {
    $(this).on("submit", validateFormData);
  });

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });
});
