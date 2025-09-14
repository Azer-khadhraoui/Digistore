import React, { useState } from 'react';

const ColorTester: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  
  const testColors = [
    '#10b981', // Vert
    '#f59e0b', // Orange 
    '#8b5cf6', // Violet
    '#ef4444', // Rouge
    '#06b6d4', // Cyan
    '#84cc16', // Lime
  ];

  const applyColor = (color: string) => {
    setPrimaryColor(color);
    // Appliquer la couleur au CSS
    document.documentElement.style.setProperty('--primary-color', color);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '100px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000 
    }}>
      <h3>Testeur de couleurs</h3>
      <p>Couleur actuelle: {primaryColor}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {testColors.map(color => (
          <button
            key={color}
            onClick={() => applyColor(color)}
            style={{
              backgroundColor: color,
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorTester;
