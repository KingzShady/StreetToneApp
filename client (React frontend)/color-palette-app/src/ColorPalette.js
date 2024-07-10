import React from 'react';

// Functional component that renders a color palette and customization controls
function ColorPalette({ colors }) {
  return (
    <div className="color-palette"> {/* Container for the color palette */}
      {/* Map through the 'colors' array and render each color as a <div> */}
      {colors.map((color, index) => (
        <div 
          key={index}  // Unique key for each color div to help React identify changes
          className="color"  // CSS class for styling individual color swatches
          style={{ backgroundColor: color }}  // Inline style to set the background color
        ></div>
      ))}
      <div className="customization"> {/* Container for customization controls */}
        <label htmlFor="hue">Hue:</label> {/* Label for the hue range input */}
        <input 
          type="range" 
          id="hue" 
          min="0" 
          max="360" 
          defaultValue="0" 
        /> {/* Slider for adjusting hue, with a range from 0 to 360 */}
        
        <label htmlFor="saturation">Saturation:</label> {/* Label for the saturation range input */}
        <input 
          type="range" 
          id="saturation" 
          min="0" 
          max="100" 
          defaultValue="100" 
        /> {/* Slider for adjusting saturation, with a range from 0 to 100 */}
        
        <label htmlFor="brightness">Brightness:</label> {/* Label for the brightness range input */}
        <input 
          type="range" 
          id="brightness" 
          min="0" 
          max="100" 
          defaultValue="100" 
        /> {/* Slider for adjusting brightness, with a range from 0 to 100 */}
      </div>
    </div>
  );
}

export default ColorPalette;  // Export the component for use in other parts of the application
