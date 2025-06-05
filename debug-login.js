// Debug script to test login API response
// Run this in browser console to test the login response format

const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'khang567.ht@gmail.com', // Replace with actual test email
        password: 'khang123'             // Replace with actual test password
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Login response:', data);
      console.log('Response type:', typeof data);
      console.log('Has id?', 'id' in data);
      console.log('Has token?', 'token' in data);
      console.log('Has user?', 'user' in data);
      console.log('Keys:', Object.keys(data));
    } else {
      console.error('Login failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

console.log('To test login, run: testLogin()');
