import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                name,
                email,
                role,
                password_hash,
                score = 0,
                wallet,
            } = req.body;

            let { data: user, error } = await supabase
                .from('users')
                .insert([
                    { name, email, role, password_hash, score, wallet },
                ]);

            if (error) throw error;

            res.status(201).json(user[0]);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
