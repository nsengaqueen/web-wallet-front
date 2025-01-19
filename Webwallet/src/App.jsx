import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import DashLayout from './Dashboard/DashLayout';
import Dashboardindex from './Dashboard/Dashboardindex';
import Dashboard from './Dashboard/Dashboard';
import TrancstionDash from './Dashboard/TrancstionDash';
import Category from './Dashboard/Category';
import Report from './Dashboard/Report';
import Settting from './Dashboard/Settting';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
    <Route index element={<Welcome />} />
    </Route>
    <Route path="/login" element={<Login />} />


   <Route  path='/'element={<DashLayout/>}>
   <Route index element={<Dashboardindex/>}/>
    <Route path='/dashboard'element={<Dashboard/>}/>
    <Route path='/reports' element={<Report/>}/>
     <Route path='/transactionss'element={<TrancstionDash/>}/>
     <Route path='/categories'element={<Category/>}/>
     <Route path='/settings'element={<Settting/>}/>
   </Route>
    </Routes>
    </BrowserRouter>
       
    </>
  )
}

export default App