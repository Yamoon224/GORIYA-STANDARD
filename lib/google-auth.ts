export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export const initializeGoogleAuth = () => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Google Auth can only be initialized in the browser"))
      return
    }

    if (!GOOGLE_CLIENT_ID) {
      resolve() // silently skip if not configured
      return
    }

    // Load Google Identity Services script
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"))
    document.head.appendChild(script)
  })
}

export const signInWithGoogle = (): Promise<GoogleUser> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.google) {
      reject(new Error("Google Identity Services not loaded"))
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          try {
            // Decode JWT token to get user info
            const payload = JSON.parse(atob(response.credential.split(".")[1]))
            const user: GoogleUser = {
              id: payload.sub,
              email: payload.email,
              name: payload.name,
              picture: payload.picture,
              given_name: payload.given_name,
              family_name: payload.family_name,
            }
            resolve(user)
          } catch (error) {
            console.error("[v0] Error decoding Google credential:", error)
            reject(new Error("Failed to decode Google credential"))
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      const buttonContainer = document.createElement("div")
      buttonContainer.style.display = "none"
      document.body.appendChild(buttonContainer)

      window.google.accounts.id.renderButton(buttonContainer, {
        theme: "outline",
        size: "large",
        type: "standard",
      })

      // Trigger the button click programmatically
      const button = buttonContainer.querySelector("div[role='button']") as HTMLElement
      if (button) {
        button.click()
      } else {
        // Fallback to prompt if button rendering fails
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            reject(new Error("Google Sign-In was cancelled or not displayed"))
          }
        })
      }

      // Clean up
      setTimeout(() => {
        if (buttonContainer.parentNode) {
          buttonContainer.parentNode.removeChild(buttonContainer)
        }
      }, 1000)
    } catch (error) {
      console.error("[v0] Error initializing Google Sign-In:", error)
      reject(new Error("Failed to initialize Google Sign-In"))
    }
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any
  }
}
