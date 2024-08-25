import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                user_id,
                auction_id,
                property_id,
                amount,
                transaction_type,
            } = req.body;

            let { data: transaction, error } = await supabase
                .from('transactions')
                .insert([
                    { user_id, auction_id, property_id, amount, transaction_type },
                ]);

            if (error) throw error;

            res.status(201).json(transaction[0]);
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