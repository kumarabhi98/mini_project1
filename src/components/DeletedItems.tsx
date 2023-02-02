import React from 'react'
import { getDays, getHours } from '../utils/HelperFunctions';
import useTaskStore from '../store/appStore';
import '../App.css'
import { Task } from '../utils/Model';

interface props {
    task: Task;
    index: number;
}

const DeletedItems: React.FC<props> = ({ task, index }) => {
    const dark = useTaskStore((state) => state.dark);

    let dd:number = getDays(task.date);
    let hh:number = getHours(task.date); 

    return (
        <div className={`Deleted-items ${dark ?"Deleted-items-dark":""}`}>
            <span>Task : {`${index+1}`}</span>
            <span>{task.name_}</span>
            <span>{task.assignee}</span>
            <span>{task.status}</span>
            <span>{task.priority}</span>
            <span>{`${dd}days ${hh}h ago`}</span>
        </div>
    )
}

export default DeletedItems