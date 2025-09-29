import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import FiltersSidebar from './FiltersSidebar';
import WorkersGrid from './WorkersGrid';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { getWorkers } from '../../features/auth/authSlice';
import API_BASE_URL from '../../app/apiConfig';
import { io } from 'socket.io-client';
const skills = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Cleaner'];

const FindWorkersPage = () => {
  const dispatch = useDispatch();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [priceRange, setPriceRange] = useState(100);
  const [selectedRating, setSelectedRating] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => {
    setLoading(true);

    dispatch(getWorkers())
      .then((res) => {
        setWorkers(res?.payload || []);
      })
      .catch((err) => {
        console.error(err);
        setWorkers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const socket = io(API_BASE_URL);

    socket.on('workerAvailabilityUpdated', ({ workerId, available }) => {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker._id === workerId ? { ...worker, available } : worker
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setSelectedSkills([]);
    setPriceRange(100);
    setSelectedRating('');
    setAvailableOnly(false);
  };

  const filteredWorkers = workers?.filter((w) => {
    const ratingThreshold = selectedRating
      ? parseFloat(selectedRating.split('+')[0])
      : 0;

    return (
      (search === '' ||
        (w.skills?.join(' ') || '')
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (location === '' ||
        (w.city || '').toLowerCase().includes(location.toLowerCase())) &&
      (selectedSkills.length === 0 ||
        selectedSkills.some((s) => w.skills?.includes(s))) &&
      (parseFloat(w.hour_rate) || 0) <= priceRange &&
      (!availableOnly || w.available)
    );
  });

  const visibleWorkers = filteredWorkers?.slice(0, visibleCount);

  return (
    <div className='min-h-screen bg-gray-50 py-2 px-6 lg:px-12'>
      <div className='sticky top-14 bg-gray-50 z-20 py-2  px-6 shadow-sm'>
        <h1 className='text-3xl font-bold mb-4'>Find Workers</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          onSearch={() => {}}
        />
      </div>

      <div className='flex flex-1'>
        <div className='hidden lg:block sticky top-56 h-[calc(100vh-5rem)] overflow-y-auto border-r bg-white p-4'>
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

        <div className='flex-1 p-6 overflow-y-auto'>
          <WorkersGrid workers={visibleWorkers} />

          {visibleCount < filteredWorkers.length && (
            <div className='flex justify-center mt-6'>
              <Button
                label='Load More'
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
