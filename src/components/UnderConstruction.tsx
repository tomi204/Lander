import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <span className="text-8xl">🚧</span>
      <h1 className="text-4xl font-bold mt-4">
        This section is under construction
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        We're working hard to bring this feature to you. Please check back
        later!
      </p>
    </div>
  );
};

export default UnderConstruction;
