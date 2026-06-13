import React from "react";

function DashboardStats({ employees }) {

  const totalEmployees = employees.length;

  const maleEmployees = employees.filter(
    (emp) => emp.gender === "male"
  ).length;

  const femaleEmployees = employees.filter(
    (emp) => emp.gender === "female"
  ).length;

  const averageAge =
    employees.length > 0
      ? (
          employees.reduce(
            (sum, emp) => sum + emp.age,
            0
          ) / employees.length
        ).toFixed(1)
      : 0;

  const totalDepartments = new Set(
    employees.map(
      (emp) => emp.company.department
    )
  ).size;

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>Total Employees</h3>
        <p>{totalEmployees}</p>
      </div>

      <div className="stat-card">
        <h3>Male Employees</h3>
        <p>{maleEmployees}</p>
      </div>

      <div className="stat-card">
        <h3>Female Employees</h3>
        <p>{femaleEmployees}</p>
      </div>

      <div className="stat-card">
        <h3>Average Age</h3>
        <p>{averageAge}</p>
      </div>

      <div className="stat-card">
        <h3>Total Departments</h3>
        <p>{totalDepartments}</p>
      </div>

    </div>
  );
}

export default DashboardStats;