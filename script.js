document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      const taskText = li.firstChild.textContent.trim();
      tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks(); // Update local storage after removal
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    createTaskElement(taskText);
    saveTasks(); // Save after adding
    taskInput.value = '';
  }

  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks(); // Load saved tasks on page load
});