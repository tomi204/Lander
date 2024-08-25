import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                user_id,
                token_amount,
                start_time,
                end_time,
            } = req.body;

            let { data: stake, error } = await supabase
                .from('stakes')
                .insert([
                    { user_id, token_amount, start_time, end_time },
                ]);

            if (error) throw error;

            res.status(201).json(stake[0]);
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