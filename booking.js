document.addEventListener("DOMContentLoaded", () => {
  const dateSelect = document.getElementById("rideDate");
  const timeSelect = document.getElementById("rideTime");
  const form = document.getElementById("bookingForm");
  const message = document.getElementById("formMessage");

  // --- Populate next 7 days ---
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const value = `${yyyy}-${mm}-${dd}`;
    const label = date.toDateString();

    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    dateSelect.appendChild(option);
  }

  // --- Populate time slots every 30 mins ---
  for (let h = 0; h < 24; h++) {
    for (let m of [0, 30]) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const value = `${hh}:${mm}`;
      const label = `${hh}:${mm}`;
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      timeSelect.appendChild(option);
    }
  }

  // --- Handle form submit ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pickup = document.getElementById("pickup").value.trim();
    const drop = document.getElementById("drop").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const passengers = document.getElementById("passengers").value.trim();
    const rideDate = dateSelect.value;
    const rideTime = timeSelect.value;

    // Validation
    if (!pickup || !drop || !mobile || !passengers || !rideDate || !rideTime) {
      message.textContent = "⚠️ Please fill out all fields.";
      message.className = "error";
      message.classList.remove("hide");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      message.textContent = "⚠️ Enter a valid 10-digit mobile number.";
      message.className = "error";
      message.classList.remove("hide");
      return;
    }

    // ✅ Success
    message.textContent = `✅ Your ride is booked for ${rideDate} at ${rideTime}`;
    message.className = "success";
    message.classList.remove("hide");

    // Reset form after 3s & fade message
    setTimeout(() => {
      form.reset();
      message.classList.add("hide");
    }, 3000);
  });
});
const form = document.getElementById('bookingForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  fetch('https://script.google.com/macros/s/AKfycbx5aulgaP2_58BQDEbzsg1eEfzeTG-wBzwh0UsG7NTzHNJJI3H1xylZjFdYgfzcxJzcTg/exec', { method: 'POST', body: data })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert('Error: ' + err));
});