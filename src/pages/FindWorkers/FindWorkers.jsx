import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import WorkersGrid from "./WorkersGrid";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getWorkers } from "../../features/auth/authSlice";
const skills = ["Electrician", "Plumber", "Carpenter", "Painter", "Cleaner"];

const FindWorkersPage = () => {
  const dispatch = useDispatch();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [priceRange, setPriceRange] = useState(100);
  const [selectedRating, setSelectedRating] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
// const workers = [
//   {
//     id: 1,
//     name: "John Martinez",
//     skill: "Electrician",
//     rating: 4.9,
//     reviews: 127,
//     hourlyRate: 45,
//     location: "Manhattan, NY",
//     responseTime: "30 min",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     specialties: ["Wiring", "Smart Home"],
//     available: true,
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     skill: "Plumber",
//     rating: 4.8,
//     reviews: 89,
//     hourlyRate: 50,
//     location: "Brooklyn, NY",
//     responseTime: "45 min",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     specialties: ["Pipe Repair", "Drain Cleaning"],
//     available: true,
//   },
//   {
//     id: 3,
//     name: "Mike Brown",
//     skill: "Painter",
//     rating: 3.6,
//     reviews: 40,
//     hourlyRate: 35,
//     location: "Queens, NY",
//     responseTime: "1 hr",
//     image: "https://randomuser.me/api/portraits/men/45.jpg",
//     specialties: ["Indoor Painting", "Wall Prep"],
//     available: false,
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     skill: "Cleaner",
//     rating: 4.7,
//     reviews: 76,
//     hourlyRate: 30,
//     location: "Bronx, NY",
//     responseTime: "20 min",
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//     specialties: ["Deep Cleaning", "Office Cleaning"],
//     available: true,
//   },
//   {
//     id: 5,
//     name: "David Wilson",
//     skill: "Carpenter",
//     rating: 4.5,
//     reviews: 53,
//     hourlyRate: 40,
//     location: "Staten Island, NY",
//     responseTime: "50 min",
//     image: "https://randomuser.me/api/portraits/men/28.jpg",
//     specialties: ["Furniture Making", "Wood Repair"],
//     available: true,
//   },
//   {
//     id: 6,
//     name: "Sophia Martinez",
//     skill: "Electrician",
//     rating: 4.6,
//     reviews: 67,
//     hourlyRate: 48,
//     location: "Harlem, NY",
//     responseTime: "35 min",
//     image: "https://randomuser.me/api/portraits/women/34.jpg",
//     specialties: ["Lighting", "Smart Devices"],
//     available: false,
//   },
//   {
//     id: 7,
//     name: "James Anderson",
//     skill: "Plumber",
//     rating: 4.2,
//     reviews: 31,
//     hourlyRate: 38,
//     location: "Jersey City, NJ",
//     responseTime: "40 min",
//     image: "https://randomuser.me/api/portraits/men/48.jpg",
//     specialties: ["Water Heaters", "Leak Fixing"],
//     available: true,
//   },
//   {
//     id: 8,
//     name: "Olivia Taylor",
//     skill: "Painter",
//     rating: 4.9,
//     reviews: 145,
//     hourlyRate: 55,
//     location: "Long Island, NY",
//     responseTime: "25 min",
//     image: "https://randomuser.me/api/portraits/women/29.jpg",
//     specialties: ["Exterior Painting", "Design Walls"],
//     available: true,
//   },
//   {
//     id: 9,
//     name: "Daniel Thomas",
//     skill: "Cleaner",
//     rating: 3.9,
//     reviews: 22,
//     hourlyRate: 25,
//     location: "Hoboken, NJ",
//     responseTime: "1 hr 15 min",
//     image: "https://randomuser.me/api/portraits/men/53.jpg",
//     specialties: ["Carpet Cleaning", "Kitchen Cleaning"],
//     available: false,
//   },
//   {
//     id: 10,
//     name: "Isabella Garcia",
//     skill: "Carpenter",
//     rating: 4.4,
//     reviews: 61,
//     hourlyRate: 42,
//     location: "Yonkers, NY",
//     responseTime: "30 min",
//     image: "https://randomuser.me/api/portraits/women/40.jpg",
//     specialties: ["Custom Shelves", "Wood Flooring"],
//     available: true,
//   },
//   {
//     id: 11,
//     name: "Ethan Lee",
//     skill: "Electrician",
//     rating: 4.3,
//     reviews: 29,
//     hourlyRate: 37,
//     location: "Queens, NY",
//     responseTime: "20 min",
//     image: "https://randomuser.me/api/portraits/men/60.jpg",
//     specialties: ["Wiring", "Circuit Breakers"],
//     available: false,
//   },
//   {
//     id: 12,
//     name: "Mia White",
//     skill: "Cleaner",
//     rating: 4.8,
//     reviews: 84,
//     hourlyRate: 28,
//     location: "Bronx, NY",
//     responseTime: "25 min",
//     image: "https://randomuser.me/api/portraits/women/51.jpg",
//     specialties: ["Window Cleaning", "Office Maintenance"],
//     available: true,
//   },
//   {
//     id: 13,
//     name: "Benjamin Harris",
//     skill: "Painter",
//     rating: 4.0,
//     reviews: 47,
//     hourlyRate: 36,
//     location: "Brooklyn, NY",
//     responseTime: "55 min",
//     image: "https://randomuser.me/api/portraits/men/72.jpg",
//     specialties: ["Graffiti Removal", "Indoor Paint"],
//     available: true,
//   },
//   {
//     id: 14,
//     name: "Charlotte Clark",
//     skill: "Plumber",
//     rating: 4.7,
//     reviews: 98,
//     hourlyRate: 52,
//     location: "Newark, NJ",
//     responseTime: "45 min",
//     image: "https://randomuser.me/api/portraits/women/60.jpg",
//     specialties: ["Bathroom Fittings", "Gas Lines"],
//     available: true,
//   },
//   {
//     id: 15,
//     name: "Henry Lewis",
//     skill: "Carpenter",
//     rating: 3.8,
//     reviews: 20,
//     hourlyRate: 33,
//     location: "Hoboken, NJ",
//     responseTime: "1 hr",
//     image: "https://randomuser.me/api/portraits/men/83.jpg",
//     specialties: ["Cabinet Repair", "Wooden Doors"],
//     available: false,
//   },
//   {
//     id: 16,
//     name: "Amelia Walker",
//     skill: "Electrician",
//     rating: 4.5,
//     reviews: 74,
//     hourlyRate: 47,
//     location: "Staten Island, NY",
//     responseTime: "35 min",
//     image: "https://randomuser.me/api/portraits/women/74.jpg",
//     specialties: ["Outdoor Wiring", "EV Chargers"],
//     available: true,
//   },
//   {
//     id: 17,
//     name: "Lucas Robinson",
//     skill: "Plumber",
//     rating: 4.1,
//     reviews: 39,
//     hourlyRate: 41,
//     location: "Queens, NY",
//     responseTime: "50 min",
//     image: "https://randomuser.me/api/portraits/men/91.jpg",
//     specialties: ["Sewer Repair", "Fixture Install"],
//     available: true,
//   },
//   {
//     id: 18,
//     name: "Harper Hall",
//     skill: "Cleaner",
//     rating: 4.6,
//     reviews: 70,
//     hourlyRate: 32,
//     location: "Brooklyn, NY",
//     responseTime: "30 min",
//     image: "https://randomuser.me/api/portraits/women/80.jpg",
//     specialties: ["Move-out Cleaning", "Dust Removal"],
//     available: false,
//   },
//   {
//     id: 19,
//     name: "William Allen",
//     skill: "Painter",
//     rating: 4.9,
//     reviews: 152,
//     hourlyRate: 60,
//     location: "Manhattan, NY",
//     responseTime: "20 min",
//     image: "https://randomuser.me/api/portraits/men/94.jpg",
//     specialties: ["Luxury Painting", "Artistic Finishes"],
//     available: true,
//   },
//   {
//     id: 20,
//     name: "Evelyn Young",
//     skill: "Carpenter",
//     rating: 4.2,
//     reviews: 34,
//     hourlyRate: 39,
//     location: "Jersey City, NJ",
//     responseTime: "45 min",
//     image: "https://randomuser.me/api/portraits/women/92.jpg",
//     specialties: ["Table Making", "Wood Carving"],
//     available: true,
//   },
// ];
useEffect(() => {
  setLoading(true);

  dispatch(getWorkers())
    .unwrap()
    .then((res) => {      
      setWorkers( res || []);
    })
    .catch((err) => {
      console.error(err);
      setWorkers([]); 
    })
    .finally(() => setLoading(false));
}, []);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setSelectedSkills([]);
    setPriceRange(100);
    setSelectedRating("");
    setAvailableOnly(false);
  };

  const filteredWorkers = workers.filter((w) => {
  const ratingThreshold = selectedRating
    ? parseFloat(selectedRating.split("+")[0])
    : 0;

  return (
    (search === "" || (w.skills?.join(" ") || "").toLowerCase().includes(search.toLowerCase())) &&
    (location === "" || (w.city || "").toLowerCase().includes(location.toLowerCase())) &&
    (selectedSkills.length === 0 || selectedSkills.some((s) => w.skills?.includes(s))) &&
    (parseFloat(w.hour_rate) || 0) <= priceRange &&
    (!availableOnly || w.available)
  );
});

const visibleWorkers = filteredWorkers.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-6 lg:px-12">
     <div className="sticky top-14 bg-gray-50 z-20 py-2  px-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Find Workers</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          onSearch={() => {}}
        />
      </div>

      <div className="flex flex-1">
        {/* <FiltersSidebar
          skills={skills}
          selectedSkills={selectedSkills}
          toggleSkill={toggleSkill}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          clearFilters={clearFilters}
        /> */}

 <div className="hidden lg:block sticky top-56 h-[calc(100vh-5rem)] overflow-y-auto border-r bg-white p-4">
          <FiltersSidebar
            skills={skills}
            selectedSkills={selectedSkills}
            toggleSkill={toggleSkill}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            availableOnly={availableOnly}
            setAvailableOnly={setAvailableOnly}
            clearFilters={clearFilters}
          />
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <WorkersGrid workers={visibleWorkers} />

          {visibleCount < filteredWorkers.length && (
            <div className="flex justify-center mt-6">
              <Button
                label="Load More"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindWorkersPage;
