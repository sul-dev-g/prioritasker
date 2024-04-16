const submitTaskScreen = document.querySelector("#add-task-screen");
const submitQuizScreen = document.querySelector("#quiz-screen");
const confirmationScreen = document.querySelector("#confirmation-screen");
const taskListScreen = document.querySelector("#task-list-screen");
const input = document.querySelector("#input");
const submitTaskForm = document.querySelector("#submit-task-form");
const submitQuizForm = document.querySelector("#submit-quiz-form");
const quizTitle = document.querySelector(".quiz-title");
const taskList = document.querySelector("#task-list");
const addAnotherTaskBtn = document.querySelector(".add-another-task-btn");
const reviewTasksBtn = document.querySelector(".review-tasks-btn");
let task;
let db;

// Request to open database
const openRequest = window.indexedDB.open("prioritasker-db", 1);

// Error report
openRequest.addEventListener("error", () => {
  console.error(`Database failed to open`);
});

// Success
openRequest.addEventListener("success", () => {
  // Report success
  console.log("Database is open");

  // Database reference
  db = openRequest.result;

  // Display any tasks that already exist in the database
  updateDisplayOfTasks();
});

// Create database schema
openRequest.addEventListener("upgradeneeded", (e) => {
  // Database reference
  db = e.target.result;

  // Create an object store
  const objectStore = db.createObjectStore("prioritasker-os", {
    keyPath: "id",
    autoIncrement: true,
  });

  // Add 'contents' data point
  objectStore.createIndex("contents", "contents", { unique: false });

  // Add 'quadrant' data point
  objectStore.createIndex("quadrant", "quadrant", { unique: false });

  // Add 'completed' data point
  objectStore.createIndex("isComplete", "isComplete", { unique: false });

  // Report when schema has been setup
  console.log("Database setup complete");
});

// Object representing a task record
const taskRecordObject = {};

// Operations to execute on form submission
const submitTask = function (e) {
  // Prevent page refresh
  e.preventDefault();

  // Reference task
  task = input.value.trim();

  // Store task in quiz
  quizTitle.textContent = `${task}`;

  // Hide submitTaskScreen
  submitTaskScreen.classList.add("hidden");

  // Show submitQuizScreen
  submitQuizScreen.classList.remove("hidden");

  taskRecordObject.contents = `${task}`;
  taskRecordObject.isComplete = false;

  // Go to next screen
  window.location.href =
    "https://sul-devs.github.io/prioritasker/app/screens/answer-quiz.html";
};

submitTaskForm.addEventListener("submit", submitTask);

// Operations to execute on form submission
const submitQuiz = function (e) {
  // Prevent page refresh
  e.preventDefault();

  // Get task directions
  const computeTaskDirections = function () {
    const urgent = document.getElementById("urgent");
    const notUrgent = document.getElementById("not-urgent");
    const important = document.getElementById("important");
    const notImportant = document.getElementById("not-important");
    const urgentChecked = urgent.checked;
    const notUrgentChecked = notUrgent.checked;
    const importantChecked = important.checked;
    const notImportantChecked = notImportant.checked;
    if (urgentChecked && importantChecked) {
      return "Do Now";
    } else if (notUrgentChecked && importantChecked) {
      return "Schedule";
    } else if (urgentChecked && notImportantChecked) {
      return "Delegate";
    } else {
      return "Delete";
    }
  };

  // Fill in quadrant property
  taskRecordObject.quadrant = computeTaskDirections();

  // Add taskRecordObject object (above) to the database
  const addtaskRecordObjectToDatabase = function () {
    // Access objectStore
    const transaction = db.transaction(["prioritasker-os"], "readwrite");
    const objectStore = transaction.objectStore("prioritasker-os");

    // Add data to object store
    const addRequest = objectStore.add(taskRecordObject);

    // Clear input field if request is successful
    addRequest.addEventListener("success", () => {
      input.value = "";
    });

    // Report when transaction is complete
    transaction.addEventListener("complete", () => {
      console.log("Transaction completed: database modification finished.");
    });
  };
  addtaskRecordObjectToDatabase();
  updateDisplayOfTasks();

  // Hide submitQuizScreen
  submitQuizScreen.classList.add("hidden");

  // Show confirmationScreen
  confirmationScreen.classList.remove("hidden");
};
submitQuizForm.addEventListener("submit", submitQuiz);

