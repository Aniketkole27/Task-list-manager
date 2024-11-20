const input = document.querySelector("#putText");
const addButton = document.querySelector("#btn");
const list = document.querySelector(".list");

// Function to load tasks from local storage
window.addEventListener('load', () => {
    console.log("Page has fully loaded!");

    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Reload the task form local storage
    storedTasks.forEach(task => {
        createTaskItem(task);
    });
});

let editMode = false;
let removeMode = false;
input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') addTask();
});

addButton.addEventListener('click', () => {
    addTask();
});

let check = false;
let index = 1;
let dragItem;

// Function to add a task
// const addTask = () => {
//     const now = new Date();
//     const currentTime = now.toLocaleTimeString();
//     let space = "    ";
//     let addValue = input.value.trim() + space +  currentTime;

//     if (input.value.trim() !== "") {

//         createTaskItem(addValue);

//         // Save to local storage
//         saveTasksToLocalStorage();

//         input.value = "";
//     }
// };

const addTask = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();

    const spaces = "\u00A0".repeat(25);
    const  dash = "- ";
    let addValue = `${input.value.trim()}${spaces}${dash}${currentTime}`;
    // let addValue = input.value.trim();

    if (input.value.trim() !== "") {
        createTaskItem(addValue);

        // Save to local storage
        saveTasksToLocalStorage();

        input.value = "";
    }
};

// Function to create a task item
const createTaskItem = (taskText) => {
    let listItem = document.createElement("li");
    listItem.textContent = taskText;

    listItem.setAttribute("draggable", "true");
    listItem.setAttribute("id", index);
    index++;
    list.appendChild(listItem);

    check = true;

    // Event listeners for editing and removing
    listItem.addEventListener('dblclick', (e) => {
        if (removeMode) {
            let confirmDelete = confirm("Double tap to delete!");
            if (confirmDelete) {
                listItem.remove();
                saveTasksToLocalStorage(); 
                // check = false;
            }
        }
        removeMode = false;
        
        remove.style.backgroundColor = "";
    });

    listItem.addEventListener("click", () => {
        if (editMode) {
            const editText = prompt("Edit Text:", listItem.textContent);
            if (editText !== "" && editText !== null) {
                listItem.textContent = editText;
                saveTasksToLocalStorage(); 
                // check = false;
            }
            editMode = false;
            edit.style.backgroundColor = "";
        }
    });

    // Drag and drop
    listItem.addEventListener("dragstart", dragStart);
    listItem.addEventListener("dragend", (event) => {
        event.target.classList.remove('hide');
    });
};

// Save tasks to local storage
const saveTasksToLocalStorage = () => {
    const tasks = [];
    document.querySelectorAll(".list li").forEach(item => {
        tasks.push(item.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Drag and Drop Functionality
function dragStart() {
    dragItem = this;
}

list.addEventListener('dragover', (event) => {
    event.preventDefault();
});

list.addEventListener('drop', function(event) {
    event.preventDefault();
    let dropTarget = event.target;

    if (dropTarget && dropTarget.tagName === 'LI') {
        let nextDragSibling = dragItem.nextSibling;
        let nextDropSibling = dropTarget.nextSibling;

        list.insertBefore(dragItem, nextDropSibling);
        list.insertBefore(dropTarget, nextDragSibling);

        saveTasksToLocalStorage();
    }
});

// Edit and Remove Modes
const edit = document.querySelector("#edit");
edit.addEventListener("click", () => {
    if (check) {
        editMode = true;
        edit.style.backgroundColor = "lightgreen";
    }
});

const remove = document.querySelector("#delete");
remove.addEventListener("click", () => {
    if (check) {
        removeMode = true;
        remove.style.backgroundColor = "lightgreen";
    }
});
