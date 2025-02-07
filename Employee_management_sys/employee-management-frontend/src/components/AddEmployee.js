import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

const AddEmployee = ({ fetchEmployees }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    salary: '',
    department: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/employees', employee);
      fetchEmployees(); // Refresh the employee list
      setEmployee({ firstName: '', lastName: '', salary: '', department: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input
        type="text"
        placeholder="First Name"
        value={employee.firstName}
        onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={employee.lastName}
        onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={employee.salary}
        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={employee.department}
        onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;