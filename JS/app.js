
// =====================================
// IPL 2026 MATCH DATA
// =====================================

const matches = {
    1: {
        name: "RCB vs CSK",
        prices: {
            General: 800,
            Premium: 2000,
            VIP: 5000
        }
    },

    2: {
        name: "MI vs KKR",
        prices: {
            General: 900,
            Premium: 2200,
            VIP: 5500
        }
    },

    3: {
        name: "SRH vs RCB",
        prices: {
            General: 750,
            Premium: 1800,
            VIP: 4500
        }
    },

    4: {
        name: "CSK vs MI",
        prices: {
            General: 800,
            Premium: 2000,
            VIP: 5000
        }
    }
};


// =====================================
// ACTIVITY 5: TOAST NOTIFICATION
// =====================================

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);

}


// =====================================
// ACTIVITY 5: SMOOTH SCROLLING
// =====================================

function smoothScrollToBooking() {

    const bookingSection = document.getElementById("booking");

    if (bookingSection) {

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =====================================
// ACTIVITY 7: LIVE BOOKING SUMMARY
// =====================================

function updateSummary() {

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.getElementById("quantity");

    const matchId = matchSelect.value;
    const stand = standSelect.value;

    const quantity = Math.min(
        10,
        Math.max(1, Number(quantityInput.value) || 1)
    );

    let matchName = "Not Selected";
    let price = 0;

    if (matches[matchId]) {

        matchName = matches[matchId].name;

        if (stand) {
            price = matches[matchId].prices[stand] || 0;
        }

    }

    const total = price * quantity;

    document.getElementById("summaryMatch").innerText = matchName;

    document.getElementById("summaryStand").innerText =
        stand || "Not Selected";

    document.getElementById("price").innerText = price;

    document.getElementById("summaryQuantity").innerText = quantity;

    document.getElementById("total").innerText = total;

    const summary = document.getElementById("summary");

    summary.classList.remove("updated");

    void summary.offsetWidth;

    summary.classList.add("updated");

}


// =====================================
// ACTIVITY 8: TEAM FILTER
// =====================================

function filterMatches() {

    const selectedTeam =
        document.getElementById("teamFilter").value;

    const matchCards =
        document.querySelectorAll(".match-card");

    let visibleCount = 0;

    matchCards.forEach(function (card) {

        const teams = card.dataset.teams.split(" ");

        if (
            selectedTeam === "all" ||
            teams.includes(selectedTeam)
        ) {

            card.classList.remove("hidden");
            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });

    document.getElementById("noMatches").hidden =
        visibleCount !== 0;

}


// =====================================
// ACTIVITY 8: GRID AND LIST VIEW
// =====================================

function setView(view) {

    const matchContainer =
        document.getElementById("matchContainer");

    const gridButton =
        document.getElementById("gridView");

    const listButton =
        document.getElementById("listView");

    if (view === "grid") {

        matchContainer.classList.remove("list-view");

        gridButton.classList.add("active");
        listButton.classList.remove("active");

    } else {

        matchContainer.classList.add("list-view");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

    }

}


// =====================================
// ACTIVITY 8: HAMBURGER MENU
// =====================================

function toggleMenu() {

    const nav = document.getElementById("mainNav");

    const hamburger =
        document.getElementById("hamburger");

    const isOpen = nav.classList.toggle("show");

    hamburger.setAttribute("aria-expanded", isOpen);

    hamburger.innerText = isOpen ? "✕" : "☰";

}


// =====================================
// SELECT MATCH FUNCTION
// =====================================

function selectMatch(id) {

    document.getElementById("match").value = id;

    updateSummary();

    smoothScrollToBooking();

    showToast("Match Selected Successfully!");

}


// =====================================
// ACTIVITY 7: CONFIRM BOOKING
// =====================================

function bookTicket(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const matchId =
        document.getElementById("match").value;

    const stand =
        document.getElementById("stand").value;

    const quantity =
        Number(document.getElementById("quantity").value);

    if (!matches[matchId] || !matches[matchId].prices[stand]) {

        showToast("Please select a valid match and stand.");

        return;

    }

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {

        showToast("Please enter between 1 and 10 tickets.");

        return;

    }

    const matchName = matches[matchId].name;

    const price = matches[matchId].prices[stand];

    const total = price * quantity;

    const table =
        document.getElementById("bookingRecords");

    // Remove the default empty booking row.

    if (
        table.rows.length === 1 &&
        table.rows[0].cells.length === 1
    ) {

        table.innerHTML = "";

    }

    // Add the new booking record.

    const row = table.insertRow();

    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = matchName;
    row.insertCell(2).innerText = stand;
    row.insertCell(3).innerText = quantity;
    row.insertCell(4).innerText = "₹" + total;

    // Update booking status.

    document.getElementById("bookingStatus").innerText =
        "Booking Confirmed Successfully!";

    // Reset form fields.

    document.getElementById("bookingForm").reset();

    // Keep confirmed booking information in summary.

    document.getElementById("summaryMatch").innerText =
        matchName;

    document.getElementById("summaryStand").innerText =
        stand;

    document.getElementById("price").innerText =
        price;

    document.getElementById("summaryQuantity").innerText =
        quantity;

    document.getElementById("total").innerText =
        total;

    showToast("Your IPL ticket booking is confirmed!");

}


// =====================================
// DOM CONTENT LOADED
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // TEAM FILTER

    document.getElementById("teamFilter")
        .addEventListener("change", filterMatches);


    // GRID VIEW BUTTON

    document.getElementById("gridView")
        .addEventListener("click", function () {

            setView("grid");

            showToast("Grid View Enabled");

        });


    // LIST VIEW BUTTON

    document.getElementById("listView")
        .addEventListener("click", function () {

            setView("list");

            showToast("List View Enabled");

        });


    // HAMBURGER MENU

    document.getElementById("hamburger")
        .addEventListener("click", toggleMenu);


    // CLOSE MOBILE MENU AFTER CLICKING A LINK

    document.querySelectorAll("#mainNav a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                const nav =
                    document.getElementById("mainNav");

                const hamburger =
                    document.getElementById("hamburger");

                nav.classList.remove("show");

                hamburger.innerText = "☰";

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


    // MATCH CARD BOOKING BUTTONS

    document.querySelectorAll(".book-btn")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const matchId = this.dataset.match;

                selectMatch(matchId);

            });

        });


    // BOOKING FORM

    document.getElementById("bookingForm")
        .addEventListener("submit", bookTicket);


    // LIVE BOOKING SUMMARY

    document.getElementById("match")
        .addEventListener("change", updateSummary);

    document.getElementById("stand")
        .addEventListener("change", updateSummary);

    document.getElementById("quantity")
        .addEventListener("input", updateSummary);


    // INITIAL SUMMARY

    updateSummary();

});
