import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { createContext } from 'react';
import Doing from './Doing';
import InProgress from './InProgress';
import Done from './Done';

export const DoingContext = createContext();

const TaskBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, targetStatus) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightgray'; 
  };

  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = ''; 
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('taskId');

    const updatedTasks = tasks.map(task => {
      if (task.id === parseInt(draggedTaskId)) {
        return { ...task, status: targetStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
    e.target.style.backgroundColor = ''; 
  };

  const addTask = (taskName) => {
    const newTask = { id: tasks.length + 1, name: taskName, status: 'Att göra' };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const TaskColumns = () => {
    return (
      <div className="task-board">
        <DoingContext.Provider value={{handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask}}>
          <Doing />
          <InProgress />
          <Done />
        </DoingContext.Provider>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <header>
          <h1>The Board App</h1>
          <nav>
            <NavLink to='/'>
              <p>Visa Allt</p>
            </NavLink>
            <NavLink to='/doing'>
              <p>attGora</p>
            </NavLink>
            <NavLink to='/inProgress'>
              <p>pogoende</p>
            </NavLink>
            <NavLink to='/done'>
              <p>klart</p>
            </NavLink>
          </nav>
        </header>
        <TaskForm onAddTask={addTask} />
        <Routes>
          <Route path='/doing' element={
            <DoingContext.Provider value={{handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask}}>
            <Doing />
            </DoingContext.Provider>
          } />
          <Route path='/inProgress' element={
            <DoingContext.Provider value={{handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask}}>
            <InProgress />
          </DoingContext.Provider>
          } />
          <Route path='/done' element={
          <DoingContext.Provider value={{handleDragOver, handleDragEnter, handleDragLeave, handleDrop, tasks, handleDragStart, deleteTask}}>
          <Done />
          </DoingContext.Provider>
          } />
          <Route path='/' element={<TaskColumns />} />
        </Routes>
      </div>
    </Router>
  );
};

export default TaskBoard;


