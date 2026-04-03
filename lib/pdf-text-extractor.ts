import * as pdfjsLib from "pdfjs-dist"

// Set worker source for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(" ")
      fullText += pageText + "\n"
    }

    return fullText.trim()
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw new Error("Impossible d'extraire le texte du PDF")
  }
}

export const extractTextFromWord = async (file: File): Promise<string> => {
  // For Word documents, we'll use a simple text extraction
  // In a real implementation, you'd use a library like mammoth.js
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      // Simple text extraction - in production, use proper Word parsing
      resolve(text || "Contenu du document Word")
    }
    reader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier Word"))
    reader.readAsText(file)
  })
}

export const extractTextFromImage = async (file: File): Promise<string> => {
  // For images, we would typically use OCR like Tesseract.js
  // For now, we'll return a placeholder
  throw new Error(
    "L'extraction de texte depuis les images nécessite une fonctionnalité OCR qui sera bientôt disponible",
  )
}
