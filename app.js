// Acssesiing Input, List Items and Add Button
let inputBox = document.getElementById("input-box");
let listItem = document.getElementById("list-items");
let btn = document.getElementById("btn");
let myDiv = document.getElementById("my-div");
let itemNo = 1;

window.onload = () => {
  if (localStorage.getItem(`item ${itemNo}`) != null) {
    for (let i = 0; i <= itemNo; i++) {
      inputBox.value = localStorage.getItem(`item ${i}`);
      btn.click();
    }
    responsiveCheck();
  }
};
// Adding a Event to Add Button If it Clicked It Should Add The Input to List Item
btn.addEventListener("click", () => {
  if (inputBox.value != "") {
    // Creating New List Item
    let newLi = document.createElement("li");
    newLi.classList.add(
      "py-3",
      "px-5",
      "font-bold",
      "text-slate-100",
      "text-xl",
      "border-2",
      "flex",
      "rounded-lg",
      "justify-between"
    );
    // Creating New Checkbox
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("w-[20px]");

    // Creating New Div El
    let div = document.createElement("div");
    div.innerHTML = inputBox.value;
    div.classList.add("flex", "items-center", "divs");

    // A Container For Checkbox and List Item
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("flex", "gap-2");
    containerDiv.appendChild(checkBox);
    containerDiv.appendChild(div);
    newLi.appendChild(containerDiv);

    // Creating a Button to delete Tasks
    let newBtn = document.createElement("button");
    newBtn.innerHTML = "Delete";
    newBtn.classList.add(
      "border",
      "px-5",
      "py-2",
      "rounded-lg",
      "text-white",
      "font-medium",
      "bg-blue-950",
      "hover:bg-indigo-100",
      "hover:text-black",
      "hover:border-black"
    );

    newLi.appendChild(newBtn);
    listItem.appendChild(newLi);
    responsiveCheck();
    // Adding Functionality to Delete Btn
    newBtn.addEventListener("click", () => {
      listItem.removeChild(newLi);
      updateLocalStorage();
      responsiveCheck();
    });

    // For Line Trough Effect
    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        div.classList.add("line-through", "decoration-black", "decoration-4");
      } else {
        div.classList.remove("line-through");
      }
    });
    // Local Storage Setup
    localStorage.setItem(`item ${itemNo}`, inputBox.value);
    itemNo++;
    // Calling Reset Function
    resetInputField();
  }
});

function updateLocalStorage() {
  itemNo = 1;
  localStorage.clear();
  let divs = document.querySelectorAll(".divs");
  divs.forEach((div) => {
    localStorage.setItem(`item ${itemNo}`, div.innerHTML);
    itemNo++;
  });
}
// Resetting The Input Field
function resetInputField() {
  inputBox.value = "";
}

// Trigger a New Task Adding Using Enter Key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    btn.click();
  }
});

// Responsiveness
function responsiveCheck() {
  let ms = document.getElementById("ms");
  if (ms.offsetHeight > window.innerHeight) {
    myDiv.classList.remove("h-screen");
    myDiv.classList.add("h-full");
  } else {
    myDiv.classList.remove("h-full");
    myDiv.classList.add("h-screen");
  }
}
