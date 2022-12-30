import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import { QueryClientProvider, QueryClient } from "react-query"

import IndexPage from '@page/IndexPage'
import SecondPage from '@page/SecondPage'
import AboutPage from "@page/AboutPage"

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  useEffect(() => { 
    console.log('%c   🎄🎄❄️⛄️🤶 Merry Christmas 🎅⛄️❄️🎄🎄   ', 'background: #1d2d44; color: #29bf12');
    console.log('%c   🎄 20110580 - Nguyễn Thị Thùy Trang  🎄   ', 'background: #1d2d44; color: #29bf12');
    console.log('%c   🎄 20110135 - Lê Thị Thanh Tuyết     🎄   ', 'background: #1d2d44; color: #29bf12');
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<IndexPage/>}/>
              <Route path="/characters" element={<IndexPage/>}/>
              <Route path="/digits" element={<SecondPage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
            </Routes>
          </AnimatePresence>
        </Router>
      </QueryClientProvider>
    </>
  )
}