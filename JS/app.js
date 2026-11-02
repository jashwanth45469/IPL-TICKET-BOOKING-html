const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}

const teamGrid = document.querySelector('.team-grid');
const teamButtons = document.querySelectorAll('[data-team-slide]');
teamButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!teamGrid) return;
        teamGrid.scrollBy({
            left: button.dataset.teamSlide === 'next' ? 220 : -220,
            behavior: 'smooth'
        });
    });
});

const fixtureRows = document.querySelectorAll('.match-row');
const filterButtons = document.querySelectorAll('.filter-row button');
fixtureRows.forEach((row, index) => {
    row.dataset.location = index === 1 ? 'away' : 'home';
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(item => item.classList.remove('selected'));
        button.classList.add('selected');
        const selected = button.textContent.trim().toLowerCase();
        fixtureRows.forEach(row => {
            row.hidden = selected !== 'all matches' && row.dataset.location !== selected;
        });
    });
});

function openModal(title, message) {
    document.querySelector('.site-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'site-modal';
    modal.innerHTML = `
        <div class="site-modal__card" role="dialog" aria-modal="true" aria-label="${title}">
            <button class="site-modal__close" type="button" aria-label="Close">×</button>
            <span class="site-modal__icon">✓</span>
            <p>Completed</p><h2>${title}</h2><div>${message}</div>
            <button class="site-modal__action" type="button">Continue</button>
        </div>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector('.site-modal__close').addEventListener('click', close);
    modal.querySelector('.site-modal__action').addEventListener('click', close);
    modal.addEventListener('click', event => {
        if (event.target === modal) close();
    });
}

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    const selects = bookingForm.querySelectorAll('select');
    const fixture = document.getElementById('fixture-select');
    const stand = selects[1];
    const count = selects[2];
    const summary = document.querySelector('.booking-summary');
    const prices = { 'North Stand': 1499, 'East Stand': 1799, 'Premium Pavilion': 3499, 'South Stand': 1299 };

    const requestedFixture = new URLSearchParams(location.search).get('fixture');
    if (requestedFixture && fixture) {
        [...fixture.options].forEach(option => {
            if (option.value.includes(requestedFixture)) fixture.value = option.value;
        });
    }

    function updateBookingSummary() {
        if (!summary) return;
        const title = summary.querySelector('h3');
        const total = summary.querySelector('#summary-total');
        const standOutput = summary.querySelector('#summary-stand');
        const ticketOutput = summary.querySelector('#summary-tickets');
        if (title) title.textContent = fixture.value ? fixture.value.split(' — ')[0] : 'Matchday';
        if (standOutput) standOutput.textContent = stand.value;
        if (ticketOutput) ticketOutput.textContent = count.value;
        if (total) {
            const quantity = Number(count.value.split(' ')[0]);
            total.textContent = `₹ ${(prices[stand.value] * quantity).toLocaleString('en-IN')}`;
        }
    }

    if (fixture && stand && count) {
        [fixture, stand, count].forEach(control => control.addEventListener('change', updateBookingSummary));
        updateBookingSummary();
    }

    bookingForm.addEventListener('submit', event => {
        event.preventDefault();
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        setTimeout(() => {
            const booking = {
                reference: `MC${Date.now().toString().slice(-8)}`,
                fixture: fixture.value,
                stand: stand.value,
                tickets: count.value,
                total: document.querySelector('#summary-total')?.textContent
            };
            localStorage.setItem('matchCentreLastBooking', JSON.stringify(booking));
            submitButton.disabled = false;
            submitButton.textContent = 'Continue';
            bookingForm.reset();
            updateBookingSummary();
            openModal('Booking request received', `<p>Reference <strong>${booking.reference}</strong></p><p>${booking.fixture}</p><p>${booking.tickets} · ${booking.stand}</p><p>Total ${booking.total}</p>`);
        }, 650);
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const fields = contactForm.querySelectorAll('input, textarea');
        const record = { name: fields[0].value, email: fields[1].value, message: fields[2].value, created: new Date().toISOString() };
        const saved = JSON.parse(localStorage.getItem('matchCentreMessages') || '[]');
        saved.push(record);
        localStorage.setItem('matchCentreMessages', JSON.stringify(saved));
        contactForm.reset();
        openModal('Message sent', `<p>Thanks, ${record.name}. Our team will contact you soon.</p>`);
    });
}
