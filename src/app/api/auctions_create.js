import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { property_id, starting_bid, current_bid, bid_increment, end_time } = req.body;

            let { data: auction, error } = await supabase
                .from('auctions')
                .insert([
                    { property_id, starting_bid, current_bid, bid_increment, end_time },
                ]);

            if (error) throw error;

            res.status(201).json(auction[0]);
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