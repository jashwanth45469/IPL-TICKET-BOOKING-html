import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <a href="#home" className="logo" onClick={closeMenu}>
        IPL 2026
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={menuOpen ? "nav-links show" : "nav-links"}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#matches" onClick={closeMenu}>Matches</a>
        <a href="#booking" onClick={closeMenu}>Book Tickets</a>
        <a href="#my-bookings" onClick={closeMenu}>My Bookings</a>
        <a href="#guidelines" onClick={closeMenu}>Guidelines</a>
      </nav>
    </header>
  );
}

export default Navbar;