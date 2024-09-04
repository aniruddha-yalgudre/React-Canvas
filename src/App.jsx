import React from 'react'
import Canvas from './Canvas'

function App() {
  return (
    <div className=' w-full bg-zinc-900  '>
          <Canvas/>
          <div className='bg-gray-950 w-full h-screen'></div>
          <div className='bg-white w-full h-screen'></div>
    </div>
  )
}

export default App