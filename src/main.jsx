import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Welcome from './Welcome'
import AddListing from './components/AddListing'
import Profile from './components/Profile'
import { Toaster } from "@/components/ui/sonner"
import SearchByCategory from './components/search/[category]'
import SearchByOptions from './components/search/index'
import ListingDetails from './listing-details/[id]'



const supabase = createClient("https://hbxlzwxelbguiyetoyub.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieGx6d3hlbGJndWl5ZXRveXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1Mjg5NDIsImV4cCI6MjA0ODEwNDk0Mn0.SMitNRMgWFZw4_9K-ShWbp3VCT9KiJXszZ3RshGXa8Y")

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '/profile',
    element: <Profile />

  },
  {
    path: '/add-listing',
    element: <AddListing />
  },
  {
    path: '/search',
    element: <SearchByOptions />
  },

  {
    path: '/search/:category',
    element: <SearchByCategory />
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetails />
  }


])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <RouterProvider router={router} />
      <Toaster />

    </SessionContextProvider>

  </StrictMode>,
)
