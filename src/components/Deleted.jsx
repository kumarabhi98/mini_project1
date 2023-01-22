import React from 'react'
import useTaskStore from '../store/appStore'
import DeletedItems from './DeletedItems';
import Try from './Try'


const Deleted = () => {
  const deleted = useTaskStore((state) => state.deleted);

  return (
    <div className='Deleted-box'>
      <h1 
      // style={{marginTop: "5px", marginBottom: "20px"}}
      >Deleted Tasks</h1>
      {
         deleted.map((item,index)=>{
          return <DeletedItems key={item.taskId} task={item} index={index}/>
         })
      }
      {/* <Try/> */}
    </div>
  )
}

export default Deleted