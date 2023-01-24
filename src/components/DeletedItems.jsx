import React from 'react'
import { getDays, getHours } from '../utils/HelperFunctions';

const DeletedItems = ({ task, index }) => {
    let dd = getDays(task.date);
    let hh = getHours(task.date); 

    return (
        <div className='Deleted-items'>
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