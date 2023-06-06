
import { connectToDatabase } from '../../lib/db';
const ObjectId = require('mongodb').ObjectId
export async function getProjects() {
    const client = await connectToDatabase();
    const projectTable = client.db('planning-and-construction').collection('projects');

    const projects = await projectTable.find().toArray();

    const parsedProjects = documents.map(document => {
        return {
            ...document,
            _id: document._id.toString()
        };
    });

    const buildingTable = client.db('planning-and-construction').collection('buildings');

    const buildings = await buildingTable.find().toArray();

    const parsedBuildings = documents.map(document => {
        return {
            ...document,
            _id: document._id.toString()
        };
    });

    client.close();


    return return { projects: parsedProjects, buildings: parsedBuildings };

}

async function handler(req, res) {
    const client = await connectToDatabase();
    if (req.method === 'POST') {
        try {

            let project = req.body;
            console.log(project);
            const projectTable = client.db('planning-and-construction').collection('projects');
            const result = await projectTable.insertOne(project);
            console.log(result);
            project._id = result.insertedId;
            client.close()
            res.status(201).json(project);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
    if (req.method === 'PUT') {
        try {
            let project = req.body;
            console.log(project);
            const projectTable = client.db('planning-and-construction').collection('projects');
            project._id = new ObjectId(project._id);
            const result = await projectTable.replaceOne({ _id: project._id }, project);


            client.close()
            res.status(201).json(project);
        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }
    if (req.method === 'GET') {
        try {

            res.status(200).json(await getProjects());
            client.close()

        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }

}

export default handler;