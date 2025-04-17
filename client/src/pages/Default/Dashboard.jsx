import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"; // Assuming your auth hook is here

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user information from context or hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/api/book/all");
        if (res.data && Array.isArray(res.data.allbooks)) {
          setBooks(res.data.allbooks);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error(err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh", // Ensure it takes up full screen height
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient background
        color: "black", // Change text color to black
        display: "flex", // Flexbox for layout
        flexDirection: "column", // Stack content vertically
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        padding: "0",
      }}
    >
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome, {user?.name || "Guest"}!</h1>
        <p className="lead">
          {user ? `Here are your available books, ${user?.name}` : "Please log in to access your dashboard."}
        </p>
      </div>

      {/* User Details */}
      {user && (
        <div className="mb-4">
          <h4>Your Details</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* Available Books */}
      <h2 className="mb-4">Available Books!</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="row">
          {books.length === 0 ? (
            <p className="text-center text-muted">No books available yet.</p>
          ) : (
            books.map((book) => (
              <div key={book._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={book.coverImage || "https://via.placeholder.com/300x200?text=No+Cover"}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author || "Unknown"}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/books/${book._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
