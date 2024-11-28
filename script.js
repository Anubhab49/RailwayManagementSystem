// Train Data with Routes and Seat Limits
const trains = [
    {
        number: 101,
        name: "Express Ananda",
        route: ["Mumbai", "Pune", "Solapur", "Hyderabad"],
        time: "08:00 AM",
        seats: 50,
        bookedSeats: 0,
        seatAvailability: [50, 50, 50] // Seat availability between each pair of stations
    },
    {
        number: 102,
        name: "Express Bharat",
        route: ["Delhi", "Agra", "Kanpur", "Lucknow"],
        time: "10:00 AM",
        seats: 60,
        bookedSeats: 0,
        seatAvailability: [60, 60, 60]
    },
    {
        number: 103,
        name: "Express Chariot",
        route: ["Chennai", "Vellore", "Bangalore", "Mysore"],
        time: "12:00 PM",
        seats: 40,
        bookedSeats: 0,
        seatAvailability: [40, 40, 40]
    },
    {
        number: 104,
        name: "Express Doctor",
        route: ["Kolkata", "Kharagpur", "Adra", "Patna"],
        time: "3:00 PM",
        seats: 70,
        bookedSeats: 0,
        seatAvailability: [70, 70, 70]
    },
    {
        number: 105,
        name: "Express Eagle",
        route: ["Sealdah", "Krishnanagar", "Behrampur", "New Jalpaiguri"],
        time: "6:00 PM",
        seats: 80,
        bookedSeats: 0,
        seatAvailability: [80, 80, 80]
    }
];

// Bookings Data
let bookings = [];

// Display Train Schedule
function loadTrainSchedule() {
    const trainList = document.getElementById('train-list');
    trainList.innerHTML = '';
    trains.forEach(train => {
        const row = `<tr>
            <td>${train.number}</td>
            <td>${train.name}</td>
            <td>${train.route.join(' → ')}</td>
            <td>${train.time}</td>
            <td>${Math.min(...train.seatAvailability)} / ${train.seats}</td>
        </tr>`;
        trainList.innerHTML += row;
    });
}

// Populate Stations in Dropdowns
function populateStations() {
    const fromStation = document.getElementById('from-station');
    const toStation = document.getElementById('to-station');
    const allStations = new Set();
    trains.forEach(train => train.route.forEach(station => allStations.add(station)));
    fromStation.innerHTML = toStation.innerHTML = '';
    allStations.forEach(station => {
        fromStation.innerHTML += `<option value="${station}">${station}</option>`;
        toStation.innerHTML += `<option value="${station}">${station}</option>`;
    });
}

// Switch Sections
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
    if (sectionId === 'train-schedule') loadTrainSchedule();
    if (sectionId === 'view-bookings') loadBookings();
}

// Handle Ticket Booking
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const fromStation = document.getElementById('from-station').value;
    const toStation = document.getElementById('to-station').value;
    const trainNumber = parseInt(document.getElementById('train-number').value);
    const seats = parseInt(document.getElementById('seats').value);

    const train = trains.find(t => t.number === trainNumber);

    if (train && train.route.includes(fromStation) && train.route.includes(toStation)) {
        const fromIndex = train.route.indexOf(fromStation);
        const toIndex = train.route.indexOf(toStation);

        if (fromIndex < toIndex) {
            // Check seat availability for the requested route
            const canBook = train.seatAvailability.slice(fromIndex, toIndex).every(avail => avail >= seats);

            if (canBook) {
                // Deduct seats from availability for the requested route
                for (let i = fromIndex; i < toIndex; i++) {
                    train.seatAvailability[i] -= seats;
                }
                train.bookedSeats += seats;

                const price = seats * 500 * (toIndex - fromIndex); // Calculate total price

                bookings.push({ name, train, fromStation, toStation, seats, price });
                alert('Ticket booked successfully!');
                document.getElementById('booking-form').reset();
                loadTrainSchedule();
            } else {
                alert('Not enough seats available on this train for the selected route!');
            }
        } else {
            alert('Invalid route selection: Departure station must come before destination station.');
        }
    } else {
        alert('Invalid Train or Station selected!');
    }
});

// View Bookings
function loadBookings() {
    const bookingList = document.getElementById('booking-list');
    bookingList.innerHTML = '';
    if (bookings.length === 0) {
        bookingList.innerHTML = '<li>No bookings yet. Please book a ticket.</li>';
        return;
    }
    bookings.forEach((booking, index) => {
        bookingList.innerHTML += `<li>
            <strong>${index + 1}. Passenger Name:</strong> ${booking.name} <br>
            <strong>Train Name:</strong> ${booking.train.name} (${booking.train.number}) <br>
            <strong>Route:</strong> ${booking.fromStation} to ${booking.toStation} <br>
            <strong>Seats:</strong> ${booking.seats} <br>
            <strong>Total Price:</strong> Rs. ${booking.price}
        </li>`;
    });
}

// Initialize
populateStations();
loadTrainSchedule();
