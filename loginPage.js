/* tiny demo-only validation + UX sugar */
const form = document.getElementById('auth-form');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const email = form.querySelector('input[type="email"]').value.trim();
  alert(`🚀  Welcome back, ${email.split('@')[0]}!`);
  form.reset();
});