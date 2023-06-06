import { connectToDatabase } from '../../../lib/db';
const ObjectId = require('mongodb').ObjectId;
async function handler(req, res) {
    const client = await connectToDatabase();
    if (req.method === 'DELETE') {
        try {

            const { buildingId } = req.query;
            const buildingTable = client.db('planning-and-construction').collection('buildings');
            const id = new ObjectId(buildingId);
            console.log(`id: ${id}`)
            const result = await buildingTable.deleteOne({ _id: id })
            console.log(result);
            client.close()
            res.status(200).json('deleted');
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
}

export default handler;