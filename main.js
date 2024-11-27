"use strict";
const setState = (key, data) => {
    if (typeof data == "string") {
        localStorage.setItem(key, data);
    }
    else {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        try {
            const result = JSON.parse(isValid);
            return result;
        }
        catch (err) {
            return isValid;
        }
    }
};
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
let elModal = document.querySelector("#update-modal");
let elUpdateInput = document.querySelector("#update-input");
let elSaveUpdate = document.querySelector("#save-update");
let elCloseModal = document.querySelector("#close-modal");
let todos = getState("todos") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (elInput) {
        const data = {
            value: elInput.value
        };
        todos.push(data);
        renderTodos(todos, elList);
        elInput.value = "";
        setState("todos", todos);
    }
});
function renderTodos(arr, list) {
    if (list) {
        list.innerHTML = "";
        arr.forEach((item, index) => {
            let elItem = document.createElement("li");
            elItem.className = "flex items-center justify-between rounded-md bg-white p-4";
            elItem.innerHTML = `
                <div>
                    <span class="text-[20px]">${index + 1}</span>
                    <strong class="text-[22px]">${item.value}</strong>
                </div>
                <div class="space-x-[5px]">
                    <button onclick="handleUpdate(${index}) type="button" class="bg-blue-500 text-white p-2 rounded-md text-center font-semibold p-[9px]>Update</button>
                    <button onclick="handleDelete(${index})" type="button" class="bg-red-500 text-white p-2 rounded-md text-center font-semibold p-[9px]">Delete</button>
                </div>
            `;
            list.appendChild(elItem);
        });
    }
}
renderTodos(todos, elList);
function handleDelete(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
function handleUpdate(index) {
    if (elUpdateInput) {
        elUpdateInput.value = todos[index].value;
    }
    if (elModal) {
        elModal.classList.remove("hidden");
    }
    elSaveUpdate === null || elSaveUpdate === void 0 ? void 0 : elSaveUpdate.addEventListener("click", () => {
        const newTodoValue = elUpdateInput === null || elUpdateInput === void 0 ? void 0 : elUpdateInput.value.trim();
        if (newTodoValue && newTodoValue != todos[index].value) {
            todos[index].value = newTodoValue;
            renderTodos(todos, elList);
            setState("todos", todos);
            closeModal();
        }
    });
    elCloseModal === null || elCloseModal === void 0 ? void 0 : elCloseModal.addEventListener("click", closeModal);
}
function closeModal() {
    if (elModal) {
        elModal.classList.add("hidden");
    }
}
