import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import './App.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const fetchEmployees = () => {
    setRefresh(!refresh); // Toggle refresh to re-fetch employees
  };

  return (
    <div className="app-container">
      <h1>Employee Management System</h1>
      <AddEmployee fetchEmployees={fetchEmployees} />
      <EmployeeList refresh={refresh} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default App;