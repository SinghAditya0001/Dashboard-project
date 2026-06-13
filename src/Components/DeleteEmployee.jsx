import React from "react";

function DeleteEmployee({
  employee,
  employees,
  setEmployees,
  onClose,
}) {
  if (!employee) return null;

  const handleDelete = () => {
    const updatedEmployees =
      employees.filter(
        (emp) => emp.id !== employee.id
      );

    setEmployees(updatedEmployees);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Delete Employee</h2>

        <p>
          Are you sure you want to delete
          {" "}
          <strong>
            {employee.firstName}
          </strong>
          ?
        </p>

        <button className="hy"onClick={handleDelete}>
          Yes Delete
        </button>

        <button onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  );
}

export default DeleteEmployee;