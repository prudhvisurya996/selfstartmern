
function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Update the URL based on your server address and port
    const serverUrl = 'http://52.90.221.22:3000/register';

    // Send registration data to the server using fetch
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('registrationMessage').textContent = data.message;
    })
    .catch(error => {
        console.error('Error registering user:', error);
        document.getElementById('registrationMessage').textContent = 'Registration failed. Please try again.';
    });
}