// Delete a task
function deleteTask(e) {
  // Make tasks id compatible with IDB
  const taskId = Number(e.target.parentNode.getAttribute("task-id"));

  // Object store reference
  const transaction = db.transaction(["prioritasker-os"], "readwrite");
  const objectStore = transaction.objectStore("prioritasker-os");

  // Delete request
  const deleteRequest = objectStore.delete(taskId);

  // Delete task
  transaction.addEventListener("complete", () => {
    // Remove task
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

    // Report when task is deleted
    console.log(`Task ${taskId} has been deleted.`);

    // 0 tasks message
    if (!taskList.firstChild) {
      const li = document.createElement("li");
      li.textContent = "You have 0 tasks.";
      taskList.appendChild(li);
    }
  });
}

// Display new tasks
function updateDisplayOfTasks() {
  // Clear tasks
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Open a readwrite transaction to add data to database
  const objectStore = db
    .transaction("prioritasker-os")
    .objectStore("prioritasker-os");

  // Iterate records
  objectStore.openCursor().addEventListener("success", (event) => {
    // Cursor reference
    const cursor = event.target.result;

    // Turn records into dom elements
    if (cursor) {
      // Create task card
      const taskCard = document.createElement("li");
      taskCard.classList.add("task-card");

      const taskDirections = document.createElement("span");
      taskDirections.classList.add("task-directions");
      taskDirections.textContent = cursor.value.quadrant;

      // Colours quadrant tag in card
      switch (taskDirections.textContent) {
        case "Do Now":
          taskDirections.classList.add("do-now");
          break;
        case "Schedule":
          taskDirections.classList.add("schedule");
          break;
        case "Delegate":
          taskDirections.classList.add("delegate");
          break;
        case "Delete":
          taskDirections.classList.add("delete");
          break;
      }

      // Task text
      const taskText = document.createElement("p");
      taskText.classList.add("task-text");
      taskText.textContent = cursor.value.contents;

      // Delete task button
      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.classList.add("delete-task-btn", "btn");
      deleteTaskBtn.textContent = "Delete";

      // Edit task button
      const editTaskBtn = document.createElement("button");
      editTaskBtn.classList.add("edit-task-btn", "btn");
      editTaskBtn.textContent = "Edit";

      console.log(editTaskBtn);

      // Complete task button
      const completeTaskBtn = document.createElement("button");
      completeTaskBtn.classList.add("complete-task-btn", "btn");
      completeTaskBtn.textContent = "Complete";

      // Compose task card
      taskCard.append(
        taskText,
        taskDirections,
        editTaskBtn,
        completeTaskBtn,
        deleteTaskBtn
      );

      // Set taskCard ID
      taskCard.setAttribute("task-id", cursor.value.id);

      // Put task in list
      taskList.appendChild(taskCard);

      // Manage task buttons
      deleteTaskBtn.addEventListener("click", deleteTask);
      editTaskBtn.addEventListener("click", editTask);
      completeTaskBtn.addEventListener("click", completeTask);

      // Keep iterating through records
      cursor.continue();
    } else {
      // Message if user 0 tasks
      if (!taskList.firstChild) {
        const li = document.createElement("li");
        li.textContent = "You have 0 tasks.";
        taskList.appendChild(li);
      }
      // Report when tasks have been rendered
      console.log("All available tasks have been displayed");
    }
  });
}

// Go to review task list screen
reviewTasksBtn.addEventListener("click", () => {
  confirmationScreen.classList.add("hidden");
  taskListScreen.classList.remove("hidden");
});

// Add another task
addAnotherTaskBtn.addEventListener("click", () => {
  confirmationScreen.classList.add("hidden");
  submitTaskScreen.classList.remove("hidden");
});

// Edit task
function editTask(e) {}

// Complete task
function completeTask(e) {}
