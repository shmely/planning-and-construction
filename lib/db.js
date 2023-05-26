import { MongoClient } from 'mongodb';
const { UUID } = require('bson');
export async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://shmely:Iuh2ssdt@cluster0.bte8hcw.mongodb.net/?retryWrites=true&w=majority'
    );

    return client;
}