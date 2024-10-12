'use client';
import UserCard from '@/components/UserCard';
import { getAllTalent } from '@/services/talent';
import { useEffect, useState } from 'react';

function Explore() {
  const [passports, setPassports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTalent = async () => {
      const talent = await getAllTalent(); // Asegúrate de que `getAllTalent` soporte la paginación por página
      setPassports(talent.passports);
      setTotalPages(talent.pagination.last_page);
    };

    getTalent();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  console.log(passports, 'passports');

  return (
    <section className=" w-11/12 m-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {passports.map((passport, index) => (
          <UserCard key={index} passport={passport} />
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 mr-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 ml-2"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Explore;
