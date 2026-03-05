import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './movieSearch.css'
import { MovieSearch } from './MovieSearch'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieSearch />
  </StrictMode>,
)
