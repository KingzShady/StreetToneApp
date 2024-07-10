// Importing React library
import React from 'react';

/*Function doing the following:
- Container for color palette
- Mapping over colors array
- Rendering a div for each color
*/ 
function ColorPalette({ colors }) {
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div key={index} className="color" style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
}

// Exporting the ColorPalette component
export default ColorPalette;
