import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const taskStore = (set) => ({
    tasks: [],
    deleted: [],
    filterTask: "",
    filterAssignee: "",

    setFilterTask: (value) => {
        set((state) => ({
            filterTask: value,
        }))
    },

    setFilterAssignee: (value) => {
        set((state) => ({
            filterAssignee: value,
        }))
    },

    addTask: (task) => {
        set((state) => ({
            tasks: [...state.tasks, task],
        }))
    },

    removeTask: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((c) => {
                if (c.taskId !== taskId) return true;
                else {
                    state.deleted.push(c);
                    return false;
                }
            })
        }))
    },

    updateTask: (taskId, newName, newPriority, newStatus, newAssignee, newDays) => {
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.taskId === taskId) {
                    return {
                        taskId: taskId,
                        name_: newName,
                        priority: newPriority,
                        assignee: newAssignee,
                        story_points: newDays,
                        status: newStatus,
                        date: task.date
                    }
                }
                else return task;
            })
        }))
    },

    updateStatus: (taskId,newStatus) => {
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.taskId === taskId) {
                    return {
                        taskId: task.taskId,
                        name_: task.name_,
                        priority: task.priority,
                        assignee: task.assignee,
                        story_points: task.story_points,
                        status: newStatus,
                        date: task.date
                    }
                }
                else return task;
            })
        }))
    }
})

const useTaskStore = create(
    devtools(
        persist(taskStore, {
            name: "Todo-List",
        })
    )
)

export default useTaskStore;
