import { Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <Spinner size={'xl'} />
    </section>
  );
};
