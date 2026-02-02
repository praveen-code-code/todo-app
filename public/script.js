const API = "http://localhost:3000";

// CREATE TASK
async function createTask() {
  const task = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    dueDate: dueDate.value || null,
    completed: false
  };

  await fetch(`${API}/create_task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  resetForm();
  loadTasks();
}

// LOAD TASKS
async function loadTasks() {
  const res = await fetch(`${API}/get_all_tasks`);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    const due = task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "No due date";

    const editDate = task.dueDate
      ? new Date(task.dueDate).toISOString().slice(0, 10)
      : "";

    div.innerHTML = `
      <h3 class="${task.completed ? 'completed' : ''}">${task.title}</h3>
      <p>${task.description || ''}</p>
      <p>Priority: ${task.priority}</p>
      <p>Due: ${due}</p>

      <button onclick='editTask(
        "${task._id}",
        ${JSON.stringify(task.title)},
        ${JSON.stringify(task.description)},
        "${task.priority}",
        "${editDate}"
      )'>Edit</button>

      <button onclick="toggleStatus('${task._id}', ${task.completed})">Toggle Status</button>
      <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
    `;

    taskList.appendChild(div);
  });
}

// EDIT TASK
async function editTask(id, titleVal, descVal, priorityVal, dueDateVal) {
  title.value = titleVal || "";
  description.value = descVal || "";
  priority.value = priorityVal || "Low";
  dueDate.value = dueDateVal || "";

  const btn = document.querySelector('.form button');
  btn.innerText = 'Update Task';

  btn.onclick = async () => {
    await fetch(`${API}/edit_task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        priority: priority.value,
        dueDate: dueDate.value || null
      })
    });

    resetForm();
    btn.innerText = 'Add Task';
    btn.onclick = createTask;
    loadTasks();
  };
}

// TOGGLE STATUS
async function toggleStatus(id, current) {
  await fetch(`${API}/update_stutas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !current })
  });

  loadTasks();
}

// DELETE TASK
async function deleteTask(id) {
  await fetch(`${API}/delete_task/${id}`, { method: "DELETE" });
  loadTasks();
}

// RESET FORM
function resetForm() {
  title.value = "";
  description.value = "";
  priority.value = "Low";
  dueDate.value = "";
}

loadTasks();