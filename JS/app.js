
// Reusable Toast Notification Function
function showToast(message) {
    let toast = document.getElementById("toast");

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Smooth Scrolling Function
function smoothScrollToBooking() {
    let bookingSection = document.getElementById("booking");

    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// DOM Manipulation and Event Handling
document.addEventListener("DOMContentLoaded", function () {

    // Select all Book buttons in the match schedule
    let bookButtons = document.querySelectorAll(".book-btn");

    // Add click event to Book buttons
    bookButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            showToast("Redirecting to Ticket Booking!");

            smoothScrollToBooking();

        });
    });

    // Hero section Book button
    let heroButtons = document.querySelectorAll(".hero-book");

    heroButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {

            event.preventDefault();

            showToast("Let's Book Your IPL Tickets!");

            smoothScrollToBooking();

        });
    });

    // Navigation Book button
    let navBook = document.querySelector(".nav-book");

    if (navBook) {
        navBook.addEventListener("click", function (event) {

            event.preventDefault();

            showToast("Opening Booking Section!");

            smoothScrollToBooking();

        });
    }

});
