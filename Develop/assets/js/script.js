// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const cards = [];

function retrieveCardsFromStorage() {
  const storageRaw = localStorage.getItem("c5-task-cards");

  if (storageRaw != null && storageRaw.startsWith("[")) {
    JSON.parse(storageRaw).forEach((card) => {
      cards.push(card);
    });
  }
}

function storeCardDateToLocalStorage() {
  localStorage.setItem("c5-task-cards", JSON.stringify(cards));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let newTaskId = crypto.randomUUID();
  let duplicateIdFound = false;
  for (const card of cards) {
    if (card.identifier == newTaskId) {
      duplicateIdFound = true;
    }
  }

  if (duplicateIdFound) {
    return generateTaskId();
  } else {
    return newTaskId;
  }
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
function renderTaskList() {
  // Clear all existing cards from UI
  $(".task-card").remove();

  // Loop through card data, create ui element for each
  cards.forEach((card) => {
    // Query lane in which to create card element
    const lane = $(`#${card.lane}`);

    // Create card element and style
    const cardElement = $("<div>");
    cardElement.attr("data-uid", card.identifier);
    cardElement.addClass("task-card draggable");
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

    // Append completed card to lane
    lane.append(cardElement);
  });

  // Add delete listeners to cards
  $(".btn-danger").on("click", handleDeleteTask);

  // Make each card draggable
  $(".draggable").draggable({
    // Applys draggable jquery widget to all elements with class 'draggable' (aka newly created cards)
    opacity: 0.7, // Set's opacity of element while it is being dragged
    zIndex: 1000, // Set's z index so element hovers in front of other elements on drag rather than behind them
    // The helper below does two things
    //   1) It creates a clone version of the dragged element, leaving the original in place until drop
    //   2) It assures that the cloned version has the same width as the original, to avoid the clone's width shrinking
    helper: function (e) {
      // The helper parameter takes a function for how to handle the dragged element
      const original = $(e.target).hasClass("ui-draggable") // This checks to see if the dragged element is jquery draggable
        ? $(e.target) // If it is, it returns the element itself
        : $(e.target).closest(".ui-draggable"); // otherwise, it returns the closest element with the draggable class
      return original.clone().css({
        // This returns a clone of the original helper
        width: original.outerWidth(), // and assigns the clone to have the same width as the original element
      });
    },
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
    identifier: generateTaskId(),
    lane: "cards-todo",
  };

  cards.unshift(taskData);
  storeCardDateToLocalStorage();
  renderTaskList();
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
  const cardElement = $(this).parent()[0]; // Use .parent since button element is nested within card parent div

  // Loop through cards in data
  cards.forEach((card) => {
    if (card.identifier == cardElement.dataset.uid) {
      // splice card from list on Id match
      indexToRemove = cards.indexOf(card);
      cards.splice(indexToRemove, 1);
    }
  });

  // Update local storage
  storeCardDateToLocalStorage();
  // Remove element from UI
  cardElement.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.stopPropagation(); // Prevent bubbling

  const cardId = ui.draggable[0].dataset.uid; // From the UI element selected, get the element with .draggable
  const lane = $(event.target).children(".connected-lane")[0]; // Get the child of the dropped element with class 'connected-lane'
  const laneId = $(lane).attr("id"); // Get the Id assigned to the lane the task was dropped in to

  for (const card of cards) {
    // Iterate through exising cards
    if (card.identifier == cardId) {
      // Find card matching dragged element's Id
      card.lane = laneId; // Assign card's lane property to match dropped lane's Id
    }
  }

  storeCardDateToLocalStorage(); // Store updated card data to local storage
  renderTaskList(); // Re-render card data
}

$(document).ready(function () {
  // Make lanes droppable via jquery widget
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop, // pass custom handler on drop event
  });

  // Identify the form using "needs-validation" class and apply validation as submission listener to each
  $(".needs-validation").each(function () {
    $(this).on("submit", validateFormData);
  });

  // Create datepicker for task date
  $(function () {
    $("#task-due-date").datepicker();
  });

  // Render task list
  retrieveCardsFromStorage();
  renderTaskList();
});
