export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem("token");

// Updated logout function
export const logout = () => {
  const currentPath = window.location.pathname;

  // শুধুমাত্র Dashboard route এর ভিতরের পেজ হলে redirect save কর
  if (currentPath.startsWith("/user-dashboard") || currentPath.startsWith("/admin-dashboard") || currentPath.startsWith("/agent-dashboard")) {
    localStorage.setItem("redirectAfterLogin", currentPath);
  } else {
    localStorage.removeItem("redirectAfterLogin");
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

