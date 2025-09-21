import React from "react";
import CustomInput from "../../components/CustomInput";
import { User, MapPin, Search } from "lucide-react";
const SearchBar = ({ search, setSearch, location, setLocation, onSearch }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        
        <CustomInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What service do you need?"
              icon={User} 
              type="text"
            />
            
        <CustomInput
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              icon={MapPin} 
              type="text"
            />
        
        <button onClick={onSearch} className="bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center justify-center">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
