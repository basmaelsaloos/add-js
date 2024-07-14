let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Array to store the tasks
let arrayOfTasks = [];

//check theres tasks in localStorage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//Trigger get data from localStorage
getDataFromLocalStorage();

//add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //add task to array of tasks
    input.value = ""; //Empty input value
  }
};

//Click on task element
tasksDiv.addEventListener("click", (e) => {
  //delete buttons
  if (e.target.classList.contains("del")) {
    //remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    //remove element from page
    e.target.parentElement.remove();
  }
});

function addTaskToArray(taskText) {
  //Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push task  to array of tasks
  arrayOfTasks.push(task);
  // add tasks to page
  addElementsTasksToPage(arrayOfTasks);
  // add tasks to localStorage
  addDtaToLocalStorageFrom(arrayOfTasks);
}

function addElementsTasksToPage(arrayOfTasks) {
  //Empty div tasks
  tasksDiv.innerHTML = "";
  //looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.className = "task";

    //check if task  is done
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create button delete
    let span = document.createElement("span");
    span.className = "del";
    //append Button to main div
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    //add task to tasks container
    tasksDiv.appendChild(div);
  });
}

function addDtaToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");

  if (data) {
    let tasks = JSON.parse(data);
    addElementsTasksToPage(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDtaToLocalStorageFrom(arrayOfTasks);
}
