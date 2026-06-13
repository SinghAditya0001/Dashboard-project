import React from "react";

const SortBar = ({ sortOption, setSortOption }) => {
  return (
    <div>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort By</option>

        <option value="nameAsc">
          Name Ascending
        </option>

        <option value="nameDesc">
          Name Descending
        </option>

        <option value="ageAsc">
          Age Ascending
        </option>

        <option value="ageDesc">
          Age Descending
        </option>
      </select>
    </div>
  );
};

export default SortBar;