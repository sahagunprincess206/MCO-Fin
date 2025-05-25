// Bus reservation sytem
// this define an object named busses, which contains foour types of busses: has name, price and array 30 seat
const buses = {
   luxury: { name: "Luxury", price: 5000, seats: Array(30).fill(null) }, 
   airCondition: { name: "AC", price: 4500, seats: Array(30).fill(null) },
   minibus: { name: "MiniBus", price: 3000, seats: Array(30).fill(null) },
   uvxpress: { name: "UVX press", price: 2800, seats: Array(30).fill(null) }
};
Object.keys(buses).forEach(key => {
  buses[key].seats = Array(30).fill(null);
});
// Show available buses
function showBuses() {
  console.log("Available Buses:");
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    console.log((i + 1) + ". " + bus.name + " - ₱" + bus.price);
  });
}
//reserve seat (busIndex, seatNumber, passengerName)
// Reserve Seat
function reserveSeat(busIndex, seatNumber, passengerName) {
  const bus = Object.values(buses)[busIndex];
  if (bus.seats[seatNumber] === null) {
    bus.seats[seatNumber] = passengerName;
    console.log("Seat " + (seatNumber + 1) + " reserved for " + passengerName);
  } else {
    console.log("Seat already taken.");
  }
}
function promptReservationOrCancel() {
  const action = prompt('Do you want to (1) Reserve or (2) Cancel a reservation? Enter 1 or 2:');
  if (action !== '1' && action !== '2') {
    console.log('Invalid action.');
    return;
  }
  // Show buses
  let message = "Pick a bus:\n";
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    message += ${i + 1}. ${bus.name}, Price: ${bus.price}\n;
  });
  const busInput = prompt(message + 'Select a bus by number:');
  const busIndex = parseInt(busInput) - 1;
  if (busIndex < 0  busIndex >= Object.keys(buses).length) {
    console.log('Invalid bus selection.');
    return;
  }
  const seatInput = prompt('Enter seat number (1-30):');
  const seatNumber = parseInt(seatInput) - 1;
  if (seatNumber < 0  seatNumber >= 30) {
    console.log('Invalid seat number.');
    return;
  }
  const passengerName = prompt('Enter your name:');
  if (action === '1') {
    reserveSeat(busIndex, seatNumber, passengerName);
    showReservedSeats(busIndex);
    pay(busIndex);
  } else {
    const bus = Object.values(buses)[busIndex];
    if (bus.seats[seatNumber] === passengerName) {
      cancelSeat(busIndex, seatNumber);
      alert(Successfully canceled the bus reservation.\nBus: ${bus.name}\nSeat: ${seatNumber + 1} is now available.);
    } else {
      alert('Cancellation failed. Name does not match the reservation.');
    }
  }
}

// Example usage:
if (login('user1')) {
  promptReservationOrCancel();
}

function isSeatTaken(busIndex, seatNumber) {
  const bus = Object.values(buses)[busIndex];
  return bus.seats[seatNumber] !== null;
}


// Cancel Seat
// removes a reservation from a seat. it  check if the seat is already reserved, and if it so it will clears it
function cancelSeat(busIndex, seatNumber) {
  const bus = Object.values(buses)[busIndex];
  if (bus.seats[seatNumber] !== null) {
    console.log("Seat " + (seatNumber + 1) + " reservation canceled.");
    bus.seats[seatNumber] = null;
  } else {
    console.log("Seat is already empty.");
  }
}
function isOnlyLetters(str) {
  return /^[A-Za-z\s]+$/.test(str);
}

function isOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

