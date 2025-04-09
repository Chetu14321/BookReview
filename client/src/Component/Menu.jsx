import React from "react";
import { NavLink,  useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

 export default function Menu(){
    const {isLogin,setIsLogin ,setToken}=useAuth()
    const Navigate=useNavigate()




    const LogoutHandler= async()=>{
        if(window.confirm("Are you sure to Logour")){
            await axios.get(`/api/auth/logout`)
            .then(res=>{
               
                toast.success(res.data.msg)
                setIsLogin(false)
                setToken(false)
                Navigate(`/`)
            }).catch(err=>{toast.error(err.response.data.msg)})
        }else{
            toast.warning("Logout failed")
        }

    }
    return (
       <>
        <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
         <div className="container">
            <NavLink to={'/'}>Auth</NavLink> 

            <button className="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#menu" >
                <span className="navbar-toggler-icon"></span>
            </button>
            
            </div>   
        </nav>

        <div className="offcanvas offcanvas-end" id="menu">
            <div className="offcanvas-header">
                <h3 className="offcanvas-title">Auth</h3>
                <button className="btn-close"data-bs-dismiss="offcanvas"></button>
            </div>
       

        <div className="offcanvas-body">
            <div className="card">
                <div className="card-body">
                    <ul className="nav flex-column nav-pills text-center">
                        <li className="nav-item">
                            <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                  {
                    isLogin ?(
                        <ul className="nav nav-pills flex-column text-center">
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className={'nav-link'}>Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={()=>LogoutHandler()} className={'nav-link btn-danger'}>Logout</NavLink>
                        </li>
                    </ul>
                    ):(
                        <ul className="nav nav-pills flex-column text-center">
                        <li className="nav-item">
                            <NavLink to={'/login'} className={'nav-link'}>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/register'} className={'nav-link'}>Register</NavLink>
                        </li>
                    </ul>
                    )
                  }
                </div>
            </div>
        </div>
        </div>

       
       
       
       </>
      
       
    )
}