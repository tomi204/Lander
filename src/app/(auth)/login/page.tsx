import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftCircle } from 'lucide-react';
import Link from 'next/link';
import ProviderButtons from './_components/provider-buttons';

const LoginPage = () => {
  return (
    <>
      <section className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Button variant="outline" asChild>
          <Link href="/" className={cn('absolute left-4 top-4')}>
            <ChevronLeftCircle className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="mx-auto max-w-80 flex flex-col justify-center space-y-6 ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <ProviderButtons />

            {/*
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p> */}
          </div>

          {/* <LoginForm /> */}
          {/* <OneTapComponent /> */}

          <p className="px-8 text-center text-sm text-muted-foreground">
            {/* <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Register
            </Link> */}
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
