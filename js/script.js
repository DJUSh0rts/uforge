function copyIP() {
    const ip = "play.uforge.cc";
    navigator.clipboard.writeText(ip).then(() => {
        const status = document.getElementById("copy-status");
        
        // Save original text
        const originalText = "Click to Copy IP";
        
        status.innerText = "IP COPIED!";
        status.style.color = "white";
        status.style.fontWeight = "bold";
        
        setTimeout(() => {
            status.innerText = originalText;
            status.style.color = "rgba(255,255,255,0.7)";
            status.style.fontWeight = "normal";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchServerStatus();
});

function fetchServerStatus() {
    const ip = "play.uforge.cc";
    const statusText = document.getElementById("server-status");
    
    // Using mcsrvstat.us API
    fetch(`https://api.mcsrvstat.us/2/${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                statusText.innerHTML = `
                    <span class="dot online"></span> 
                    <span style="color:white">${data.players.online}</span> / ${data.players.max} Players Online
                `;
            } else {
                statusText.innerHTML = `<span class="dot offline"></span> Server Offline`;
            }
        })
        .catch(err => {
            console.error("Error fetching status:", err);
            statusText.innerHTML = `<span class="dot"></span> Server Status Unavailable`;
        });
}