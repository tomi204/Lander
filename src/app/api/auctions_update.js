import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const { property_id, starting_bid, current_bid, bid_increment, end_time } = req.body;

            let { data: auction, error } = await supabase
                .from('auctions')
                .update({
                    property_id,
                    starting_bid,
                    current_bid,
                    bid_increment,
                    end_time,
                })
                .eq('id', id);

            if (error) throw error;

            if (!auction) {
                return res.status(404).json({ message: 'Auction not found' });
            }

            res.status(200).json(auction[0]);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}