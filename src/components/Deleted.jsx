import React from 'react'
import useTaskStore from '../store/appStore'
import DeletedItems from './DeletedItems';


const Deleted = () => {
  const deleted = useTaskStore((state) => state.deleted);

  return (
    <div className='Deleted-box'>
      <h1 
      >Deleted Tasks</h1>
      {
         deleted.map((item,index)=>{
          return <DeletedItems key={item.taskId} task={item} index={index}/>
         })
      }
    </div>
  )
}

export default Deleted