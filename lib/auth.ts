// Simple authentication for admin access only

// Store admin credentials
const ADMIN_USERNAME = "Design@imagineeduction.io"
const ADMIN_PASSWORD = "DIE.2025.AMP?."

// Cookie name for authentication
export const AUTH_COOKIE_NAME = "ai-influencer-admin-auth"

// Admin authentication interface
export interface AdminAuth {
  isAuthenticated: boolean
  username: string | null
  timestamp: number | null
}

// Helper function to set cookie
function setCookie(name: string, value: string, days = 1) {
  if (typeof document === "undefined") return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

// Helper function to get cookie
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// Helper function to delete cookie
function deleteCookie(name: string) {
  if (typeof document === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Login function
export function loginAdmin(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create session
    const session: AdminAuth = {
      isAuthenticated: true,
      username: username,
      timestamp: Date.now(),
    }

    // Store in cookie (will persist across browser sessions)
    setCookie(AUTH_COOKIE_NAME, JSON.stringify(session), 1) // 1 day expiry

    return true
  }
  return false
}

// Logout function
export function logoutAdmin(): void {
  deleteCookie(AUTH_COOKIE_NAME)
}

// Check if admin is logged in
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false
  }

  const sessionData = getCookie(AUTH_COOKIE_NAME)
  if (!sessionData) {
    return false
  }

  try {
    const session: AdminAuth = JSON.parse(sessionData)

    // Check if session is valid and not expired (24 hour expiry)
    const now = Date.now()
    const sessionAge = now - (session.timestamp || 0)
    const sessionValid = sessionAge < 24 * 60 * 60 * 1000 // 24 hours

    if (!session.isAuthenticated || !sessionValid) {
      // Clean up expired session
      logoutAdmin()
      return false
    }

    return true
  } catch (error) {
    // Clean up corrupted session
    logoutAdmin()
    return false
  }
}

// Server-side function to check authentication from request
export function isAdminAuthenticatedFromCookies(cookieString: string): boolean {
  if (!cookieString) return false

  try {
    // Parse cookies
    const cookies = cookieString.split(";").reduce(
      (acc, cookie) => {
        const [name, value] = cookie.trim().split("=")
        acc[name] = value
        return acc
      },
      {} as Record<string, string>,
    )

    const sessionData = cookies[AUTH_COOKIE_NAME]
    if (!sessionData) return false

    const session: AdminAuth = JSON.parse(decodeURIComponent(sessionData))

    // Check if session is valid and not expired
    const now = Date.now()
    const sessionAge = now - (session.timestamp || 0)
    const sessionValid = sessionAge < 24 * 60 * 60 * 1000 // 24 hours

    return session.isAuthenticated && sessionValid
  } catch (error) {
    return false
  }
}
