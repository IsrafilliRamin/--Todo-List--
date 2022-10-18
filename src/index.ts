import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
}


const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector("#form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#input")



let tasks: Task[] = loadTask()
tasks.forEach(addListItem)








form?.addEventListener("submit", (e) => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTask()
  addListItem(newTask)

  input.value = ""
})

function addListItem(task: Task) {

  const item = document.createElement("li");
  const label = document.createElement("label");
  const checbox = document.createElement("input");
  let deleted = document.createElement("i")
  deleted.classList.add("fa-solid")
  deleted.classList.add("fa-trash")

  checbox.addEventListener("change", () => {
    task.completed = checbox.checked;
    saveTask()
  })

  deleted.addEventListener("click",()=>{
    
    
       
        let filter = tasks.filter(item=>item.id !==task.id)
        item.remove() 
        tasks = filter
        localStorage.setItem("TASKS", JSON.stringify(filter))
        console.log(filter,"filter");
        console.log(tasks,"tasks");
        console.log(task);
        
     
  })
  checbox.type = "checkbox";
  checbox.checked = task.completed;
  console.log(tasks,"AUE");
  label.append(checbox, task.title , deleted)
  item.append(label)
  list?.append(item)
}



function saveTask() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}