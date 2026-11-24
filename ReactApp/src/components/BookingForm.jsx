function BookingForm({
  matches,
  selectedMatch,
  setSelectedMatch,
  stand,
  setStand,
  quantity,
  setQuantity,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onSubmit
}) {
  const currentMatch = matches.find(
    (match) => match.id === Number(selectedMatch)
  );

  const price = currentMatch
    ? currentMatch.prices[stand]
    : 0;

  const total = price * Number(quantity);

  return (
    <section className="booking-section" id="booking">
      <h2>Book Your IPL Tickets</h2>

      <p className="section-description">
        Fill in your details to book your favourite match.
      </p>

      <form className="booking-form" onSubmit={onSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          placeholder="10-digit phone number"
          pattern="[0-9]{10}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="match">Select Match</label>
        <select
          id="match"
          value={selectedMatch}
          onChange={(e) => setSelectedMatch(e.target.value)}
          required
        >
          <option value="">Choose a match</option>

          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.team1} vs {match.team2}
            </option>
          ))}
        </select>

        <label htmlFor="stand">Stand Category</label>
        <select
          id="stand"
          value={stand}
          onChange={(e) => setStand(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>

        <label htmlFor="quantity">Number of Tickets</label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <div className="booking-summary">
          <h3>Booking Summary</h3>

          <p>
            <strong>Match:</strong>{" "}
            {currentMatch
              ? `${currentMatch.team1} vs ${currentMatch.team2}`
              : "Not selected"}
          </p>

          <p><strong>Stand:</strong> {stand}</p>
          <p><strong>Price per ticket:</strong> ₹{price}</p>
          <p><strong>Quantity:</strong> {quantity}</p>

          <p className="total-price">
            Total Amount: ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          type="submit"
          className="primary-btn confirm-btn"
          disabled={!currentMatch}
        >
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

export default BookingForm;