// Train Data for Local Trains
const localTrains = [
    {
        number: 301,
        name: "Local Pioneer",
        route: ["Mumbai", "Thane", "Kalyan", "Karjat", "Lonavala", "Pune", "Satara", "Kolhapur", "Belgaum", "Hubli"],
        time: "06:00 AM"
    },
    {
        number: 302,
        name: "Local Pathfinder",
        route: ["Delhi", "Faridabad", "Palwal", "Mathura", "Agra", "Etawah", "Kanpur", "Unnao", "Lucknow", "Barabanki"],
        time: "07:00 AM"
    },
    {
        number: 303,
        name: "Local Unity",
        route: ["Kolkata", "Howrah", "Kharagpur", "Midnapore", "Bankura", "Adra", "Purulia", "Ranchi", "Bokaro", "Dhanbad"],
        time: "08:00 AM"
    },
    {
        number: 304,
        name: "Local Journey",
        route: ["Chennai", "Tambaram", "Chengalpattu", "Villupuram", "Tindivanam", "Cuddalore", "Chidambaram", "Sirkazhi", "Kumbakonam", "Tanjore"],
        time: "09:00 AM"
    },
    {
        number: 305,
        name: "Local Voyager",
        route: ["Bangalore", "Yeshwantpur", "Tumkur", "Arsikere", "Birur", "Chikmagalur", "Shimoga", "Bhadravati", "Davangere", "Hubli"],
        time: "10:00 AM"
    },
    {
        number: 306,
        name: "Local Explorer",
        route: ["Hyderabad", "Secunderabad", "Kazipet", "Warangal", "Khammam", "Vijayawada", "Eluru", "Rajahmundry", "Kakinada", "Visakhapatnam"],
        time: "11:00 AM"
    },
    {
        number: 307,
        name: "Local Horizon",
        route: ["Jaipur", "Dausa", "Bandikui", "Alwar", "Rewari", "Gurgaon", "Delhi", "Ghaziabad", "Meerut", "Muzaffarnagar"],
        time: "12:00 PM"
    },
    {
        number: 308,
        name: "Local Frontier",
        route: ["Ahmedabad", "Nadiad", "Anand", "Vadodara", "Bharuch", "Surat", "Navsari", "Valsad", "Vapi", "Mumbai"],
        time: "01:00 PM"
    },
    {
        number: 309,
        name: "Local Seaside",
        route: ["Goa", "Madgaon", "Karwar", "Ankola", "Gokarna", "Bhatkal", "Kundapura", "Udupi", "Mangalore", "Kasargod"],
        time: "02:00 PM"
    },
    {
        number: 310,
        name: "Local Peaks",
        route: ["Dehradun", "Rishikesh", "Haridwar", "Roorkee", "Saharanpur", "Muzaffarnagar", "Meerut", "Ghaziabad", "Delhi", "Faridabad"],
        time: "03:00 PM"
    }
];

// Bookings Data
let bookings = [];

// Display Train Schedule
function loadTrainSchedule() {
    const trainList = document.getElementById('train-list');
    trainList.innerHTML = '';
    localTrains.forEach(train => {
        const row = `<tr>
            <td>${train.number}</td>
            <td>${train.name}</td>
            <td>${train.route.join(' → ')}</td>
            <td>${train.time}</td>
            <td>Unlimited</td>
        </tr>`;
        trainList.innerHTML += row;
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }

    // Trigger additional actions when switching sections
    if (sectionId === 'train-schedule') {
        loadTrainSchedule();
    }
    if (sectionId === 'view-bookings') {
        loadBookings();
    }
}


// Populate Stations in Dropdowns
function populateStations() {
    const fromStation = document.getElementById('from-station');
    const toStation = document.getElementById('to-station');
    const allStations = new Set();
    localTrains.forEach(train => train.route.forEach(station => allStations.add(station)));
    fromStation.innerHTML = toStation.innerHTML = '';
    allStations.forEach(station => {
        fromStation.innerHTML += `<option value="${station}">${station}</option>`;
        toStation.innerHTML += `<option value="${station}">${station}</option>`;
    });
}

// Handle Ticket Booking
document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const fromStation = document.getElementById('from-station').value;
    const toStation = document.getElementById('to-station').value;
    const trainNumber = parseInt(document.getElementById('train-number').value);
    const seats = parseInt(document.getElementById('seats').value);

    const train = localTrains.find(t => t.number === trainNumber);

    if (train) {
        const fromIndex = train.route.indexOf(fromStation);
        const toIndex = train.route.indexOf(toStation);

        if (fromIndex < toIndex) {
            const price = seats * 5 * (toIndex - fromIndex); // Rs. 5 per station
            bookings.push({ name, train, fromStation, toStation, seats, price });
            alert('Ticket booked successfully!');
            document.getElementById('booking-form').reset();
            loadTrainSchedule();
        } else {
            alert('Invalid route selection: Departure station must come before destination station.');
        }
    } else {
        alert('Invalid Train Number!');
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
