const setState = (key:string, data:any):void => {
    if (typeof data == "string") {
        localStorage.setItem(key, data)
    } else {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

const getState = (key: string):any => {
    let isValid = localStorage.getItem(key)
    if(isValid){
        try{
            const result = JSON.parse(isValid)
            return result
        } 
        catch(err){
            return isValid
        }
    }
};

let elForm: HTMLFormElement | null = document.querySelector(".todo-form")
let elInput: HTMLInputElement | null = document.querySelector(".todo-input")
let elList: HTMLUListElement | null = document.querySelector(".todo-list")
let elModal: HTMLElement | null = document.querySelector("#update-modal")
let elUpdateInput: HTMLInputElement | null = document.querySelector("#update-input")
let elSaveUpdate: HTMLElement | null = document.querySelector("#save-update")
let elCloseModal: HTMLElement | null = document.querySelector("#close-modal")

interface TodoType {
    value:string
}

let todos: Array<TodoType> = getState("todos") || []

elForm?.addEventListener("submit", function (e: Event) {
    e.preventDefault()
    if (elInput){
        const data: TodoType = {
            value: elInput.value
        }
        todos.push(data)
        renderTodos(todos, elList)
        elInput.value = ""
        setState("todos", todos)
    }
});

function renderTodos(arr:TodoType[], list:HTMLUListElement | null):void {
    if(list){
        list.innerHTML = ""
        arr.forEach((item: TodoType, index: number) => {
            let elItem: HTMLLIElement = document.createElement("li")
            elItem.className = "flex items-center justify-between rounded-md bg-white p-4"
            elItem.innerHTML = `
                <div>
                    <span class="text-[20px]">${index + 1}</span>
                    <strong class="text-[22px]">${item.value}</strong>
                </div>
                <div class="space-x-[5px]">
                    <button onclick="handleUpdate(${index}) type="button" class="bg-blue-500 text-white p-2 rounded-md text-center font-semibold p-[9px]>Update</button>
                    <button onclick="handleDelete(${index})" type="button" class="bg-red-500 text-white p-2 rounded-md text-center font-semibold p-[9px]">Delete</button>
                </div>
            `
            list.appendChild(elItem)
        })
    }
}

renderTodos(todos, elList)

function handleDelete(id:number):void {
    todos.splice(id, 1)
    renderTodos(todos, elList)
    setState("todos", todos)
}

function handleUpdate(index:number):void {
    if(elUpdateInput){
        elUpdateInput.value = todos[index].value
    }
    if(elModal){
        elModal.classList.remove("hidden")
    }
    elSaveUpdate?.addEventListener("click", () => {
        const newTodoValue = elUpdateInput?.value.trim()
        if (newTodoValue && newTodoValue != todos[index].value){
            todos[index].value = newTodoValue
            renderTodos(todos, elList)
            setState("todos", todos)
            closeModal()
        }
    })
    elCloseModal?.addEventListener("click", closeModal)
}

function closeModal():void {
    if(elModal){
        elModal.classList.add("hidden")
    }
}
