import React from "react";

function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Employee Details</h2>

        <p>
          <strong>ID:</strong> {employee.id}
        </p>

        <p>
          <strong>Name:</strong> {employee.firstName} {employee.lastName}
        </p>

        <p>
          <strong>Email:</strong> {employee.email}
        </p>

        <p>
          <strong>Age:</strong> {employee.age}
        </p>

        <p>
          <strong>Gender:</strong> {employee.gender}
        </p>

        <p>
          <strong>Department:</strong> {employee.company.department}
        </p>

        <button onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default EmployeeModal;