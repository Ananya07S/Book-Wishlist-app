import { useState, useEffect } from "react";
import axios from "axios";

function Wishlist({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await axios.get("/api/books");
    setBooks(data);
  };

  const addBook = async (e) => {
    e.preventDefault();
    if (!title || !author) return;

    const { data } = await axios.post("/api/books", { title, author });
    setBooks(data);
    setTitle("");
    setAuthor("");
  };

  const deleteBook = async (id) => {
    const { data } = await axios.delete(`/api/books/${id}`);
    setBooks(data);
  };

  return (
    <div className="page" style={{ textAlign: "left" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: "40px", borderRadius: "50%" }}
          />
          <span>{user.name}</span>
        </div>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <h1>📚 My Book Wishlist</h1>

      <form onSubmit={addBook} style={{ marginBottom: "20px" }}>
        <input
          className="input"
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="btn" type="submit">
          Add Book
        </button>
      </form>

      {books.map((book) => (
        <div key={book._id} className="card">
          <div>
            <strong>{book.title}</strong>
            <div style={{ color: "#6b7280" }}>by {book.author}</div>
          </div>
          <button className="btn btn-danger" onClick={() => deleteBook(book._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
