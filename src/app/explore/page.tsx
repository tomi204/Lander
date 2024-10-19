'use client';
import UserCard from '@/components/UserCard';
import { getAllTalent, getTalentByWallet } from '@/services/talent';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { OurUsers } from '@/interfaces/Common';
import { TalentUser } from '@/interfaces/Talent';

function Explore() {
  const [passports, setPassports] = useState<TalentUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ourUsers, setOurUsers] = useState<TalentUser[]>([]);
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
  const loadOurUsers = async () => {
    try {
      const data = await fetch('/api/wallets');
      const users = await data.json();
      const usersWithPassports = await Promise.all(
        users.map(async (user: OurUsers) => {
          const passport = await getTalentByWallet(user.main_wallet);

          return { passport: passport.passport };
        })
      );

      const ourUsers = usersWithPassports.filter((user) => user.passport);
      setOurUsers(ourUsers.map((user) => user.passport));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };
  console.log(ourUsers, 'ourUsers');

  useEffect(() => {
    loadOurUsers();
  }, []);
  if (!passports || passports.length === 0) return <LoadingSpinner />;

  return (
    <section className=" w-11/12 m-auto mt-10 mb-10">
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
        <TabsContent value="New">
          {ourUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ourUsers.map((user, index) => (
                <UserCard key={index} passport={user} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default Explore;
