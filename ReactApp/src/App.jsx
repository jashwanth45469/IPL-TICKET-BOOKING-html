import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import BookingForm from "./components/BookingForm";

import "./App.css";

const matches = [
  {
    id: 1,
    team1: "RCB",
    team2: "CSK",
    date: "10 April 2026",
    time: "7:30 PM",
    venue: "Bengaluru",
    prices: { General: 800, Premium: 2000, VIP: 5000 }
  },
  {
    id: 2,
    team1: "MI",
    team2: "KKR",
    date: "12 April 2026",
    time: "7:30 PM",
    venue: "Mumbai",
    prices: { General: 900, Premium: 2200, VIP: 5500 }
  },
  {
    id: 3,
    team1: "SRH",
    team2: "RCB",
    date: "15 April 2026",
    time: "7:30 PM",
    venue: "Hyderabad",
    prices: { General: 750, Premium: 1800, VIP: 4500 }
  },
  {
    id: 4,
    team1: "CSK",
    team2: "MI",
    date: "18 April 2026",
    time: "7:30 PM",
    venue: "Chennai",
    prices: { General: 800, Premium: 2000, VIP: 5000 }
  }
];

function App() {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [stand, setStand] = useState("General");
  const [quantity, setQuantity] = useState("1");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [teamFilter, setTeamFilter] = useState("All");
  const [view, setView] = useState("grid");

  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("iplBookings")) || [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("iplBookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  const filteredMatches = matches.filter((match) => {
    return (
      teamFilter === "All" ||
      match.team1 === teamFilter ||
      match.team2 === teamFilter
    );
  });

  function handleBook(matchId) {
    setSelectedMatch(String(matchId));

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth"
    });

    setToast("Match selected! Complete your booking.");
  }

  function handleBooking(event) {
    event.preventDefault();

    const match = matches.find(
      (item) => item.id === Number(selectedMatch)
    );

    if (!match) {
      setToast("Please select a match.");
      return;
    }

    const ticketCount = Number(quantity);

    if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 10) {
      setToast("Please select between 1 and 10 tickets.");
      return;
    }

    const price = match.prices[stand];
    const total = price * ticketCount;

    const newBooking = {
      id: Date.now(),
      name,
      email,
      phone,
      match: `${match.team1} vs ${match.team2}`,
      stand,
      quantity: ticketCount,
      total
    };

    setBookings((previous) => [...previous, newBooking]);

    setToast("Booking confirmed successfully!");

    setSelectedMatch("");
    setStand("General");
    setQuantity("1");
    setName("");
    setEmail("");
    setPhone("");
  }

  function cancelBooking(id) {
    setBookings((previous) =>
      previous.filter((booking) => booking.id !== id)
    );

    setToast("Booking removed.");
  }

  return (
    <>
      <Navbar />

      <Hero />

      <main>
        <section className="matches-section" id="matches">
          <h2>Upcoming IPL Matches</h2>

          <p className="section-description">
            Select your favourite match and book your tickets.
          </p>

          <div className="match-controls">
            <div className="filter-section">
              <label htmlFor="teamFilter">Filter by team:</label>

              <select
                id="teamFilter"
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
              >
                <option value="All">All Teams</option>
                <option value="RCB">RCB</option>
                <option value="CSK">CSK</option>
                <option value="MI">MI</option>
                <option value="KKR">KKR</option>
                <option value="SRH">SRH</option>
              </select>
            </div>

            <div className="view-controls">
              <button
                className={view === "grid" ? "view-btn active" : "view-btn"}
                onClick={() => setView("grid")}
              >
                Grid View
              </button>

              <button
                className={view === "list" ? "view-btn active" : "view-btn"}
                onClick={() => setView("list")}
              >
                List View
              </button>
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "match-container"
                : "match-container list-view"
            }
          >
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onBook={handleBook}
                />
              ))
            ) : (
              <p className="no-matches">No matches found.</p>
            )}
          </div>
        </section>

        <BookingForm
          matches={matches}
          selectedMatch={selectedMatch}
          setSelectedMatch={setSelectedMatch}
          stand={stand}
          setStand={setStand}
          quantity={quantity}
          setQuantity={setQuantity}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          onSubmit={handleBooking}
        />

        <section className="my-bookings" id="my-bookings">
          <h2>My Bookings</h2>

          <p className="section-description">
            View and manage your ticket bookings.
          </p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Match</th>
                  <th>Stand</th>
                  <th>Tickets</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.name}</td>
                      <td>{booking.match}</td>
                      <td>{booking.stand}</td>
                      <td>{booking.quantity}</td>
                      <td>
                        ₹{booking.total.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No bookings yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="guidelines" id="guidelines">
          <h2>Booking Guidelines</h2>

          <div className="guidelines-grid">
            <div className="guideline-card">
              <h3>Online Booking</h3>
              <p>
                Enter your details and select your preferred match
                to complete the sample booking.
              </p>
            </div>

            <div className="guideline-card">
              <h3>Ticket Quantity</h3>
              <p>
                You can select a minimum of 1 and a maximum of
                10 tickets per booking.
              </p>
            </div>

            <div className="guideline-card">
              <h3>Booking Details</h3>
              <p>
                Check your selected match, stand category and
                total amount before confirming.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 IPL Ticket Booking. Made for Cricket Fans ❤️</p>
      </footer>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
}

export default App;