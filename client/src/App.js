
import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import Home from "./pages/Default/Home";
import Login from "./pages/Auth/Login";
import Rigister from "./pages/Auth/Register";
import Dashboard from "./pages/Default/Dashboard";
import NotFound from "./pages/Default/NotFound";
import Menu from "./Component/Menu";
import ProtectedRoute from "./AuthGuard/ProtectRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import useAuth from "./Hooks/useAuth";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import BookList from "./Book/bookList";



function App() {
  const {user}=useAuth()
  return (
  <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={4000} position="top-right"/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Rigister />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route  element={<ProtectedRoute/>}>
            <Route path={"/dashboard/:role"} element={user?.role==="admin" ?<AdminDashboard/> :<Dashboard />} />

          </Route>

          {/* import BookList from "./pages/Book/BookList"; */}

          {/* <Route path="/booksDetails" element={<BookList />} /> */}
          <Route path="/books/:id" element={<BookList /> } />

      
          <Route path="*" element={<NotFound />} />
        </Routes>


  </BrowserRouter>
  );
}

export default App;
