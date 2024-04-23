import { useContext } from "react";
import { DoingContext } from "./Taskboard";
import TaskCard from "./TaskCard";

const Doing = () => {
  const {handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask} = useContext(DoingContext);

  return (
    <div className="column"
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, 'Att göra')}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, 'Att göra')}
    >
      <h3>Att göra</h3>
      {tasks.filter(task => task.status === 'Att göra').map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={handleDragStart}
          onDelete={deleteTask} 
        />
      ))}
    </div>
  )
}

export default Doing;