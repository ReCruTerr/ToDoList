import { create } from "zustand";
import { generateId } from "./helper";


interface Task { 
    id:string,
    title:string,
    createdDate: number,

}

interface toDoStore { 
    tasks:Task[],
    createTask:(title:string) => void,
    updateTask:(title:string, id:string) => void,
    removeTask:(id:string) => void
}

export const useToDoStore = create<toDoStore>((set, get) => ({ 
    tasks:[
        // {
        //     id:'dsdad',
        //     title:'base task',
        //     createdDate: 2342424,
        // }
    ],
     createTask:(title)=> {
        const { tasks } = get();
        const newTask = {
            id:generateId(),
            title,
            createdDate:Date.now(),
        }
        
        set({ 
            tasks:[newTask].concat(tasks),

        })
        
     },
     updateTask:(title, id)=> {
        const { tasks } = get();
        set({ 
            tasks:tasks.map((task)=> ({ 
                ...task,
                title: task.id == id ? title : task.title,
            }))
        })
    },
    removeTask:(id)=> {
        const { tasks } = get();
        set({ 
            tasks:tasks.filter((task)=> task.id !== id)
        })
    },

}))