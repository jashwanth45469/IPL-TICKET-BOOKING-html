
// =====================================
// ACTIVITY 5: REUSABLE TOAST NOTIFICATION
// =====================================

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


// =====================================
// ACTIVITY 5: SMOOTH SCROLLING
// =====================================

function smoothScrollToBooking() {

    let bookingSection = document.getElementById("booking");

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

    // Select form controls using DOM selectors
    let matchSelect = document.getElementById("match");

    let standSelect = document.querySelector("#stand");

    let quantityInput = document.getElementById("quantity");

    // Read selected values
    let matchId = matchSelect.value;

    let stand = standSelect.value;

    let quantity = Number(quantityInput.value) || 0;

    let matchName = "Not Selected";

    let price = 0;

    // Get selected match and ticket price
    if (matches[matchId]) {

        matchName = matches[matchId].name;

        if (stand) {

            price = matches[matchId].prices[stand] || 0;

        }

    }

    // Calculate total price
    let total = price * quantity;

    // Display booking details
    document.getElementById("summaryMatch").innerText =
        matchName;

    document.getElementById("summaryStand").innerText =
        stand || "Not Selected";

    document.getElementById("price").innerText =
        price;

    document.getElementById("summaryQuantity").innerText =
        quantity;

    document.getElementById("total").innerText =
        total;

    // Animate Booking Summary
    let summary = document.getElementById("summary");

    summary.classList.remove("updated");

    void summary.offsetWidth;

    summary.classList.add("updated");

}


// =====================================
// DOM MANIPULATION AND EVENT HANDLING
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Activity 5: Match Schedule Book Buttons
    let bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast("Redirecting to Ticket Booking!");

            smoothScrollToBooking();

        });

    });


    // Activity 5: Hero Book Button
    let heroButtons = document.querySelectorAll(".hero-book");

    heroButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            showToast("Let's Book Your IPL Tickets!");

            smoothScrollToBooking();

        });

    });


    // Activity 5: Navigation Book Button
    let navBook = document.querySelector(".nav-book");

    if (navBook) {

        navBook.addEventListener("click", function (event) {

            event.preventDefault();

            showToast("Opening Booking Section!");

            smoothScrollToBooking();

        });

    }


    // =====================================
    // ACTIVITY 7: SELECT FORM CONTROLS
    // =====================================

    let matchSelect = document.getElementById("match");

    let standSelect = document.querySelector("#stand");

    let quantityInput = document.getElementById("quantity");


    // Match Dropdown Event Listener
    matchSelect.addEventListener("change", function () {

        updateSummary();

        showToast("Booking Summary Updated!");

    });


    // Stand Category Event Listener
    standSelect.addEventListener("change", function () {

        updateSummary();

        showToast("Booking Summary Updated!");

    });


    // Ticket Quantity Event Listener
    quantityInput.addEventListener("input", function () {

        updateSummary();

        showToast("Booking Summary Updated!");

    });


    // Display Initial Booking Summary
    updateSummary();

});
