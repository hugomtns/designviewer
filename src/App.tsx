import { useState } from 'react'
import Canvas3D from './components/Canvas3D'
import CanvasControls from './components/CanvasControls'
import FileImport from './components/FileImport'
import './App.css'

function App() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [is2DMode, setIs2DMode] = useState(false)
  const [designData, setDesignData] = useState<any>(null)

  return (
    <div className="app">
      {/* Top Bar - Fixed */}
      <div className="top-bar">
        <FileImport onDataLoaded={setDesignData} />
        <button 
          className={`top-bar-button ${designData ? '' : 'inactive'}`}
          onClick={() => setShowSidebar(!showSidebar)}
          disabled={!designData}
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
          <Canvas3D is2DMode={is2DMode} />
          <CanvasControls 
            is2DMode={is2DMode} 
            onToggle2D={setIs2DMode} 
          />
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
              {designData ? (
                <div>
                  <h4>Design Statistics</h4>
                  <p><strong>Units:</strong> {designData.Units}</p>
                  <p><strong>Total Frames:</strong> {designData.Layout?.Frames ? Object.keys(designData.Layout.Frames).length : 'N/A'}</p>
                  <p><strong>Models:</strong> {designData.Models?.length || 'N/A'}</p>
                  {designData.Statistics && (
                    <>
                      <h4>Statistics</h4>
                      <pre>{JSON.stringify(designData.Statistics, null, 2)}</pre>
                    </>
                  )}
                </div>
              ) : (
                <p>Import a JSON file to see design details...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App