root@ip-172-31-93-158:~/selfstartmern/my-node-app# cat login.js
function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const serverUrl = 'http:///52.90.221.22:3000/login';

  fetch(serverUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  })
  .then(response => {
      if (response.ok) {
          // Successful login, redirect to dashboard
          window.location.href = '/dashboard.html'; // Replace with the actual path
      } else {
          // Failed login, show error message
          return response.text();
      }
  })
  .then(data => {
      // Display the error message or handle the HTML content
      document.getElementById('loginMessage').innerHTML = data;
  })
  .catch(error => {
      console.error('Error logging in:', error);
      document.getElementById('loginMessage').textContent = 'Login failed. Please try again.';
  });
}
