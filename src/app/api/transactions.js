import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let { data: transactions, error } = await supabase
                .from('transactions')
                .select('*');

            if (error) throw error;

            res.status(200).json(transactions);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}