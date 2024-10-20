const input = document.querySelector("#putText");
const addButton = document.querySelector("#btn");
const list = document.querySelector(".list");

let editMode = false;
let removeMode = false;
input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter')
        addTask();
})
addButton.addEventListener('click', () => {
    addTask();
})

let check = false;
// let dragElement = null;
let index = 1;
let dragItem;
const addTask = () => {
    let addValue = input.value;
    if (addValue !== "") {

        let listItem = document.createElement("li");
        listItem.textContent = addValue;
        listItem.setAttribute("draggable", "true");
        listItem.setAttribute("id", index)
        index++;
        list.appendChild(listItem);
        console.log(listItem);

        // Removeing added Text
        listItem.addEventListener('dblclick',(e)=>{  
            if(removeMode){
                let value = confirm("Double tap to delele !");
                const item = e.target;
                if(value !== false){
                    item.remove();
                }
            }
            removeMode = false;
            remove.style.backgroundColor = "";
        })

        // Editing added text
        listItem.addEventListener("click", (e) => {
            if (editMode) {
                const editText = prompt("Edit Text : ");
                if (editText !== "" && editText !== null) {
                    listItem.textContent = editText;
                    // console.log("Triggred")
                }
                editMode = false;
                edit.style.backgroundColor = "";
            }
        });
        check = true;

        function dragStart() {
            let close;
            close = +this.closest('li').getAttribute('id')
            dragItem = document.getElementById(close);
        }

        listItem.addEventListener("dragstart", dragStart);
        listItem.addEventListener("dragend", (event) => {
            event.target.classList.remove('hide');
        });
    }
    input.value = "";

};

const edit = document.querySelector("#edit");
edit.addEventListener("click", () => {
    if (check) {
        editMode = true;
        edit.style.backgroundColor = "lightgreen";
    }
})

const remove = document.querySelector("#delete");
remove.addEventListener("click", () => {
    if (check) {
        removeMode = true;
        remove.style.backgroundColor = "lightgreen";
    }
})

// Drag and Drop Functionality
list.addEventListener('dragover',(event)=>{
    event.preventDefault();
});

list.addEventListener('drop', function(event) {
    event.preventDefault();
    // const draggedElement = document.querySelector('.draggable');
    console.log(dragItem);
    let dropTarget = event.target;
    console.log(dropTarget);

    if(dragItem == dropTarget){
        let temp;
        temp = dropTarget;
        dropTarget = dragItem;
        dragItem = temp;
    }

    let nextDragSibling = dragItem.nextSibling;
    let nextDropSibling = dropTarget.nextSibling;
    
    list.insertBefore(dragItem,   nextDropSibling);
    list.insertBefore(dropTarget, nextDragSibling);

});