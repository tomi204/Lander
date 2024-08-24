import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        try {
            let { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return res.status(200).json(data);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}