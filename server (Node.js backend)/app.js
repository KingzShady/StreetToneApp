// Setting Const
const express = require('express');  // Importing the Express.js framework for building web applications
const axios = require('axios');  // Importing Axios for making HTTP requests
const multer = require('multer');  // Importing Multer for handling file uploads
const fs = require('fs');
const FormData = require('form-data')
const { promisify } = require('util');  // Importing Console for logging

const app = express();  // Creating an Express application instance
const PORT = 3000;  // Defining the port number on which the server will listen

const upload = multer({dest: 'upload/'});  // Configuring Multer to handle file uploads and store them in the 'upload' directory
const readFileAsync = promisify(fs.readFile);

// Function to upload image to Flask service
async function uploadImageToFlask(imageFilePath){
    try {
       const form = new FormData();
       form.append('image', await readFileAsync(imageFilePath), {
        filename: 'image.jpg', 
    });
    const response = await axios.post('https://localhost:5000/analyze-color',  form, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        },
    });
    return response.data;
    } catch (error) {
        console.error("Error calling the color analysis service:", error);  // Logging an error if the color analysis service call fails
        throw error; // Rethrow error to handle it in the caller
    }
}

// Endpoint to handle image uploads from the frontend
app.post('/submit-image', upload.single('image'), async (req, res) => {
    try{
        const imageFilePath = req.file.path;
        // Try uploading image to Flask using form data
        let colorPalette;
        try{
            colorPalette = await uploadImageToFlask(imageFilePath);
        } catch(formUploadError){
            console.error("Form upload failed. Trying to base64 encoding.");
            // If form upload fails, fallback to base64 encoding
            const imageData = await readFileAsync(imageFilePath, {encoding: 'base64' });
            colorPalette = await axios.post('https://localhost:5000/analyze-color', {
                image: imageData,
            });
        }
        res.json(colorPalette);
    } catch(error){
        console.error("Error handling image upload:", error);
        res.status(500).send("Failed to analyze colors");
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');  // Logging a message indicating that the server is running
});
