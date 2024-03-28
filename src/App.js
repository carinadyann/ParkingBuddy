import React from 'react';

// Define the Navbar component
function Navbar() {
  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px 20px' }}>
      <h1>App Name</h1>
      <div>
        <a href="/" style={{ color: 'white', marginLeft: '15px', textDecoration: 'none' }}>Home</a>
        {/* Add more navigation links as needed */}
      </div>
    </nav>
  );
}

// Define the Home component
function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Welcome to Our App!</h2>
      <p>This is a simple home screen for your React app.</p>
      {/* Add more content here as needed */}
    </div>
  );
}

// Main App component that includes the Navbar and Home components
function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
