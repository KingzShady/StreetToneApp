// Setting Const
const express = require('express');  // Importing the Express.js framework for building web applications
const axios = require('axios');  // Importing Axios for making HTTP requests
const multer = require('multer');  // Importing Multer for handling file uploads
const { Console } = require('console');  // Importing Console for logging
const upload = multer({dest: 'upload/'});  // Configuring Multer to handle file uploads and store them in the 'upload' directory

const app = express();  // Creating an Express application instance
const PORT = 3000;  // Defining the port number on which the server will listen

// Endpoint to handle image uploads from the frontend
app.post('/submit-image', upload.single('image'), async (req, res) => {
    try {
        const imageFilePath = res.file.path;  // Obtaining the file path of the uploaded image
        const response = await axios.post('http://localhost:5000/analyze-color', {
            image: imageFilePath,  // Sending the image file path to the color analysis service (adjust based on how to handle file transfer)
        });

        const colorPalette = response.data;  // Extracting the color palette from the response
        res.json(colorPalette);  // Sending the color palette as a JSON response
    } catch (error) {
        console.error("Error calling the color analysis service:", error);  // Logging an error if the color analysis service call fails
        res.status(500).send("Failed to analyze colors");  // Sending an error response with status code 500
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');  // Logging a message indicating that the server is running
});
