import fs from "fs";
import path from "path";

export default async function handler(req, res) {

  var filePath = "./uploads/json-translate.json";

  if (req.method == 'POST') {

    try {
      let obj = JSON.parse(req.body.output)
      fs.writeFileSync(filePath, req.body.output);
      console.log("The file was succesfully upload!");
      res.status(200).json({ success: true })
    } 
    catch (error) {
      console.log("Cannot write file ");
      res.status(500).json({ error: 'Cannot write file' })
    }
  }
  else if (req.method == 'GET') {    
    var stat = fs.statSync(filePath);
  
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=json-translate.json',
        'Content-Length': stat.size
    });
  
    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  }
}