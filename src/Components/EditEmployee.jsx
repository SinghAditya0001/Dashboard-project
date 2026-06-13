import React, { useState, useEffect } from "react";

function EditEmployee({
  employee,
  employees,
  setEmployees,
  onClose,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    age: "",
    gender: "",
    department: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        email: employee.email,
        age: employee.age,
        gender: employee.gender,
        department: employee.company.department,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedEmployees = employees.map(
      (emp) =>
        emp.id === employee.id
          ? {
              ...emp,
              firstName: formData.firstName,
              email: formData.email,
              age: Number(formData.age),
              gender: formData.gender,
              company: {
                ...emp.company,
                department: formData.department,
              },
            }
          : emp
    );

    setEmployees(updatedEmployees);
    onClose();
  };

  if (!employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Employee</h2>

        <form onSubmit={handleUpdate}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <button type="submit">
            Update
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditEmployee;