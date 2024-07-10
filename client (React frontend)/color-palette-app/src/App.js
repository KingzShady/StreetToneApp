// Importing React and useState hook
import React, { useState } from 'react';

// Importing CSS file for styling
import './App.css';

// Importing ColorPalette component for displaying color palette suggestions
import ColorPalette from './ColorPalette';

function App() {
  // Initializing state to store selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Initializing state to store selected color palette suggestions
  const [selectedFilter, setSelectedFilter] = useState('');

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

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    // Logic to filter color palettes based on selected filter
  };

  return (
    <div className="App"> {/* Main container */}
      <h1>Color Palette Recommendation App</h1> {/* Heading */}
      <input type="file" accept="image/*" onChange={handleImageUpload} /> {/* File input for image upload */}
      {selectedImage && ( // Conditional rendering: display image preview if an image is selected
        <div>
          <h2>Uploaded Image Preview:</h2> {/* Subheading */}
          <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%' }} /> {/* Image preview */}
          <label htmlFor="filter">Select Filter:</label> {/* Label for filter dropdown */}
          <select id="filter" value={selectedFilter} onChange={handleFilterChange}> {/* Dropdown for filter options based on season; updates state on change  */}
            <option value="">All</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
          </select>
        </div>
      )}
      <ColorPalette colors={['#FF5733', '#33FF57', '#3366FF', '#FF33AA']} />
    </div>
  );
}

// Exporting the App component
export default App;  
