// src/components/AIChat.jsx
import { useState } from "react";
import axios from "axios";

function AIChat() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/generate", {
                prompt,
            });
            setResponse(res.data.result);
        } catch (err) {
            console.error("Error al generar contenido", err);
            setResponse("Error al conectar con la IA");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Chat con IA</h1>
            <textarea
                rows="4"
                placeholder="Escribe tu pregunta o prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ width: "100%", marginBottom: "1rem" }}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generando..." : "Enviar"}
            </button>
            {response && (
                <pre style={{ marginTop: "1rem", background: "#f0f0f0", padding: "1rem" }}>
                    {response}
                </pre>
            )}
        </div>
    );
}

export default AIChat;