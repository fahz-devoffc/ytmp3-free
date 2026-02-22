async function download() {
    const url = document.getElementById("urlInput").value;
    const resultDiv = document.getElementById("result");

    if (!url) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    resultDiv.innerHTML = "<p class='loading'>⏳ Processing...</p>";

    try {
        const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status) {
            resultDiv.innerHTML = `
                <h3>${data.title}</h3>
                <img src="${data.thumbnail}" width="100%" style="border-radius:10px;margin:10px 0;">
                <a href="${data.link}" target="_blank">
                    <button class="download-btn">⬇ Download MP3</button>
                </a>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color:red;">Gagal mengambil data</p>`;
        }

    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Error server</p>`;
    }
}
