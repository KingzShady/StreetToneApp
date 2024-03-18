const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 3000;

// Endpoint to handle image uploads from the frontend
app.post('/submit-image', upload.single('image'), async (req, res) =>{
    try{
        const imageFilePath = req.file.path;
        const response = await axios.post('http://localhost:5000/analyze-color',{
            image: imageFilePath, // Adjust based on how i will handle file transfer
        });
        const colorPalette = response.data;
        res.json(colorPalette);
    } catch (error){
        console.error("Error calling the color analysis service:", error);
        res.status(500).send("Failed to analyze colors");
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
})
