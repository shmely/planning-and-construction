import { ObjectId } from 'bson';
import { connectToDatabase } from '../../../lib/db';
async function handler(req, res) {    
    const query = req.query;
    const { projectId } = query;
    if (req.method === 'GET') {
        try {
            const client = await connectToDatabase();
            const projectTable = client.db('planning-and-construction').collection('projects');
            const result = await projectTable.findOne({ "_id": ObjectId(projectId) });
            console.log(result);
            client.close()
            res.status(201).json(project);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
}