import { useContext } from "react";
import { DoingContext } from "./Taskboard";
import TaskCard from "./TaskCard";

const InProgress = () => {
  const {handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask} = useContext(DoingContext);

  return (
    <div className="column"
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, 'Pågående')}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, 'Pågående')}
    >
      <h3>Pågående</h3>
      {tasks.filter(task => task.status === 'Pågående').map(task => (
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

export default InProgress
