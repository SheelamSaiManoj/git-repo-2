document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Simulate successful login (replace this with actual authentication logic)
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Simulated login success based on hardcoded credentials (for demo purposes)
    if (email === 'user@example.com' && password === 'password') {
      // Redirect to the dashboard on successful login
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
  