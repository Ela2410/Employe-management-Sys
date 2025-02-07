import React, { useState } from 'react';
import axios from 'axios';
import './EditEmployee.css';

const EditEmployee = ({ employee, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    salary: employee.salary,
    department: employee.department,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/employees/${employee.id}`, formData);
      onUpdate(); // Notify parent to refresh the employee list
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form className="edit-employee-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        required
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onUpdate}>Cancel</button>
    </form>
  );
};

export default EditEmployee;