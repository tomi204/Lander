
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY );



export default supabase

// import { createClient } from '@supabase/supabase-js';

// const options = {
//   db: {
//     schema: 'public',
//   },
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   },
//   global: {
//     headers: { 'x-my-custom-header': 'my-app-name' },
//   },
// };
// const supabase = createClient( "https://xyzcompany.supabase.co", "public-anon-key", options );