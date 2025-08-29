interface CanvasControlsProps {
  is2DMode: boolean
  onToggle2D: (mode: boolean) => void
}

const CanvasControls = ({ is2DMode, onToggle2D }: CanvasControlsProps) => {
  return (
    <div className="canvas-controls">
      {/* Camera Mode Toggle */}
      <div className="camera-toggle">
        <button 
          className={`toggle-button ${!is2DMode ? 'active' : ''}`}
          onClick={() => onToggle2D(false)}
        >
          3D
        </button>
        <button 
          className={`toggle-button ${is2DMode ? 'active' : ''}`}
          onClick={() => onToggle2D(true)}
        >
          2D
        </button>
      </div>
    </div>
  )
}

export default CanvasControls