import React from "react";
import WorkerCard from "./WorkerCard";

const WorkersGrid = ({ workers }) => {

  
  if (!workers.length) {
    return <p className="text-gray-500">No workers found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {workers.map((worker) => (
        <WorkerCard key={worker._id} worker={worker} />
      ))}
    </div>
  );
};

export default WorkersGrid;
