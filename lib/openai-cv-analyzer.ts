import OpenAI from "openai"
import { CVAnalysis } from "@/lib/@types/openai"
import { extractTextFromPDF, extractTextFromWord, extractTextFromImage } from "./pdf-text-extractor"

export const analyzeCVWithOpenAI = async (cvText: string): Promise<CVAnalysis> => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    })

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `Tu es un expert en ressources humaines et en analyse de CV. Analyse le CV fourni et donne une évaluation détaillée en français. 
          
                        Réponds au format JSON avec les champs suivants:
                        - score: note sur 100 (nombre)
                        - strengths: liste des points forts (array de strings)
                        - weaknesses: liste des points faibles (array de strings)
                        - suggestions: liste de suggestions d'amélioration concrètes (array de strings)
                        - keywords: mots-clés importants trouvés dans le CV (array de strings)
                        - summary: résumé de l'analyse en 2-3 phrases (string)
                        
                        Sois constructif et donne des conseils pratiques pour améliorer le CV.`,
                },
                {
                    role: "user",
                    content: `Analyse ce CV et donne-moi une évaluation complète: ${cvText}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        })

        const content = response.choices[0].message.content
        if (!content) {
            throw new Error("Aucune réponse reçue de l'API OpenAI")
        }

        try {
            const analysis = JSON.parse(content)

            // Validate the response structure
            if (!analysis.score || !Array.isArray(analysis.strengths) || !Array.isArray(analysis.weaknesses)) {
                throw new Error("Format de réponse invalide")
            }

            return {
                score: Math.min(100, Math.max(0, analysis.score)),
                strengths: analysis.strengths || [],
                weaknesses: analysis.weaknesses || [],
                suggestions: analysis.suggestions || [],
                keywords: analysis.keywords || [],
                summary: analysis.summary || "Analyse terminée",
            }
        } catch (parseError) {
            console.error("Error parsing OpenAI response:", parseError)
            throw new Error("Erreur lors de l'analyse de la réponse")
        }
    } catch (error) {
        console.error("Erreur lors de l'analyse du CV:", error)
        throw new Error("Impossible d'analyser le CV pour le moment. Veuillez réessayer.")
    }
}

export const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.type.toLowerCase()

    try {
        if (fileType.includes("pdf")) {
            return await extractTextFromPDF(file)
        } else if (fileType.includes("word") || fileType.includes("document")) {
            return await extractTextFromWord(file)
        } else if (fileType.includes("image")) {
            return await extractTextFromImage(file)
        } else {
            // Fallback for text files
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (e) => resolve((e.target?.result as string) || "")
                reader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier"))
                reader.readAsText(file)
            })
        }
    } catch (error) {
        console.error("Error extracting text from file:", error)
        throw new Error("Impossible d'extraire le texte du fichier. Vérifiez le format et réessayez.")
    }
}
