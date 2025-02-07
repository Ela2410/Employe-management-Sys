import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditEmployee from './EditEmployee';
import './EmployeeList.css';

const EmployeeList = ({ refresh, fetchEmployees }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  // Fetch employees when the component mounts or refresh changes
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    getEmployees();
  }, [refresh]);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/employees/${id}`);
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (id) => {
    setEditEmployeeId(id);
  };

  const handleUpdate = () => {
    setEditEmployeeId(null);
    fetchEmployees(); // Refresh the employee list after update
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              {editEmployeeId === employee.id ? (
                <td colSpan="5">
                  <EditEmployee
                    employee={employee}
                    onUpdate={handleUpdate}
                  />
                </td>
              ) : (
                <>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button onClick={() => handleEdit(employee.id)}>Edit</button>
                    <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;