// Override promptReservationOrCancel to add validation
function promptReservationOrCancel() {
  const action = prompt('Do you want to (1) Reserve or (2) Cancel a reservation? Enter 1 or 2:');
  if (action !== '1' && action !== '2') {
    console.log('Invalid action.');
    return;
  }
  // Show buses
  let message = "Pick a bus:\n";
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    message += ${i + 1}. ${bus.name}, Price: ${bus.price}\n;
  });
  const busInput = prompt(message + 'Select a bus by number:');
  if (!isOnlyNumbers(busInput)) {
    console.log('Invalid input. Please enter a number for bus selection.');
    return;
  }
  const busIndex = parseInt(busInput) - 1;
  if (busIndex < 0  busIndex >= Object.keys(buses).length) {
    console.log('Invalid bus selection.');
    return;
  }
  const seatInput = prompt('Enter seat number (1-30):');
  if (!isOnlyNumbers(seatInput)) {
    console.log('Invalid input. Please enter a number for seat selection.');
    return;
  }
  const seatNumber = parseInt(seatInput) - 1;
  if (seatNumber < 0  seatNumber >= 30) {
    console.log('Invalid seat number.');
    return;
  }
  const passengerName = prompt('Enter your name:');
  if (!isOnlyLetters(passengerName)) {
    console.log('Invalid name. Please use letters only.');
    return;
  }
  if (action === '1') {
    reserveSeat(busIndex, seatNumber, passengerName);
    showReservedSeats(busIndex);
    pay(busIndex);
  } else {
    const bus = Object.values(buses)[busIndex];
    if (bus.seats[seatNumber] === passengerName) {
      cancelSeat(busIndex, seatNumber);
      alert(Successfully canceled the bus reservation.\nBus: ${bus.name}\nSeat: ${seatNumber + 1} is now available.);
    } else {
      alert('Cancellation failed. Name does not match the reservation.');
    }
  }
}
// Show Reserved Seats
function showReservedSeats(busIndex) {
  const bus = Object.values(buses)[busIndex];
  console.log("Reserved Seats in " + bus.name + ":");
  bus.seats.forEach((seat, i) => {
    if (seat !== null) {
      console.log("Seat " + (i + 1) + ": " + seat);
    }
  });
}

// Pay Function
// Pay(busIndex)
function pay(busIndex) {
  const bus = Object.values(buses)[busIndex];
  let total = 0;
  let count = 0;
  bus.seats.forEach(seat => {
    if (seat !== null) {
      count++;
      total += bus.price;
    }
  });
  console.log("Total seats reserved: " + count);
  console.log("Total amount to pay: ₱" + total);
  console.log("Payment complete.");
}

function login(username) {
  const users = ['user1', 'user2', 'user3'];
  return users.includes(username); // Check if the user exists
}
// Example usage:
// Removed duplicate prompt to ensure the system only asks once
// if (login('user1')) {
//   promptForBus();
// }// Bus reservation sytem
// this define an object named busses, which contains foour types of busses: has name, price and array 30 seat
const buses = {
   luxury: { name: "Luxury", price: 5000, seats: Array(30).fill(null) }, 
   airCondition: { name: "AC", price: 4500, seats: Array(30).fill(null) },
   minibus: { name: "MiniBus", price: 3000, seats: Array(30).fill(null) },
   uvxpress: { name: "UVX press", price: 2800, seats: Array(30).fill(null) }
};
Object.keys(buses).forEach(key => {
  buses[key].seats = Array(30).fill(null);
});
// Show available buses
function showBuses() {
  console.log("Available Buses:");
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    console.log((i + 1) + ". " + bus.name + " - ₱" + bus.price);
  });
}
//reserve seat (busIndex, seatNumber, passengerName)
// Reserve Seat
function reserveSeat(busIndex, seatNumber, passengerName) {
  const bus = Object.values(buses)[busIndex];
  if (bus.seats[seatNumber] === null) {
    bus.seats[seatNumber] = passengerName;
    console.log("Seat " + (seatNumber + 1) + " reserved for " + passengerName);
  } else {
    console.log("Seat already taken.");
  }
}
function promptReservationOrCancel() {
  const action = prompt('Do you want to (1) Reserve or (2) Cancel a reservation? Enter 1 or 2:');
  if (action !== '1' && action !== '2') {
    console.log('Invalid action.');
    return;
  }
  // Show buses
  let message = "Pick a bus:\n";
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    message += ${i + 1}. ${bus.name}, Price: ${bus.price}\n;
  });
  const busInput = prompt(message + 'Select a bus by number:');
  const busIndex = parseInt(busInput) - 1;
  if (busIndex < 0  busIndex >= Object.keys(buses).length) {
    console.log('Invalid bus selection.');
    return;
  }
  const seatInput = prompt('Enter seat number (1-30):');
  const seatNumber = parseInt(seatInput) - 1;
  if (seatNumber < 0  seatNumber >= 30) {
    console.log('Invalid seat number.');
    return;
  }
  const passengerName = prompt('Enter your name:');
  if (action === '1') {
    reserveSeat(busIndex, seatNumber, passengerName);
    showReservedSeats(busIndex);
    pay(busIndex);
  } else {
    const bus = Object.values(buses)[busIndex];
    if (bus.seats[seatNumber] === passengerName) {
      cancelSeat(busIndex, seatNumber);
      alert(Successfully canceled the bus reservation.\nBus: ${bus.name}\nSeat: ${seatNumber + 1} is now available.);
    } else {
      alert('Cancellation failed. Name does not match the reservation.');
    }
  }
}

