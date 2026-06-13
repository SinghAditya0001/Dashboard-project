import React from "react";

const FilterBar = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedGender,
  setSelectedGender,
}) => {
  return (
    <div>
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Support">Support</option>
      </select>

      <select
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default FilterBar;