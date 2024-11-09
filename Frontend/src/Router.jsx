import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx"
import Homepage from "./components/Homepage.jsx"
import Login from "./components/Login.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import CreateChange from "./components/Dashboard/CreateChange.jsx"
import Community from "./components/Dashboard/Community.jsx"
import MyChanges from "./components/Dashboard/MyChanges.jsx"
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx"
import AdminLayout from "./components/AdminDashboard/AdminLayout.jsx"
import CreateBill from "./components/AdminDashboard/CreateBill.jsx"
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/create" element={<CreateChange/>} />
                <Route path="/dashboard/community" element={<Community/>} />
                <Route path="/dashboard/changes" element={<MyChanges/>} />
            </Route>
            <Route element={<AdminLayout/>}>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/admin/create" element={<CreateBill/>} />
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
        </>
    )
);


export default router