import React from 'react';
import { TaskProvider } from './TaskContext';
import Taskboard from './Taskboard';


function App() {
  return (
    <TaskProvider>
      <div className="App">
        <Taskboard />
      </div>
    </TaskProvider>
  );
}

export default App;