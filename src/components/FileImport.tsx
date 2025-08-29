interface FileImportProps {
  onDataLoaded: (data: any) => void
}

const FileImport = ({ onDataLoaded }: FileImportProps) => {
  const handleFileImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            onDataLoaded(data)
            console.log('Design loaded:', data)
          } catch (error) {
            console.error('Error parsing JSON:', error)
            alert('Error parsing JSON file. Please check the file format.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <button 
      className="top-bar-button"
      onClick={handleFileImport}
    >
      Import JSON
    </button>
  )
}

export default FileImport