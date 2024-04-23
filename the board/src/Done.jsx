import { useContext } from "react";
import { DoingContext } from "./Taskboard";
import TaskCard from "./TaskCard";

const Done = () => {
  const {handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask} = useContext(DoingContext);

  return (
    <div className="column"
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, 'Klart')}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, 'Klart')}
    >
      <h3>Klart</h3>
      {tasks.filter(task => task.status === 'Klart').map(task => (
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

export default Done;