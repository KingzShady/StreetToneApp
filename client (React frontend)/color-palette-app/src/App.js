// Importing React and useState hook
import React, { useState } from 'react';

// Importing CSS file for styling
import './App.css';

function App() {
  // Initializing state to store selected image
  const [selectedImage, setSelectedImage] = useState(null);  

  // Function to handle image upload
  const handleImageUpload = (event) => {
    // Getting the selected file
    const file = event.target.files[0];

    if (file) {
      // Creating a new FileReader instance
      const reader = new FileReader();

      reader.onload = () => {
        // Setting the selected image in state
        setSelectedImage(reader.result);
      };
      // Reading the selected file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">  {/* Main container */}
      <h1>Color Palette Recommendation App</h1>  {/* Heading */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />  {/* File input for image upload */}
      {selectedImage && (  // Conditional rendering: display image preview if an image is selected
        <div>
          <h2>Uploaded Image Preview:</h2>  {/* Subheading */}
          <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />  {/* Image preview */}
        </div>
      )}
    </div>
  );
}

// Exporting the App component
export default App;  
