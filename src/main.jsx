import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Resources from './pages/Resources.jsx'
import About from './pages/About.jsx'
import FindHome from './pages/FindHome.jsx'
import HomeDetail from './pages/HomeDetail.jsx'
import Profile from './pages/Profile.jsx'
import DecisionMatrixPage from './pages/DecisionMatrixPage.jsx'
import ZipCode from './pages/ZipCode.jsx'
import Mortage from './pages/Mortage.jsx'
import InterestRate from './pages/InterestRate.jsx'
import Insurance from './pages/Insurance.jsx'
import MovingIn from './pages/MovingIn.jsx'
import Test from './pages/test.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test",
    element: <Test />, 
  },
  {
    path: "resources",
    element: <Resources />,
  },
  {
    path: "findHome/:zipCodes/:city/:state",
    element: <FindHome />
  },
  {
    path: "about",
    element: <About />, 
  },
  {
    path: "homeDetail",
    element: <HomeDetail />
  },
  {
    path: "profile",
    element: <Profile />
  },
  {
    path: "DecisionMatrixPage/:price/:walkscore",
    element: <DecisionMatrixPage />
  },
  {
    path: "zipCode",
    element: <ZipCode />
  },
  {
    path: "mortage",
    element: <Mortage />
  },
  {
    path: "InterestRate",
    element: <InterestRate />
  },
  {
    path: "insurance",
    element: <Insurance />
  },
  {
    path: "movingIn",
    element: <MovingIn />

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)