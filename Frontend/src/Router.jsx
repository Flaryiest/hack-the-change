import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import Solution from "./components/Solution.jsx";
import Mission from "./components/Mission.jsx";

import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import CreateChange from "./components/Dashboard/CreateChange.jsx";
import Community from "./components/Dashboard/Community.jsx";
import MyChanges from "./components/Dashboard/MyChanges.jsx";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import AdminLayout from "./components/AdminDashboard/AdminLayout.jsx";
import CreateBill from "./components/AdminDashboard/CreateBill.jsx";
import Bills from "./components/AdminDashboard/Bills.jsx";
import Feedback from "./components/AdminDashboard/Feedback.jsx";
import BillResponse from "./components/Dashboard/BillResponse.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<Layout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/solution" element={<Solution />} />
            </Route>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard/:userid" element={<Dashboard />} />
                <Route path="/dashboard/:userid/create" element={<CreateChange />} />
                <Route path="/dashboard/:userid/community" element={<Community />} />
                <Route path="/dashboard/:userid/changes" element={<MyChanges />} />
                <Route path="/dashboard/:userid/bills" element={<BillResponse />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin/:userid" element={<AdminDashboard />} />
                <Route path="/admin/:userid/create" element={<CreateBill />} />
                <Route path="/admin/:userid/feedback" element={<Feedback />} />
                <Route path="/admin/:userid/bills" element={<Bills />} />
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
        </>
    )
)

export default router
