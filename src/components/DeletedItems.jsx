import React from 'react'
import { getDays, getHours } from '../utils/HelperFunctions';
import useTaskStore from '../store/appStore';
import '../App.css'

const DeletedItems = ({ task, index }) => {
    const dark = useTaskStore((state) => state.dark);

    let dd = getDays(task.date);
    let hh = getHours(task.date); 

    return (
        <div className={`Deleted-items ${dark ?"Deleted-items-dark":""}`}>
            <span>{index+1}</span>
            <span>{task.name_}</span>
            <span>{task.assignee}</span>
            <span>{task.status}</span>
            <span>{task.priority}</span>
            <span>{`${dd}days ${hh}h ago`}</span>
        </div>
    )
}

export default DeletedItems