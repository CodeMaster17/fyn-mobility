
import './App.css'
import ImageGallery from './components/ImageGallery'
import Input from './components/Input'
import SortableList from './components/SortableList'

function App() {

  return (
    <main className='main'>
      <p className='heading'>Fyn Mobility Assignment</p>
      <p className='heading'>Task 1</p>
      <Input />
      <SortableList />
      <p className='heading'>Task 2</p>
      <ImageGallery />
    </main>
  )
}

export default App
