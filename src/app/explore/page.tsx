'use client';
import UserCard from '@/components/UserCard';
import { getAllTalent } from '@/services/talent';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@chakra-ui/react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function Explore() {
  const [passports, setPassports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ourUsers, setOurUsers] = useState([]);

  // Función para cargar los pasaportes paginados
  const loadPassports = async (page: number) => {
    const talent = await getAllTalent(page);
    setPassports(talent.passports);
    setTotalPages(talent.pagination.last_page);
  };

  useEffect(() => {
    loadPassports(currentPage);
  }, [currentPage]);

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

  //   const loadOurUsers = async () => {
  //     const ourUsers = await fetch('/api/users/wallets');
  //     console.log(ourUsers, 'ourUsers');
  //     //setOurUsers(ourUsers as []);
  //   };

  //   useEffect(() => {
  //     loadOurUsers();
  //   }, []);

  if (!passports || passports.length === 0) return <LoadingSpinner />;

  return (
    <section className=" w-11/12 m-auto mt-10">
      <Tabs defaultValue="Top" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Top">Top Talent</TabsTrigger>
          <TabsTrigger value="New">Our Users</TabsTrigger>
        </TabsList>
        <TabsContent value="Top">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {passports.map((passport, index) => (
              <UserCard key={index} passport={passport} />
            ))}
          </div>
          <div className="flex justify-center mb-4 text-white items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#826aee] rounded-xl  mr-2"
            >
              Previous
            </button>
            <span className="text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#826aee] rounded-xl ml-2"
            >
              Next
            </button>
          </div>
        </TabsContent>
        <TabsContent value="New"></TabsContent>
      </Tabs>
    </section>
  );
}

export default Explore;
