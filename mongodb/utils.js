import { MongoClient } from "mongodb";

/**
* Create a new Airbnb listing
* @param {String} dbName The name of database
*/
export async function mongoConnect(dbName) {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
     const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUS}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
      await client.connect();
      console.log(`Connected to db: ${dbName} - mongoclient`);
      return client
      
    } 
    catch (e) {
      console.error(e);
      throw "Connect Failed"
    } 
}

/**
* Create a new document
* @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
* @param {Object} newDocument The new document to be added
*/
export async function createDocument(client, newDocument){
  //const result = await client.db(dbName).collection("oauthProfile").insertOne(newDocument);
  const result = await client.db().collection("registry").insertOne(newDocument);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  return result
}

export async function closeConnection(client, dbName = "") {
  
  if (typeof client !== "undefined") {
    await client.close();
    console.log(`db: ${dbName} disconnected! - mongoclient`);
  }
}