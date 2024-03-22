const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", openQuiz);

function createTaskObject() {
  const taskObject = {
    id,
    taskContents: `${inputtedTask}`,
    taskDirections: `${h}`,
    dateCreated,
  };
}

// Tells the user what they should do with their task
function getTaskDirections() {
  const urgentChecked = document.getElementById("urgent").checked;
  const notUrgentChecked = document.getElementById("not-urgent").checked;
  const importantChecked = document.getElementById("important").checked;
  const notImportantChecked = document.getElementById("not-important").checked;

  if (urgentChecked && importantChecked) {
    return "Do Now!";
  } else if (notUrgentChecked & importantChecked) {
    return "Schedule";
  } else if (urgentChecked && notImportantChecked) {
    return "Delegate";
  } else {
    return "Delete";
  }
}

const doneBtn = document.querySelector(".done-btn");
doneBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(getTaskDirections());
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputField();
});

function openQuiz() {
  // Store inputted task
  const input = document.getElementById("input");
  const inputtedTask = input.value.trim();

  const quiz = document.querySelector("#quiz");
  quiz.classList.remove("hidden");
  const taskContents = document.querySelector(".task-contents");
  taskContents.textContent = `${inputtedTask}`;
}

function clearInputField() {
  input.value = "";
}

function createQuiz() {}
