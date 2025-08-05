import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Navbar from "./Boilerplate/Navbar.jsx";
import Footer from "./Boilerplate/Footer.jsx";
import HomePage from './Home/HomePage';
import AboutPage from './About/AboutPage';
import ExplorePage from "./Explore/ExplorePage";
import LoginPage from "./Login/LoginPage.jsx";
import Signup from "./Login/Signup.jsx";
import SearchPage from "./Search/SearchPage.jsx";
import CommunityPage from "./Community/CommunityPage.jsx";
import ContributePage from "./Contribute/ContributePage.jsx";
import EditResource from "./Edit/EditResource.jsx";
import ReportIssue from "./Others/ReportIssue.jsx";
import Help from "./Others/help.jsx";
import Privacy from "./Others/privacy.jsx";
import Terms from "./Others/terms.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ResourceDetails from "./Show/ResourceDetails.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  return(
    <Router>
      <Navbar/>
         <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
         <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/contribute" element={<PrivateRoute><ContributePage/></PrivateRoute>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/find/:id" element={<ResourceDetails/>}/>
        <Route path="/edit/:id" element={<EditResource />} />
        <Route path="/community" element={<CommunityPage/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/report" element={<ReportIssue/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
