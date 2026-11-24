function MatchCard({ match, onBook }) {
  return (
    <div className="match-card">
      <span className="match-label">IPL 2026</span>

      <div className="teams">
        <h3>{match.team1}</h3>
        <span className="vs">VS</span>
        <h3>{match.team2}</h3>
      </div>

      <div className="match-details">
        <p><strong>Date:</strong> {match.date}</p>
        <p><strong>Time:</strong> {match.time}</p>
        <p><strong>Venue:</strong> {match.venue}</p>
      </div>

      <p className="match-price">
        Starting from ₹{match.prices.General}
      </p>

      <button
        className="primary-btn"
        onClick={() => onBook(match.id)}
      >
        Book Tickets
      </button>
    </div>
  );
}

export default MatchCard;