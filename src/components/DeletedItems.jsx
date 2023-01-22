import React from 'react'

const DeletedItems = ({ task, index }) => {
    const newDate = new Date();
    const date = parseInt(task.date);
    let diff = newDate.getTime() - date;
    let dd = Math.floor(diff/1000/60/60/24);
    let hh = diff - dd*1000*60*60*24; 
    hh = Math.floor(hh/1000/60/60);
    // console.log(new date());

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