// Example usage:
if (login('user1')) {
  promptReservationOrCancel();
}

function isSeatTaken(busIndex, seatNumber) {
  const bus = Object.values(buses)[busIndex];
  return bus.seats[seatNumber] !== null;
}


// Cancel Seat
// removes a reservation from a seat. it  check if the seat is already reserved, and if it so it will clears it
function cancelSeat(busIndex, seatNumber) {
  const bus = Object.values(buses)[busIndex];
  if (bus.seats[seatNumber] !== null) {
    console.log("Seat " + (seatNumber + 1) + " reservation canceled.");
    bus.seats[seatNumber] = null;
  } else {
    console.log("Seat is already empty.");
  }
}
function isOnlyLetters(str) {
  return /^[A-Za-z\s]+$/.test(str);
}

function isOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

// Override promptReservationOrCancel to add validation
function promptReservationOrCancel() {
  const action = prompt('Do you want to (1) Reserve or (2) Cancel a reservation? Enter 1 or 2:');
  if (action !== '1' && action !== '2') {
    console.log('Invalid action.');
    return;
  }
  // Show buses
  let message = "Pick a bus:\n";
  Object.keys(buses).forEach((key, i) => {
    const bus = buses[key];
    message += ${i + 1}. ${bus.name}, Price: ${bus.price}\n;
  });
  const busInput = prompt(message + 'Select a bus by number:');
  if (!isOnlyNumbers(busInput)) {
    console.log('Invalid input. Please enter a number for bus selection.');
    return;
  }
  const busIndex = parseInt(busInput) - 1;
  if (busIndex < 0  busIndex >= Object.keys(buses).length) {
    console.log('Invalid bus selection.');
    return;
  }
  const seatInput = prompt('Enter seat number (1-30):');
  if (!isOnlyNumbers(seatInput)) {
    console.log('Invalid input. Please enter a number for seat selection.');
    return;
  }
  const seatNumber = parseInt(seatInput) - 1;
  if (seatNumber < 0  seatNumber >= 30) {
    console.log('Invalid seat number.');
    return;
  }
  const passengerName = prompt('Enter your name:');
  if (!isOnlyLetters(passengerName)) {
    console.log('Invalid name. Please use letters only.');
    return;
  }
  if (action === '1') {
    reserveSeat(busIndex, seatNumber, passengerName);
    showReservedSeats(busIndex);
    pay(busIndex);
  } else {
    const bus = Object.values(buses)[busIndex];
    if (bus.seats[seatNumber] === passengerName) {
      cancelSeat(busIndex, seatNumber);
      alert(Successfully canceled the bus reservation.\nBus: ${bus.name}\nSeat: ${seatNumber + 1} is now available.);
    } else {
      alert('Cancellation failed. Name does not match the reservation.');
    }
  }
}
// Show Reserved Seats
function showReservedSeats(busIndex) {
  const bus = Object.values(buses)[busIndex];
  console.log("Reserved Seats in " + bus.name + ":");
  bus.seats.forEach((seat, i) => {
    if (seat !== null) {
      console.log("Seat " + (i + 1) + ": " + seat);
    }
  });
}

// Pay Function
// Pay(busIndex)
function pay(busIndex) {
  const bus = Object.values(buses)[busIndex];
  let total = 0;
  let count = 0;
  bus.seats.forEach(seat => {
    if (seat !== null) {
      count++;
      total += bus.price;
    }
  });
  console.log("Total seats reserved: " + count);
  console.log("Total amount to pay: ₱" + total);
  console.log("Payment complete.");
}

function login(username) {
  const users = ['user1', 'user2', 'user3'];
  return users.includes(username); // Check if the user exists
}
// Example usage:
// Removed duplicate prompt to ensure the system only asks once
// if (login('user1')) {
//   promptForBus();
// }