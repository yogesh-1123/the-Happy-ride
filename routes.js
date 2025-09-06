
function bookRoute(pickup, drop) {
  // Autofill form
  if (document.getElementById("pickup")) {
    document.getElementById("pickup").value = pickup;
  }
  if (document.getElementById("drop")) {
    document.getElementById("drop").value = drop;
  }

  // Smooth scroll to booking form
  const formSection = document.getElementById("booking");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  }
}

