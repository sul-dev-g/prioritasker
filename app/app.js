// Forms
const enterTaskForm = document.querySelector("#enter-task-form");
const quizForm = document.querySelector("#quiz-form");

// Task the user has entered
const getUsersTask = function () {
  const input = document.querySelector("#input");
  const inputtedTask = input.value.trim();
  return inputtedTask;
};

// Stores the task in quiz modal
const storeTaskInQuiz = function () {
  const taskContents = document.querySelector(".task-contents");
  taskContents.textContent = getUsersTask();
  return taskContents;
};

// Opens quiz modal
const openQuiz = function () {
  quiz.classList.remove("hidden");
};

// Clears input field
const clearInputField = function () {
  input.value = "";
};

// Calls a variety of functions for user to move from adding a task, to answering quiz questions about their task
const callsFunctionsAfterAddingATask = function (event) {
  event.preventDefault();
  getUsersTask();
  storeTaskInQuiz();
  clearInputField();
  openQuiz();
};

// Opens quiz modal when user adds a task
enterTaskForm.addEventListener("submit", callsFunctionsAfterAddingATask);

// Determines what user should do with the task (e.g. Do Now, Delegate, Schedule or Delete) - depending on their quiz answers
const givesTaskDirections = function () {
  // All the possible quiz answers
  const urgentChecked = document.getElementById("urgent").checked;
  const notUrgentChecked = document.getElementById("not-urgent").checked;
  const importantChecked = document.getElementById("important").checked;
  const notImportantChecked = document.getElementById("not-important").checked;

  // Tells user what to do with task based on their quiz answers
  if (urgentChecked && importantChecked) {
    return "Do Now!";
  } else if (notUrgentChecked && importantChecked) {
    return "Schedule";
  } else if (urgentChecked && notImportantChecked) {
    return "Delegate";
  } else {
    return "Delete";
  }
};

// Creates an object for each task a user enters
const dateOfTaskCreation = new Date().toDateString();
const createTaskObject = function () {
  const taskObject = {
    id,
    contents: `${storeTaskInQuiz}`,
    directions: taskDirections,
    date: dateOfTaskCreation,
  };
};

// Goal: Display task on quiz screen
// Current objective: find out why input value is giving undefined
// Get the actual input value
// Keep updating input value each time addBtn is clicked
// Next: Display the task in quiz
// Next: send task to quadrant
// Next: give task directions
// Next: create task object
// Next: Quadrants screen - create an array of task objects
