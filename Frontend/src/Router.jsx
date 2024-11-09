import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx"
import Homepage from "./components/Homepage.jsx"
import Login from "./components/Login.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import CreateChange from "./components/Dashboard/CreateChange.jsx"
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
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
        </>
    )
);


export default router