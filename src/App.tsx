import { useState } from 'react'
import Canvas3D from './components/Canvas3D'
import './App.css'

function App() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="app">
      {/* Top Bar - Fixed */}
      <div className="top-bar">
        <button className="top-bar-button inactive">
          Import JSON
        </button>
        <button 
          className="top-bar-button inactive"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          Show Design Details
        </button>
        <button className="top-bar-button inactive">
          Show Comments
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* 3D Canvas */}
        <div className="canvas-container">
          <Canvas3D />
        </div>

        {/* Right Sidebar - Hidden by default */}
        {showSidebar && (
          <div className="right-sidebar">
            <div className="sidebar-header">
              <h3>Design Details</h3>
              <button 
                className="close-button"
                onClick={() => setShowSidebar(false)}
              >
                ×
              </button>
            </div>
            <div className="sidebar-content">
              <p>Design details will appear here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App