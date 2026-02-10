
const API_KEY = "AIzaSyCc_Vn2FJJNy27N4vqZgjGB4omvTXIqYXU";

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

listModels();
