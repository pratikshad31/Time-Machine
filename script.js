// script.js — Time Machine global utilities

// Persist & retrieve session data
const TM = {
  save: (key, val) => sessionStorage.setItem('tm_' + key, val),
  get:  (key)      => sessionStorage.getItem('tm_' + key) || '',
  clear: ()        => Object.keys(sessionStorage).filter(k => k.startsWith('tm_')).forEach(k => sessionStorage.removeItem(k))
};

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// Add ripple effect to all .btn-primary buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  ripple.style.cssText = `
    position:absolute;width:20px;height:20px;border-radius:50%;
    background:rgba(255,255,255,0.3);pointer-events:none;
    left:${e.clientX - rect.left - 10}px;top:${e.clientY - rect.top - 10}px;
    transform:scale(0);animation:ripple-anim 0.5s ease-out forwards;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
});

// Inject ripple keyframe once
const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform:scale(10); opacity:0; } }`;
document.head.appendChild(style);