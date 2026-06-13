import React from 'react'
import { useState ,useEffect} from 'react'
import SearchBar from "./Components/SearchBar";
import FilterBar from './Components/FilterBar';
import SortBar from './Components/SortBar';
import EmployeeModal from "./Components/EmployeeModal";
import "./App.css";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import DeleteEmployee from "./Components/DeleteEmployee";
import DashboardStats from "./Components/DashboardStats";
import EmployeeAnalytics from "./Components/EmployeeAnalytics";


function App() {

     const [employees, setEmployees] = useState([]);
     const [originalEmployees, setOriginalEmployees] = useState([]);
     const [searchTerm, setSearchTerm] = useState("");
     const [selectedDepartment, setSelectedDepartment] =useState("");
     const [selectedGender, setSelectedGender] =useState("");
     const [sortOption, setSortOption] =useState("");
     const [selectedEmployee, setSelectedEmployee] = useState(null);
     const [editEmployee, setEditEmployee] =useState(null);
     const [deleteEmployee, setDeleteEmployee] =useState(null);
     const [darkMode, setDarkMode] = useState(false);
  
     // Api Fetch
     useEffect(() => {

  const savedEmployees =
    localStorage.getItem("employees");

  if (savedEmployees) {

    const parsedData =
      JSON.parse(savedEmployees);

    setEmployees(parsedData);
    setOriginalEmployees(parsedData);

  } else {

    fetch("https://dummyjson.com/users?limit=5")
      .then((res) => res.json())
      .then((data) => {

        setEmployees(data.users);
        setOriginalEmployees(data.users);

        localStorage.setItem(
          "employees",
          JSON.stringify(data.users)
        );

      });
  }

}, []);

useEffect(() => {

  if (employees.length > 0) {

    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );

  }

}, [employees]);

  // Search Bar + Filter + Sort 

  let filteredEmployees = employees.filter((emp) => {
  const searchMatch =
    emp.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    emp.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const departmentMatch =
      selectedDepartment === "" ||
      emp.company.department === selectedDepartment;

  const genderMatch =
    selectedGender === "" ||
    emp.gender === selectedGender;

  return (
    searchMatch &&
    departmentMatch &&
    genderMatch
  );
});


// Sorting 
filteredEmployees.sort((a, b) => {
  switch (sortOption) {
    case "nameAsc":
      return a.firstName.localeCompare(
        b.firstName
      );

    case "nameDesc":
      return b.firstName.localeCompare(
        a.firstName
      );

    case "ageAsc":
      return a.age - b.age;

    case "ageDesc":
      return b.age - a.age;

    default:
      return 0;
  }
});
 

  return (
    <div className={ darkMode
      ? "app-container dark"
      : "app-container"
      }
    >
      <div className="dashboard-header">
      <h1>Employee Management Dashboard</h1>
      
       <button className="theme-btn"
                onClick={() =>
                setDarkMode(!darkMode)
               }
    >
                {darkMode
                ? "☀ Light Mode"
                : "🌙 Dark Mode"}
        </button>
    </div>

      <DashboardStats employees={employees} />
      

    <div className="controls-section">
      <AddEmployee
        employees={employees}
        setEmployees={setEmployees}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FilterBar
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />

      <SortBar
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>  
      


      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Department</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.email}</td>
              <td>{emp.age}</td>
              <td>{emp.gender}</td>
              <td>{emp.company.department}</td>
              <td>
                  <button
                        className="view-btn"
                        onClick={() => setSelectedEmployee(emp)}>View</button>
              </td>
              <td>
                   <button
                        className="edit-btn"
                        onClick={() =>setEditEmployee(emp)}>Edit</button>
              </td>
              <td>
                   <button
                        className="delete-btn"
                        onClick={() =>setDeleteEmployee(emp)}>Delete</button>      
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
      <EditEmployee
      employee={editEmployee}
      employees={employees}
      setEmployees={setEmployees}
      onClose={() =>
      setEditEmployee(null)
      }
      />

      <DeleteEmployee
      employee={deleteEmployee}
      employees={employees}
      setEmployees={setEmployees}
      onClose={() =>
      setDeleteEmployee(null)
      }
      />
       <EmployeeAnalytics employees={employees}/>

    </div>
  )
}

export default App ;
