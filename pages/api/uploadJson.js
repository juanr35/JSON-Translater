import fs from "fs";
import translate from "../../lib/translator"

export default async function handler(req, res) {
  
  var filepath = "./uploads/json-translate.json";

  try {
    let obj = JSON.parse(req.body.input)
    fs.writeFileSync(filepath, req.body.input);
    console.log("The file was succesfully upload!");

    try {
      let result = await translate(obj)
      res.status(200).json({ output: result })
    } 
    catch (error) {
      res.status(500).json({ error: 'Server Error' })
    }
  } 
  catch (error) {
    console.log("Cannot write file ");
    res.status(500).json({ error: 'Cannot write file' })
    
  }
}
 
