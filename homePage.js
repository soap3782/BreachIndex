const analyzeBtn = document.getElementById('analyze-btn');
const resultArea = document.getElementById('result-area');
const urlInput = document.getElementById('url-input');

// Simple fake "susceptibility" calculation
function fakeSusceptibilityAnalysis(url) {
    // Simulate a real scan (demo only!)
    const hasHttps = url.startsWith('https://');
    const lengthScore = Math.max(0, 100 - url.length * 1.3);
    // Fun: Higher susceptibility if http or very short url!
    let score = Math.round((hasHttps ? 75 : 40) + (lengthScore / 2) + (Math.random() * 25));
    score = Math.max(10, Math.min(99, score));
    // Reverse: high score == more susceptible (less secure)
    return score;
}

function getVerdict(score) {
    if(score > 70) return ["High Risk! 🚨", "danger"];
    if(score > 45) return ["Medium Risk! ⚠️", ""];
    return ["Low Risk 👍", "safe"];
}

function renderResult(score, url) {
    const [verdict, className] = getVerdict(score);
    return `
        <div class="score-circle ${className}">${score}</div>
        <div style="font-weight: 700; font-size: 1.18rem;">${verdict}</div>
        <div style="margin-top:.5rem; font-size: .98rem; color: #6d6d6d;">
            Susceptibility Score for <span style="font-weight:700;">${url}</span>
        </div>
        <div style="margin-top:1.1rem; font-size:.96rem;">
            <em>*Tip: Use HTTPS, validate inputs, set secure headers, and update dependencies!</em>
        </div>
    `;
}

analyzeBtn.onclick = async () => {
    const url = urlInput.value.trim();
    resultArea.innerHTML = '';

    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
        resultArea.innerHTML = '<div style="color:var(--danger); font-weight:700;">❗ Please enter a valid URL (http/https).</div>';
        return;
    }

    // Show loading
    resultArea.innerHTML = `<div class="loading-spinner"></div>
                            <div style="text-align:center; margin-top:1rem;">Analyzing…</div>`;
    // Simulate scan delay
    await new Promise(r => setTimeout(r, 1300));

    // "Analyze" and render
    const score = fakeSusceptibilityAnalysis(url);
    resultArea.innerHTML = renderResult(score, url);
};

// Contact form (demo only)
document.querySelector('.contact-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon. 👍");
    e.target.reset();
};
