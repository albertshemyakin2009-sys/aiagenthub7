const STORAGE_KEYS = {
  theme: 'aiah_theme',
  lang: 'aiah_lang',
  currency: 'aiah_currency'
};

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'default') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  // swap mockup image if present
  const img = document.getElementById('theme-mockup');
  if (img) {
    const map = {
      'default': 'assets/img/mockup-orange.svg',
      'darkblue': 'assets/img/mockup-darkblue.svg',
      'light': 'assets/img/mockup-light.svg'
    };
    img.src = map[theme] || map['default'];
    img.alt = `MacBook mockup - ${theme} theme`;
  }
  // set radio in settings if exists
  document.querySelectorAll(`input[name="theme"]`).forEach(r => {
    r.checked = (r.value === theme);
  });
}

function applyLang(lang) {
  localStorage.setItem(STORAGE_KEYS.lang, lang);
  const span = document.querySelector('[data-bind="lang"]');
  if (span) span.textContent = lang.toUpperCase();
  const selLang = document.getElementById('lang');
  if (selLang) selLang.value = lang;
}

function applyCurrency(cur) {
  localStorage.setItem(STORAGE_KEYS.currency, cur);
  const span = document.querySelector('[data-bind="currency"]');
  if (span) span.textContent = cur;
  const selCur = document.getElementById('currency');
  if (selCur) selCur.value = cur;
}

function initState() {
  const t = localStorage.getItem(STORAGE_KEYS.theme) || 'default';
  const l = localStorage.getItem(STORAGE_KEYS.lang) || 'ru';
  const c = localStorage.getItem(STORAGE_KEYS.currency) || 'RUB';
  applyTheme(t);
  applyLang(l);
  applyCurrency(c);
}

function bindSettingsControls() {
  document.querySelectorAll('input[name="theme"]').forEach(r => {
    r.addEventListener('change', e => applyTheme(e.target.value));
  });
  const lang = document.getElementById('lang');
  if (lang) lang.addEventListener('change', e => applyLang(e.target.value));
  const currency = document.getElementById('currency');
  if (currency) currency.addEventListener('change', e => applyCurrency(e.target.value));
  const reset = document.getElementById('resetSettings');
  if (reset) reset.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.theme);
    localStorage.removeItem(STORAGE_KEYS.lang);
    localStorage.removeItem(STORAGE_KEYS.currency);
    initState();
    alert('Настройки сброшены.');
  });
}

function bindAccordion() {
  document.querySelectorAll('.agent').forEach(block => {
    const header = block.querySelector('.agent-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const open = document.querySelector('.agent.open');
      if (open && open !== block) open.classList.remove('open');
      block.classList.toggle('open');
    });
  });
}

function bindSignupModal() {
  const openBtn = document.getElementById('openSignup');
  const modal = document.getElementById('signupModal');
  const closeBtn = document.getElementById('closeSignup');
  if (!modal) return;
  if (openBtn) openBtn.addEventListener('click', () => modal.showModal());
  if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
}

document.addEventListener('DOMContentLoaded', () => {
  initState();
  bindSettingsControls();
  bindAccordion();
  bindSignupModal();
});