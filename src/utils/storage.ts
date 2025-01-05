// Utility functions for handling local storage
export const storage = {
    setAuth(token: string, userId: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', userId);
    },
  
    clearAuth() {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
    },
  
    getToken() {
      return localStorage.getItem('token');
    }
  };