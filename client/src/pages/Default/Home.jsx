import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"; // Assuming your auth hook is here

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // your auth hook should provide user info

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

  const handleViewDetails = (bookId) => {
    if (!user) {
      alert("Please login to view book details.");
      navigate("/login");
    } else {
      navigate(`/books/${bookId}`);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary">📚 Book Management System</h1>
        <p className="lead text-muted">Discover and explore your favorite books.</p>
      </div>

      <h2 className="mb-4">Featured Books</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {/** Book Cover Image */}
                <img
                  src={book.coverImage || "https://via.placeholder.com/300x200?text=No+Cover"}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author || "Unknown"}</p>
                  <button
                    className="btn btn-sm btn-primary mt-auto"
                    onClick={() => handleViewDetails(book._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
