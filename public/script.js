// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Set the date we're counting down to
const countDownDate = new Date("September 29, 2024 00:00:00").getTime();

const countdownTimer = setInterval(function() {
    // Get the current date and time
    const now = new Date().getTime();

    // Calculate the remaining time
    const distance = countDownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the respective elements
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "<h2>The Summer Reading Program has started!</h2>";
    }
}, 1000);

// Email validation regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form submission handling
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Form submitted"); // Debugging log
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    // Validate email
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Create a participant object
    const participant = { name, email, age };
    console.log("Participant data:", participant); // Debugging log

    // Send the participant data to the server
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(participant),
    })
    .then(response => {
        if (!response.ok) {
            // If the response is not successful (e.g., duplicate entry), handle the error
            return response.json().then(err => {
                throw new Error(err.message);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert("Thank you for registering! We'll be in touch soon.");
        event.target.reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message || "There was an error with your registration. Please try again.");
    });
});

window.onload = function() {
    window.location.hash = "#home";
}
