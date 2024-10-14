import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';
console.log(origin,"origin ")
  if (code) {
    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (session) {
      const { user } = session;
      const { email, id: auth_id, user_metadata } = user;

      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      if (existingUser) {
        console.log('User already exists');
        return NextResponse.redirect(`${origin}${next}`);
      }

      const { error: insertError } = await supabase.from('users').insert({
        id: auth_id,
        email: email,
        name: user_metadata.full_name || 'Unknown', // Update as needed
        phone: 0, // Default value or update as needed
        avatar_url: user_metadata.avatar_url || null,
        verified: true,
      });

      if (insertError) {
        console.error('Error inserting new user:', insertError);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      // Updated redirect logic
      const forwardedHost = request.headers.get('x-forwarded-host');
      const forwardedProto = request.headers.get('x-forwarded-proto');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const productionOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://lander.uno';

      let redirectUrl;
      if (isLocalEnv) {
        redirectUrl = `${origin}${next}`;
      } else if (forwardedHost && forwardedProto) {
        redirectUrl = `${forwardedProto}://${forwardedHost}${next}`;
      } else {
        redirectUrl = `${productionOrigin}${next}`;
      }

      console.log('Redirecting to:', redirectUrl); // For debugging
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(`${origin}/login?message=error`);
}

// import { NextResponse } from 'next/server';
// import { createClient } from '@/utils/supabase/server';

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get('code');
//   const next = searchParams.get('next') ?? '/';

//   if (code) {
//     const supabase = createClient();

//     const {
//       data: { session },
//       error: exchangeError,
//     } = await supabase.auth.exchangeCodeForSession(code);

//     if (exchangeError) {
//       console.error('Error exchanging code for session:', exchangeError);
//       return NextResponse.redirect(`${origin}/auth/auth-code-error`);
//     }

//     if (session) {
//       const { user } = session;
//       const { email, id: auth_id, user_metadata } = user;

//       // Check if user already exists
//       const { data: existingUser, error: fetchError } = await supabase
//         .from('users')
//         .select('*')
//         .eq('email', email)
//         .single();

//       if (fetchError && fetchError.code !== 'PGRST116') {
//         // No user found (PGRST116)
//         console.error('Error fetching user:', fetchError);
//         return NextResponse.redirect(`${origin}/auth/auth-code-error`);
//       }

//       if (existingUser) {
//         console.log('User already exists');
//         return NextResponse.redirect(`${origin}${next}`);
//       }

//       // Insert new user
//       const { error: insertError } = await supabase.from('users').insert({
//         email: email,
//         name: user_metadata.full_name || 'Unknown',
//         old_wallet: 'default_wallet_value', // Update as needed
//         phone: 0, // Default value or update as needed
//         auth_id: auth_id,
//         avatar_url: user_metadata.avatar_url || null,
//         verified: true,
//       });

//       if (insertError) {
//         console.error('Error inserting new user:', insertError);
//         return NextResponse.redirect(`${origin}/auth/auth-code-error`);
//       }

//       // Redirect after successful login
//       const forwardedHost = request.headers.get('x-forwarded-host');
//       const isLocalEnv = process.env.NODE_ENV === 'development';
//       if (isLocalEnv) {
//         return NextResponse.redirect(`${origin}${next}`);
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`);
//       } else {
//         return NextResponse.redirect(`${origin}${next}`);
//       }
//     }
//   }

//   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
// }
