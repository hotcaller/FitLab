import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'


// React strict mode
createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <App />

  </MantineProvider>

)
