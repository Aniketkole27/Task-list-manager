const input = document.querySelector("#putText");
const addButton = document.querySelector("#btn");
const list = document.querySelector(".list");
let editMode = false;
input.addEventListener("keydown", (event) => {
    if (event.key === 'Enter')
        addTask();
})
addButton.addEventListener('click', () => {
    addTask();
})

let check = false;
console.log(check)
const addTask = () => {
    let addValue = input.value;
    if (addValue !== "") {
        let listItem = document.createElement("li");
        listItem.classList.add("select");
        setTimeout(()=>{
            listItem.attributes("dragable=true");
        },2000);
        listItem.textContent = addValue;
        list.appendChild(listItem);

        // listItem.addEventListener("dbkclick",() =>{
        //     list.removeChild(listItem);
        // })
        // list.appendChild(listItem);

        listItem.addEventListener("click", (e) => {
            if (editMode) {
                const editText = prompt("Edit Text : ");
                if (editText !== "" && editText !== null) {
                    listItem.textContent = editText;
                    // list.appendChild(listItem);
                    // console.log("Triggred")
                }
                editMode = false;
                edit.style.backgroundColor = "";
            }
        });
    
        check = true;
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
