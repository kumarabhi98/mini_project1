import './App.css';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard'
import { Route, Routes } from 'react-router-dom';
import Deleted from './components/Deleted';
import { DragDropContext } from 'react-beautiful-dnd';
import useTaskStore from './store/appStore';
import Darkmode from './components/Darkmode';

function App() {
  const {updateStatus,dark} = useTaskStore((state) => ({
    updateStatus: state.updateStatus,
    dark: state.dark
  }));
  const onDragEnd = (result) => {
    const destination = result.destination;
    const source = result.source;
    const draggableId = parseInt(result.draggableId);
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
    updateStatus(draggableId,destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{dminWidthwidth:"100vw", minHeightheight:"100vh" , backgroundColor: dark?"rgb(31, 52, 77)":"aliceblue"}}>
        <Header />
        <Routes>
          <Route path='/' element={<TaskBoard />} />
          <Route path='/deleted' element={<Deleted />} />
        </Routes>
        <Darkmode/>
      </div>
    </DragDropContext>
  );
}

export default App;
