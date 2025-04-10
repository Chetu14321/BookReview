import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 text-primary">Welcome to AuthApp</h1>
          <p className="lead text-muted">
            A modern authentication system with security and simplicity in mind.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-secondary">
              Login
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <img
            src="https://cdn.dribbble.com/users/1022486/screenshots/6225042/authentication.gif"
            className="img-fluid rounded shadow"
            alt="Authentication"
          />
        </div>
      </div>
    </div>
  );
}
