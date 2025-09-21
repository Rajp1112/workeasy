import React from "react";
import CustomSelect from "../../components/CustomSelect";

const FiltersSidebar = ({
  skills,
  selectedSkills,
  toggleSkill,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  availableOnly,
  setAvailableOnly,
  clearFilters,
}) => {
  const ratingOptions = ["4.5+ stars", "4.0+ stars", "3.5+ stars", "3.0+ stars"];

  return (
    <div className="w-72 bg-white p-6 rounded-lg shadow space-y-6">
      {/* Skills */}
      <div>
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      {/* Hourly Rate */}
      <div>
        <h3 className="font-semibold mb-2">Hourly Rate</h3>
        <input
          type="range"
          min="10"
          max="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-600 mt-1">${priceRange}/hr max</p>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <CustomSelect
          options={ratingOptions}
          value={selectedRating}
          onChange={setSelectedRating}
          placeholder="Select rating"
        />
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="font-semibold mb-2">Availability</h3>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available now
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-gray-100 py-2 rounded hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersSidebar;
