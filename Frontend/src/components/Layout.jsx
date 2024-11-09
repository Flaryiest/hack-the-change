import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import { useState, useEffect } from "react"
export default function Layout() {
    
    return <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
}