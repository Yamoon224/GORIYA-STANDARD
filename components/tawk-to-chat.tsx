"use client"

import { useEffect } from "react"

export function TawkToChat() {
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://embed.tawk.to/YOUR_TAWK_TO_ID/1hqr8qkqj"
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    const firstScript = document.getElementsByTagName("script")[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src*="embed.tawk.to"]')
      if (existingScript) {
        existingScript.remove()
      }
      // Remove Tawk_API if it exists
      if (typeof window !== "undefined" && (window as any).Tawk_API) {
        delete (window as any).Tawk_API
      }
    }
  }, [])

  return null
}
