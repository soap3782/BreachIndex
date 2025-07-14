/* ─────────── CAROUSEL ─────────── */
const slides      = document.querySelectorAll('.slide');
const dotsWrapper = document.getElementById('dots');
const prevBtn     = document.getElementById('prev');
const nextBtn     = document.getElementById('next');
const SUPABASE_URL = 'https://supabase.com/dashboard/project/wchhoxcfjhqnniencavo'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjaGhveGNmamhxbm5pZW5jYXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjA3MjMsImV4cCI6MjA2ODA5NjcyM30._X4Bv4KElfyEdkPvB1hmIj0JUE0cpprpCHMFpva5gdg'; // Replace with your Supabase anon/public key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let idx = 0, auto;
const AUTO_DELAY = 5000;

/* Create dots dynamically */
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.addEventListener('click', ()=>goTo(i));
  dotsWrapper.appendChild(d);
});
const dots = dotsWrapper.children;

function updateUI(){
  /* slide translate */
  document.querySelector('.slides').style.transform = `translateX(-${idx*100}%)`;
  /* active classes */
  [...slides].forEach(s=>s.classList.remove('current'));
  slides[idx].classList.add('current');
  [...dots].forEach(d=>d.classList.remove('active'));
  dots[idx].classList.add('active');
}

function goTo(n){
  idx = (n + slides.length) % slides.length;
  updateUI();
  restartAuto();
}
function next(){ goTo(idx+1);}
function prev(){ goTo(idx-1);}
function restartAuto(){
  clearInterval(auto);
  auto = setInterval(next, AUTO_DELAY);
}
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
restartAuto();
updateUI();

/* swipe support */
let startX=null;
document.getElementById('showcase').addEventListener('touchstart',e=>startX=e.touches[0].clientX);
document.getElementById('showcase').addEventListener('touchend',e=>{
  if(startX===null) return;
  const dist = e.changedTouches[0].clientX - startX;
  if(Math.abs(dist)>50){ dist>0 ? prev() : next(); }
  startX=null;
});

/* ─────────── MOBILE NAV ─────────── */
const burger = document.getElementById('hamburger');
const nav    = document.getElementById('nav-links');
burger.addEventListener('click', ()=>{
  nav.classList.toggle('open');
  burger.classList.toggle('open');
});

/* ─────────── URL ANALYZER ─────────── */
const analyzeBtn = document.getElementById('analyze-btn');
const resultArea = document.getElementById('result-area');
const urlInput   = document.getElementById('url-input');

function fakeSusceptibilityAnalysis(url){
  const hasHttps   = url.startsWith('https://');
  const lengthScore= Math.max(0, 100 - url.length*1.3);
  let score = Math.round((hasHttps?75:40) + (lengthScore/2) + (Math.random()*25));
  return Math.max(10, Math.min(99, score)); // clamp
}
function verdict(score){
  if(score>70) return ['High Risk 🚨','danger'];
  if(score>45) return ['Medium Risk ⚠️',''];
  return ['Low Risk 👍','safe'];
}
function render(score,url){
  const [txt,cls]=verdict(score);
  return `
    <div class="score-circle ${cls}">${score}</div>
    <div style="font-weight:700;font-size:1.18rem">${txt}</div>
    <p style="margin-top:.6rem;font-size:.95rem;color:#666">
      Susceptibility score for <strong>${url}</strong>
    </p>
    <p style="font-size:.9rem"><em>*Tip: enforce HTTPS, validate inputs, add CSP, keep deps updated.</em></p>
  `;
}
analyzeBtn.addEventListener('click', async ()=>{
  const url = urlInput.value.trim();
  resultArea.innerHTML='';
  if(!/^https?:\/\//.test(url)){
    resultArea.innerHTML='<div style="color:var(--danger);font-weight:700">❗ Please enter a valid URL (http/https).</div>';
    return;
  }
  resultArea.innerHTML='<div class="loading-spinner"></div><p>Analyzing…</p>';
  await new Promise(r=>setTimeout(r,1200));
  const s = fakeSusceptibilityAnalysis(url);
  resultArea.innerHTML = render(s,url);
});

/* ─────────── CONTACT FORM (demo) ─────────── */
document.querySelector('.contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  alert("Message sent! We'll get back to you soon. 👍");
  e.target.reset();
});
