import { connectToDatabase } from '../../lib/db';
const ObjectId = require('mongodb').ObjectId

async function handler(req, res) {
    const client = await connectToDatabase();
    if (req.method === 'POST') {
        try {

            let building = req.body;
            const buildingTable = client.db('planning-and-construction').collection('buildings');
            const result = await buildingTable.insertOne(building);
            console.log(result);
            building._id = result.insertedId;
            client.close()
            res.status(201).json(building);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
    if (req.method === 'PUT') {
        try {
            let building = req.body;
            const buildingTable = client.db('planning-and-construction').collection('buildings');
            building._id = new ObjectId(building._id);
            const result = await buildingTable.replaceOne({ _id: building._id }, building);
            client.close()
            res.status(201).json(building);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }

}

export default handler;