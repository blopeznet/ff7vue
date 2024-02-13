// cookies.js

// Function to get a cookie value by name
export function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
  
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  
    return null;
  }
  
  // Function to set a cookie
  export function setCookie(name, value, days = 30) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? `;expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue};path=/`;
  }
  