import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set dark mode by default for professional real estate theme
document.documentElement.classList.add('dark')

createRoot(document.getElementById("root")!).render(<App />);
