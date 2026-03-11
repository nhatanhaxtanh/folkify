const AUTH_KEY = "folkify_logged_in";

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function login() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_KEY, "1");
}

export function logout() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_KEY);
}
