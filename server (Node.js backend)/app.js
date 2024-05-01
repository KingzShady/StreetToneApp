// Setting Const
const express = require('express');  // Importing the Express.js framework for building web applications
const axios = require('axios');  // Importing Axios for making HTTP requests
const multer = require('multer');  // Importing Multer for handling file uploads
const fs = require('fs');  // File System module for file operations
const FormData = require('form-data');  // FormData for creating multipart form-data requests
const { promisify } = require('util');  // Util module for promisifying functions

const app = express();  // Creating an Express application instance
const PORT = 3000;  // Defining the port number on which the server will listen

const upload = multer({ dest: 'upload/' });  // Configuring Multer to handle file uploads and store them in the 'upload' directory
const readFileAsync = promisify(fs.readFile);  // Promisifying fs.readFile function for asynchronous file reading

// Function to upload image to Flask service
async function uploadImageToFlask(imageFilePath) {
    try {
        const form = new FormData();  // Creating a new FormData instance
        form.append('image', await readFileAsync(imageFilePath), {  // Appending the image file to the form data
            filename: 'image.jpg',  // Setting the filename
        });
        const response = await axios.post('https://localhost:5000/analyze-color', form, {  // Sending a POST request with form data to the Flask service
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,  // Setting the content type header for multipart form-data
            },
        });
        return response.data;  // Returning the data received from the service
    } catch (error) {
        console.error("Error calling the color analysis service:", error);  // Logging an error if the color analysis service call fails
        throw error;  // Rethrow error to handle it in the caller
    }
}

// Endpoint to handle image uploads from the frontend
app.post('/submit-image', upload.single('image'), async (req, res) => {
    try {
        const imageFilePath = req.file.path;  // Obtaining the file path of the uploaded image
        
        // Try uploading image to Flask using form data
        let colorPalette;
        try {
            colorPalette = await uploadImageToFlask(imageFilePath);  // Trying to upload image to Flask service
        } catch (formUploadError) {
            console.error("Form upload failed. Trying to base64 encoding.");  // Logging if form upload fails
            // If form upload fails, fallback to base64 encoding
            const imageData = await readFileAsync(imageFilePath, { encoding: 'base64' });  // Reading image file as base64
            colorPalette = await axios.post('https://localhost:5000/analyze-color', {  // Sending a POST request with base64 encoded image data to the Flask service
                image: imageData,
            });
        }
        
        res.json(colorPalette);  // Sending the color palette as a JSON response
    } catch (error) {
        console.error("Error handling image upload:", error);  // Logging an error if there's an error handling image upload
        res.status(500).send("Failed to analyze colors");  // Sending an error response with status code 500
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  // Logging a message indicating that the server is running
});
