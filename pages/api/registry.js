import { mongoConnect, createDocument, closeConnection } from "../../mongodb/utils";

const dbReg = process.env.REG_DB
let client

export default async function handler(req, res) {
  
  try {
    client = await mongoConnect(dbReg)
    let newDoc = {
        ...req.body,
        createAt: new Date()
    }
    const newReg = await createDocument(client, newDoc);           
    return res.status(201).json(newDoc)
  } 
  catch (error) {
    console.log(error)
    return res.status(400).json({ msg: error.message });
  }
  finally {
    // Close the connection to the MongoDB cluster
    await closeConnection(client, dbReg)
  }
}