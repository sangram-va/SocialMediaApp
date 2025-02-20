import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'

const App = ({Children}) => {
  return (
    <RouterProvider router={router}>{Children}</RouterProvider>
  )
}

export default App