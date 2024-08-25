import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            let { data: properties, error } = await supabase
                .from('properties')
                .select('*');

            if (error) throw error;

            res.status(200).json(properties);
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
