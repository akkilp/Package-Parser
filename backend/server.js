//Express to make things more managable: GET and POST used
const express = require('express');
const app = express();

//Cross-Origin Resource Sharing is used to allow front to fetch data from different origin
const cors = require("cors");
app.use(cors());

//Most of the functionality is located in module.export file
const {
       readFile,
       parsePackages, 
       parseData
      } = require('./tools.js');

//Port to the backend
const port = process.env.PORT || 3333;

// Multer is being used for file uploads
// Multer configurations
var multer = require('multer')
// Defining name and end directory for received files
var storage = multer.diskStorage(
    {
        destination: './public/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
var upload = multer({storage: storage}).single('file')

// Declaring file path that is being updated with handleUpdate()
var filepath;

// Main function that includes parsing the raw data to the final JSON-format
// readFile      --> reads and returns the content from the file path using fs
// parsePackages --> content is being parsed to packages and sorted 
// parseData     --> packages are being mapped through, parsed and returned as objects
//               --> parsed objects are pushed to packageArray
// More detailed explanation in ./tools.js
async function handleFile(filepath) {
    let packageArray = [];
    try{
        let readData = await readFile(filepath)
        let parsedPackages = await parsePackages(readData)
        let parsedData = await parseData(parsedPackages)
        packageArray.push(parsedData)
            return packageArray
    } catch(error){console.log(error)} 
    
}

// Upload function for handling the received data
// Saves the file to "./public" directory, defines the name and ends the request
// POST is followed by GET command, that updates the data
async function handleUpload(req,res) {
    upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } 
            else if(req.file){
                filepath = "./public/" + req.file.originalname
                res.end()
            } else console.log("Invalid file")
        })
}

///// ROUTES ///////

// GET ROUTE
// Executes main function for the selected file and sends it to the client
app.get('/packages', async (req, res) => {
    console.log("GET")
    packageArray = await handleFile(filepath)
    packet = JSON.stringify(Object.assign({},packageArray))
    res.send(packet);
});

// POST PATH
// Is used to choose the file
app.post('/upload', (req, res) => {
    console.log("POST")
    handleUpload(req,res)
});

app.listen(port, () => console.log(`Listening on port ${port}`));