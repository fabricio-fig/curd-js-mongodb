require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const COLLECTION = "customers";

let singleton;

async function connect(){
	if(singleton) return singleton;

	const client = new MongoClient(process.env.MONGO_HOST);
	await client.connect();

	singleton = client.db(process.env.MONGO_DATABASE);
	return singleton;

}

async function insert(customer){
	const db = await connect();
	return db.collection("customers").insertOne(customer);
}

async function findOne(id){
	const db = await connect();
	return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}

async function findAll(){
	const db = await connect();
	return db.collection("customers").find().toArray();
}

async function remove(id){
	const db = await connect();
	return db.collection("customers").deleteOne({ _id: new ObjectId(id) });
}

async function update(id, customer){
	const db = await connect();
	return db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: customer });
}
module.exports = {
	insert,
	findOne,
	findAll,
	remove,
	update	
}
