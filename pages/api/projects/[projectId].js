import { ObjectId } from 'bson';
import { connectToDatabase } from '../../../../lib/db';

export async function getProjectById(projectId) {
    console.log(`get project id ${projectId}`);
    const client = await connectToDatabase();
    const projectTable = client.db('planning-and-construction').collection('projects');
    const project = await projectTable.findOne({ "_id": ObjectId(projectId) });
    console.log(project);
    project._id = project._id.toString();
    return project;
    client.close()
}


async function handler(req, res) {
    const query = req.query;
    const { projectId } = query;
    if (req.method === 'GET') {
        try {
            const project = await getProjectById(projectId);
            res.status(201).json(project);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
}