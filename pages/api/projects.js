
import { connectToDatabase } from '../../lib/db';
const ObjectId = require('mongodb').ObjectId

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
            console.log('in the backednd')
            const projectTable = client.db('planning-and-construction').collection('projects');

            const documents = await projectTable.find({}).toArray(function (err, documents) {
                if (err) {
                    console.error('Error retrieving documents:', err);
                    return;
                }
                return documents;



            });
            documents.forEach(document => console.log(document));
            res.status(200).json(documents);
            client.close()

        } catch (error) {
            console.log(error);
            client.close()
            res.status(500).json(error);
        }
    }

}

export default handler;