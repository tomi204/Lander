'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/components/ui/input/input-form';
import supabase from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Notiflix from 'notiflix';
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

type LoginValuesType = z.infer<typeof loginFormSchema>;

const defaultValues: LoginValuesType = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function handleLogin(values: LoginValuesType) {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) return Notiflix.Notify.failure('Error:' + error);

    Notiflix.Notify.success('Login successful');

    router.refresh();
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-full flex flex-col gap-y-4"
          >
            <InputForm
              label="Email"
              name="email"
              placeholder="hello@sarathadhi.com"
              description=""
              required
            />

            <InputForm
              type="password"
              label="Password"
              name="password"
              description=""
              required
            />

            <Button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
