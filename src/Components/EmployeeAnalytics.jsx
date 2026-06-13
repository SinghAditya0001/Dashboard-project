import React from "react";

function EmployeeAnalytics({ employees }) {

    if (!employees || employees.length === 0) {
    return null;
  }

    // 1. Highest Age Employee
  const highestAgeEmployee = employees.reduce(
    (oldest, emp) =>
      emp.age > oldest.age ? emp : oldest,
    employees[0]
  );

  // 2. Group Employees By Department
  const groupedEmployees = employees.reduce(
    (acc, emp) => {
      const dept =
           emp.company?.department || "Unknown";

      if (!acc[dept]) {
        acc[dept] = [];
      }

      acc[dept].push(emp);

      return acc;
    },
    {}
  );

  // 3. Average Age Department Wise
  const averageAgeDepartmentWise =
    Object.entries(groupedEmployees).map(
      ([dept, empList]) => ({
        department: dept,
        averageAge: (
          empList.reduce(
            (sum, emp) => sum + emp.age,
            0
          ) / empList.length
        ).toFixed(1),
      })
    );

  // 4. Remove Duplicate Employees By Email
  const uniqueEmployees = [
    ...new Map(
      employees.map((emp) => [
        emp.email,
        emp,
      ])
    ).values(),
  ];

  // 5. Top 5 Oldest Employees
  const top5OldestEmployees =
    [...employees]
      .sort((a, b) => b.age - a.age)
      .slice(0, 5);

  return (
    <div className="analytics-section">

      <h2>Employee Analytics</h2>

      {/* 1 */}
      <div className="analytics-card">
        <h3>
          1. Employee With Highest Age
        </h3>

        <p>
           {highestAgeEmployee?.firstName}
           {" "}
             -
           {" "}
           {highestAgeEmployee?.age}
            Years
        </p>
      </div>

      {/* 2 */}
      <div className="analytics-card">
        <h3>
          2. Employees Grouped By Department
        </h3>

        {Object.entries(groupedEmployees)
          .map(([dept, empList]) => (
            <p key={dept}>
              <strong>{dept}</strong>
              {" "}
              :
              {" "}
              {empList.length}
              {" "}
              Employees
            </p>
        ))}
      </div>

      {/* 3 */}
      <div className="analytics-card">
        <h3>
          3. Average Age Department Wise
        </h3>

        {averageAgeDepartmentWise.map(
          (item) => (
            <p
              key={item.department}
            >
              {item.department}
              {" "}
              :
              {" "}
              {item.averageAge}
            </p>
          )
        )}
      </div>

      {/* 4 */}
      <div className="analytics-card">
        <h3>
          4. Unique Employees
          (After Removing Duplicates)
        </h3>

        <p>
          Total Unique Employees:
          {" "}
          {uniqueEmployees.length}
        </p>
      </div>

      {/* 5 */}
      <div className="analytics-card">
        <h3>
          5. Top 5 Oldest Employees
        </h3>

        {top5OldestEmployees.map(
          (emp) => (
            <p key={emp.id}>
              {emp.firstName}
              {" "}
              -
              {" "}
              {emp.age}
            </p>
          )
        )}
      </div>

    </div>
  );
}

export default EmployeeAnalytics;