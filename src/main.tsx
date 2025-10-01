import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { preloadEarth } from './three-preload'

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
  <StrictMode>
    {preloadEarth()}
    <Suspense fallback={<div className="text-white p-8">Loading…</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)

