import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Homepage from "./components/Homepage.jsx"
import Login from "./components/Login.jsx"
import Solution from "./components/Solution.jsx"
import Mission from "./components/Mission.jsx"

import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import CreateChange from "./components/Dashboard/CreateChange.jsx"
import Community from "./components/Dashboard/Community.jsx"
import MyChanges from "./components/Dashboard/MyChanges.jsx"

import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx"
import AdminLayout from "./components/AdminDashboard/AdminLayout.jsx"
import CreateBill from "./components/AdminDashboard/CreateBill.jsx"
import Bills from "./components/AdminDashboard/Bills.jsx"
import Feedback from "./components/AdminDashboard/Feedback.jsx"
import BillResponse from "./components/Dashboard/BillResponse.jsx"
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mission" element={<Mission/>} />
                <Route path="/solution" element={<Solution/>} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/create" element={<CreateChange/>} />
                <Route path="/dashboard/community" element={<Community/>} />
                <Route path="/dashboard/changes" element={<MyChanges/>} />
                <Route path="/dashboard/bills" element={<BillResponse/>} />
            </Route>
            <Route element={<AdminLayout/>}>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/admin/create" element={<CreateBill/>} />
                <Route path="/admin/feedback" element={<Feedback/>} />
                <Route path="/admin/bills" element={<Bills/>} />

            </Route>
            <Route path="*" element={<div>Not Found</div>} />
        </>
    )
);


export default router