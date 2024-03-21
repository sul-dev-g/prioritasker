const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", openQuiz);

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

function createQuiz() {
  document.c;
}
