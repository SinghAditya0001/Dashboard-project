import React, { useState } from "react";

function AddEmployee({ employees, setEmployees }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    age: "",
    gender: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    if (!validate()) return;

    const newEmployee = {
      id: employees.length + 1,
      firstName: formData.firstName,
      email: formData.email,
      age: Number(formData.age),
      gender: formData.gender,
      company: {
        department: formData.department,
      },
    };

    setEmployees([...employees, newEmployee]);

    setFormData({
      firstName: "",
      email: "",
      age: "",
      gender: "",
      department: "",
    });

    setShowForm(false);
  };

  return (
    <div>

      <button
        className="add-btn"
        onClick={() => setShowForm(!showForm)}
      >
        Add Employee
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="firstName"
            placeholder="Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <p>{errors.firstName}</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <p>{errors.email}</p>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <p>{errors.age}</p>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <p>{errors.gender}</p>

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <p>{errors.department}</p>

          <button type="submit">
            Save Employee
          </button>

        </form>
      )}
    </div>
  );
}

export default AddEmployee;