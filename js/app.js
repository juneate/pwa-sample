// For the PWA Application, register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'Service Worker registration failed')
  );
}


// Where can we go?
const routes = {
  '/home': homePage,   // change this to /home to prevent refresh
  '/todolist': todoListPage,
  '/credits': creditPage
  // REGISTER NEW URL:VIEWS HERE
};


// Temporary data, replace with cached data:
// https://developers.google.com/web/ilt/pwa/live-data-in-the-service-worker
// https://github.com/jakearchibald/idb (https://www.npmjs.com/package/idb)
var tasks = [
  {name:"Feed the dog", complete:0},
  {name:"Cut the grass", complete:0}
];
// Improvements: Tasks should be an Object


// Functions for each chunk of repeating data
function createTask(task) {
  return `<li class="task">${task.name}</li>`;
}



// DATA UPDATER:
// Fires every time a page changes
document.getElementById('page').addEventListener('page', function (e) {

  // If the current page is the todoListPage, grab the data for it
  // This needs some improvement
  if (currPage == '/todolist') {
    // Find the main task list
    var taskList = document.getElementById('taskList');
    // For each task, call createTask and join them all together with a linebreak between
    taskList.innerHTML = tasks.map(createTask).join('\n');

    // Now setup the click listener on the button to add a new task
    document.getElementById('addtask').addEventListener('click', function() {
      // Create a new task based on the user's input value (this is ugly)
      var newTask = {name:document.getElementById('newtask').value, complete:0};
      // Add to our "dataset"
      tasks.push(newTask);
      // createTask creates a new task
      taskList.innerHTML += createTask(newTask);

      // Could also trigger a refresh when the task data is changed (then task data should be a class!!)
    });
  }

}, false);
