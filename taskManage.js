const input = document.querySelector("#putText");
const addButton = document.querySelector("#btn");
const list = document.querySelectorAll(".list");
let editMode = false;
input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter')
        addTask();
})
addButton.addEventListener('click', () => {
    addTask();
})

let check = false;
let dragElement = null;
let index = 1;

const addTask = () => {
    let addValue = input.value;
    if (addValue !== "") {

        let listItem = document.createElement("li");
        listItem.textContent = addValue;
        listItem.setAttribute("draggable", "true");
        listItem.setAttribute("id", index)
        index++;
        list.forEach(list=>{
            list.appendChild(listItem);
        })
        console.log(listItem);

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
        let close;

        
        function dragStart() {
            close = +this.closest('li').getAttribute('id')
            console.log("start = ", close);
            console.log(document.getElementById(close))
            // this.dataTransfer.setData("text/plain", close);
            
        }
        // console.log(draggedElement1)
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

list.forEach(item=>{
    item.addEventListener('dragover',(e)=>{
        e.preventDefault();
    });
    item.addEventListener('drop',drop);
});

function drop(){
    console.log("element is dropped");
   let id = +this.getAttribute('id');
   console.log(id);
}


// list.addEventListener('dragover',(event) =>{
//     event.preventDefault();
// })

// let end;
// function drop(event) {
//     event.preventDefault();
//     end = +this.getAttribute('id');
//     console.log("drop on = ", end);
// }

// list.addEventListener("drop", drop);


// function leave.forEach(item=>{

// })
// list.addEventListener("dropleave",leave);



