import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import CustomCursor from './utilities/CustomCursor.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
