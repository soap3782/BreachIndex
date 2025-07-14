/* ─── SUPABASE INIT ─── */
const SUPABASE_URL  = 'https://wchhoxcfjhqnniencavo.supabase.co';   // project root, not the dashboard URL
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjaGhveGNmamhxbm5pZW5jYXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjA3MjMsImV4cCI6MjA2ODA5NjcyM30._X4Bv4KElfyEdkPvB1hmIj0JUE0cpprpCHMFpva5gdg'; // SUPABASE ANON KEY
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ─── DOM HOOKS ─── */
const form      = document.getElementById('auth-form');
const emailFld  = form.querySelector('input[type="email"]');
const passFld   = form.querySelector('input[type="password"]');

/* helper: display temp message under the button */
function flash(msg, ok = false){
  let el = document.querySelector('.flash');
  if(!el){
    el = document.createElement('p');
    el.className = 'flash';
    form.appendChild(el);
  }
  el.textContent = msg;
  el.style.color = ok ? '#4caf50' : '#ff4f5a';
}

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  flash('Signing you in…');

  const { data, error } = await sb.auth.signInWithPassword({
    email:    emailFld.value.trim(),
    password: passFld.value
  });

  if(error){
    flash(error.message);                  // show Supabase error
    return;
  }

  flash('Success! Redirecting…', true);     // ✅ UX feedback
  setTimeout(()=>window.location.href = 'homePage.html', 600);
});
