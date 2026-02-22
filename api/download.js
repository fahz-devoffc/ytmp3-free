import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const response = await axios.get("https://back.asitha.top/api/ytapi", {
            params: {
                url: url,
                fo: "1",
                qu: "144"
            },
            headers: {
                Authorization: `Bearer ${process.env.YTMP3_API_KEY}`
            }
        });

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            error: error.response?.data || "Failed to fetch"
        });
    }
}
