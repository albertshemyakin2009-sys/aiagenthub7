
function translateNode(el, key, dict) {
  if (!key || !dict) return;
  const t = dict[key];
  if (!t) return;
  if (el.placeholder !== undefined && el.hasAttribute("data-i18n-plh")) {
    el.placeholder = t;
  } else if (el.tagName === "OPTION") {
    el.textContent = t;
  } else {
    el.innerHTML = t;
  }
}
// --- Mock agents with detailed info ---
const AGENTS = [
  {
    id: "nova-support",
    name: "Nova Support AI",
    short: "AI-саппорт для SaaS: автоответы, triage тикетов, база знаний.",
    category: "Support",
    tags: ["Helpdesk", "SaaS", "24/7"],
    featured: true,
    useCase: "Поддержка клиентов SaaS и digital-продуктов, снижение нагрузки на живую команду.",
    examplePrompt: "“Nova, обработай обращения за последний час и выдели 10 приоритетных тикетов.”",
    integrations: ["Intercom", "Zendesk", "Slack"],
    pricingNote: "Freemium до 500 тикетов, далее — тариф от $49/мес."
  },
  {
    id: "salespulse",
    name: "SalesPulse AI",
    short: "Скоринг лидов, автоответы и подсказки менеджерам продаж.",
    category: "Sales",
    tags: ["Outbound", "CRM", "Email"],
    featured: true,
    useCase: "Приоритизация лидов и автоматизация первых касаний в b2b-продажах.",
    examplePrompt: "“Оцени новые лиды из формы и выдели топ-20% для звонка сегодня.”",
    integrations: ["HubSpot", "Pipedrive", "Salesforce"],
    pricingNote: "Модель подписки от $79/мес."
  },
  {
    id: "content-aura",
    name: "Content Aura",
    short: "Длинные тексты, рассылки и посты под голос бренда.",
    category: "Marketing",
    tags: ["Content", "SEO", "Brand"],
    featured: true,
    useCase: "Автоматизация контент-плана для блогов, email, соцсетей.",
    examplePrompt: "“Собери контент-план на месяц для B2B SaaS в стиле нашего блога.”",
    integrations: ["Notion", "WordPress"],
    pricingNote: "Freemium, далее оплата за объём генераций."
  },
  {
    id: "visionflow",
    name: "VisionFlow UX Reviewer",
    short: "Анализ интерфейсов по скриншотам и гипотезы улучшения.",
    category: "DevTools",
    tags: ["UX", "Design Review"],
    featured: false,
    useCase: "Быстрые UX-аудиты прототипов и продакшн-экранов.",
    examplePrompt: "“Разбери этот скриншот onboarding-экрана и предложи 5 улучшений.”",
    integrations: ["Figma"],
    pricingNote: "Оплата за ревью или подписка для студий."
  },
  {
    id: "opsmind",
    name: "OpsMind Automator",
    short: "Автоматизация процессов в Notion, Slack, Jira.",
    category: "Ops",
    tags: ["Automation", "Workflows"],
    featured: true,
    useCase: "Оркестрация задач и уведомлений между инструментами.",
    examplePrompt: "“Синхронизируй задачи из канала #support в Jira с приоритетами.”",
    integrations: ["Slack", "Jira", "Notion"],
    pricingNote: "Гибкая тарификация по числу сценариев."
  },
  {
    id: "brandvoice",
    name: "BrandVoice Guardian",
    short: "Контроль стиля и тона бренда при генерации текстов.",
    category: "Marketing",
    tags: ["Brand", "Policy"],
    featured: false,
    useCase: "Фильтр и редактор контента перед публикацией.",
    examplePrompt: "“Проверь этот текст на соответствие гайдам бренда и предложи правки.”",
    integrations: ["Chrome Extension", "CMS"],
    pricingNote: "Enterprise-подход, кастом под бренд."
  },
  {
    id: "scriptforge",
    name: "ScriptForge Studio",
    short: "Генерация скриптов, кода и CI-конфигов.",
    category: "DevTools",
    tags: ["Dev", "CI/CD"],
    featured: false,
    useCase: "Ускорение прототипирования и настройки пайплайнов.",
    examplePrompt: "“Сгенерируй GitHub Actions для Node.js + Playwright тестов.”",
    integrations: ["GitHub", "GitLab"],
    pricingNote: "Freemium + платные пресеты."
  }
];

// --- i18n dictionary (ключевые тексты) ---
const I18N = {
  ru: {
    lang_label: "RU",
    auth_demo: "Демо-доступ",
    hero_kicker: "Маркетплейс готовых AI-агентов",
    hero_title: "Находи и подключай <span>умных AI-агентов</span> за минуты",
    hero_subtitle: "AIAGENTHUB помогает бизнесу, студиям и создателям быстро тестировать и внедрять готовых AI-ассистентов без боли с инфраструктурой.",
    hero_cta_primary: "Смотреть каталог",
    hero_cta_secondary: "Добавить своего агента",
    hero_panel_title: "Live-панель агентов",
    hero_panel_badge: "curated / verified*",
    hero_panel_stats: "40+ демо-агентов • категории: Support, Sales, Marketing, DevTools",
    hero_panel_note: "*Верификация и рейтинги — ключевой фокус развития платформы.",
    section_popular_title: "Популярные направления",
    section_popular_subtitle: "Подборка агентов, которые чаще всего тестируют SaaS-проекты, агентства и продакты.",
    nav_home: "Главная",
    nav_catalog: "Каталог",
    nav_about: "О нас",
    nav_support: "Поддержка",
    nav_requests: "Запросы",
    nav_settings: "Настройки",
    nav_admin: "Админ",
    footer_product: "Продукт",
    footer_catalog: "Каталог агентов",
    footer_how_it_works: "Как это работает",
    footer_company: "Компания",
    footer_about: "О платформе",
    footer_contact: "Запросы и партнёрство",
    footer_support: "Поддержка",
    footer_faq: "FAQ",
    footer_support_center: "Центр помощи",
    footer_tagline: "Каталог умных AI-агентов для бизнеса и создателей.",
    catalog_title: "Каталог AI-агентов",
    catalog_subtitle: "Исследуй готовых ассистентов для поддержки клиентов, продаж, маркетинга, разработки и внутренних операций.",
    filter_all: "Все категории",
    about_title: "О платформе AIAGENTHUB",
    about_subtitle: "Мы строим каталог проверенных AI-агентов, который связывает бизнес, студии и создателей с готовыми решениями — прозрачно, быстро и без лишнего шума.",
    about_mission_title: "Миссия",
    about_mission_text: "Упростить путь от идеи до рабочей AI-автоматизации. Один хаб вместо десятков разрозненных ботов и хаотичных интеграций.",
    about_for_whom_title: "Для кого",
    about_quality_title: "Качество и развитие",
    about_next_title: "Куда идём дальше",
    support_title: "Техническая поддержка",
    support_subtitle: "Только технические вопросы: баги, доступ, работа агентов.",
    support_form_title: "Форма техподдержки",
    support_name_label: "Имя / команда",
    support_topic_label: "Тип проблемы",
    support_message_label: "Описание",
    support_submit: "Отправить в поддержку (демо)",
    support_faq_title: "Частые вопросы (тех)",
    settings_title: "Настройки аккаунта (демо)",
    settings_subtitle: "Здесь настраиваются базовые параметры профиля, тема интерфейса и предпочтения.",
    settings_profile_title: "Профиль",
    settings_name_label: "Имя / команда",
    settings_language_title: "Язык интерфейса",
    settings_currency_title: "Валюта",
    settings_save: "Сохранить (демо)",
    settings_integrations_title: "Интеграции & уведомления",
    settings_hint: "Все переключатели сейчас работают как прототип.",
    admin_title: "Админ-панель (демо)",
    admin_subtitle: "Прототип интерфейса модерации агентов.",
    admin_metrics_title: "Сводка за сегодня",
    admin_actions_title: "Действия модератора",
    admin_table_title: "Агенты (демо-таблица)",
    requests_title: "Запросы, пожелания и партнёрства",
    requests_subtitle: "Идеи по платформе, заявки на партнёрство и предложения новых агентов.",
    requests_agent_title: "Предложить нового агента",
    requests_partner_title: "Партнёрство и улучшения платформы",
    auth_title: "Вход / регистрация",
    auth_subtitle: "Зарегистрируйтесь, чтобы подключать агентов. Можно продолжить как гость.",
    auth_tab_register: "Регистрация",
    auth_tab_login: "Вход",
    auth_name_label: "Имя / команда",
    auth_password_label: "Пароль",
    auth_submit: "Продолжить (демо)",
    auth_skip: "Продолжить как гость",
    auth_notice: "В продакшене здесь будет безопасная регистрация через backend / OAuth. Сейчас — прототип."
  },
  en: {
    lang_label: "EN",
    auth_demo: "Demo access",
    hero_kicker: "Marketplace of AI agents",
    hero_title: "Discover and deploy <span>smart AI agents</span> in minutes",
    hero_subtitle: "AIAGENTHUB helps teams and creators test and ship AI assistants without wrestling with infrastructure.",
    hero_cta_primary: "Explore catalog",
    hero_cta_secondary: "List your agent",
    hero_panel_title: "Live agents panel",
    hero_panel_badge: "curated / verified*",
    hero_panel_stats: "40+ demo agents • Support, Sales, Marketing, DevTools",
    hero_panel_note: "*Verification & ratings are our core product focus.",
    section_popular_title: "Popular tracks",
    section_popular_subtitle: "A curated set of agents most tested by SaaS, agencies and product teams.",
    nav_home: "Home",
    nav_catalog: "Catalog",
    nav_about: "About",
    nav_support: "Support",
    nav_requests: "Requests",
    nav_settings: "Settings",
    nav_admin: "Admin",
    footer_product: "Product",
    footer_catalog: "Agents catalog",
    footer_how_it_works: "How it works",
    footer_company: "Company",
    footer_about: "About",
    footer_contact: "Requests & partnership",
    footer_support: "Support",
    footer_faq: "FAQ",
    footer_support_center: "Help center",
    footer_tagline: "A curated directory of AI agents for teams and creators.",
    catalog_title: "AI Agents Catalog",
    catalog_subtitle: "Explore assistants for support, sales, marketing, engineering and ops.",
    filter_all: "All categories",
    about_title: "About AIAGENTHUB",
    about_subtitle: "We are building a curated AI agents hub that connects teams and creators with real solutions.",
    about_mission_title: "Mission",
    about_mission_text: "Make AI automation adoption fast and practical.",
    about_for_whom_title: "Who it's for",
    about_quality_title: "Quality & roadmap",
    about_next_title: "What's next",
    support_title: "Technical support",
    support_subtitle: "Report bugs, access issues or agent problems.",
    support_form_title: "Support form",
    support_name_label: "Name / team",
    support_topic_label: "Issue type",
    support_message_label: "Description",
    support_submit: "Send to support (demo)",
    support_faq_title: "Technical FAQ",
    settings_title: "Settings (demo)",
    settings_subtitle: "Configure profile, theme & preferences.",
    settings_profile_title: "Profile",
    settings_name_label: "Name / team",
    settings_language_title: "Interface language",
    settings_currency_title: "Currency",
    settings_save: "Save (demo)",
    settings_integrations_title: "Integrations & notifications",
    settings_hint: "All controls are demo-only.",
    admin_title: "Admin panel (demo)",
    admin_subtitle: "Moderation dashboard prototype.",
    admin_metrics_title: "Today overview",
    admin_actions_title: "Moderator actions",
    admin_table_title: "Agents table (demo)",
    requests_title: "Requests, ideas & partnerships",
    requests_subtitle: "Ideas, partnerships and new agents proposals.",
    requests_agent_title: "Suggest a new agent",
    requests_partner_title: "Partnership & platform feedback",
    auth_title: "Sign in / Sign up",
    auth_subtitle: "Register to connect agents. Guest mode available.",
    auth_tab_register: "Sign up",
    auth_tab_login: "Sign in",
    auth_name_label: "Name / team",
    auth_password_label: "Password",
    auth_submit: "Continue (demo)",
    auth_skip: "Continue as guest",
    auth_notice: "Production version will use secure backend / OAuth. This is a prototype."
  }
};

// --- Lang helpers ---
function getCurrentLang() {
  try {
    return localStorage.getItem("aiagenthub_lang") || "ru";
  } catch {} {
    return "ru";
  }
}

function setCurrentLang(lang){
  try {
    localStorage.setItem("aiagenthub_lang", lang);
  try { document.documentElement.setAttribute("lang", lang); } catch {}
} catch {}
}

function applyTranslations() {
  const lang = getCurrentLang();
  const dict = (I18N && I18N[lang]) ? I18N[lang] : null;
  const all = document.querySelectorAll("[data-i18n]");
  all.forEach(el => {
    const key = el.getAttribute("data-i18n");
    translateNode(el, key, dict);
  });
  const placeholders = document.querySelectorAll("[data-i18n-plh]");
  placeholders.forEach(el => {
    const key = el.getAttribute("data-i18n-plh");
    translateNode(el, key, dict);
  });
  // Translate <option> as well
  const optionEls = document.querySelectorAll("option[data-i18n]");
  optionEls.forEach(el => {
    const key = el.getAttribute("data-i18n");
    translateNode(el, key, dict);
  });
} else {
      el.innerHTML = dict[key];
    }
  });
  const langBtnSpan = document.querySelector("#langBtn span");
  if (langBtnSpan && dict.lang_label) {
    langBtnSpan.textContent = dict.lang_label;
  }
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.value = lang;
  }
}

// --- Theme helpers ---
function getCurrentTheme() {
  try {
    const v = localStorage.getItem("aiagenthub_theme");
    if (v && ["original","light","blue"].includes(v)) return v;
  } catch {}
  return "original";
}

function setCurrentTheme(theme) {
  const body = document.body;
  if (!body) return;
  const allowed = new Set(["original", "light", "blue"]);
  if (!allowed.has(theme)) theme = "original";
  body.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("aiagenthub_theme", theme);
  }
 catch {}
}

// --- Auth state (demo only) ---
function getDemoUser() {
  try {
    const raw = localStorage.getItem("aiagenthub_user");
    return raw ? JSON.parse(raw) : null;
  } catch {} {
    return null;
  }
}

function setDemoUser(user) {
  try {
    localStorage.setItem("aiagenthub_user", JSON.stringify(user));
    localStorage.removeItem("aiagenthub_guest");
  } catch {}
}

function setGuest() {
  try {
    localStorage.setItem("aiagenthub_guest", "1");
    localStorage.removeItem("aiagenthub_user");
  } catch {}
}

function isGuest() {
  try {
    return localStorage.getItem("aiagenthub_guest") === "1";
  } catch {} {
    return false;
  }
}

function isAuthedOrGuest() {
  return !!getDemoUser() || isGuest();
}

// --- Modal controls ---
function openAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.style.display = "flex";
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.style.display = "none";
}

// --- Agent card template ---
function agentCardHTML(a) {
  return `
    <article class="agent-card" data-agent-id="${a.id}">
      <div class="agent-card-header">
        <div>
          <div class="agent-name">${a.name}</div>
          <div class="agent-desc">${a.short}</div>
        </div>
        <div class="agent-category">${a.category}</div>
      </div>
      <div class="agent-tags">
        ${a.tags.map((t) => `<span class="agent-tag">${t}</span>`).join("")}
      </div>
      <div class="agent-actions">
        <button class="primary connect-btn" type="button">
          <span>Подключить</span>
        </button>
        <button class="more-btn" type="button">
          <span>Подробнее</span>
        </button>
      </div>
      <div class="agent-more" style="display:none;">
        <div><strong>Use case:</strong> ${a.useCase}</div>
        <div><strong>Пример запроса:</strong> ${a.examplePrompt}</div>
        <div><strong>Интеграции:</strong> ${a.integrations.join(", ")}</div>
        <div><strong>Условия:</strong> ${a.pricingNote}</div>
      </div>
    </article>
  `;
}

// --- DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  // Apply stored theme as early as possible
  setCurrentTheme(getCurrentTheme());

  // Burger / mobile nav
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const visible = mobileNav.style.display === "flex";
      mobileNav.style.display = visible ? "none" : "flex";
    });
  }

  // Language toggle
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = getCurrentLang() === "ru" ? "en" : "ru";
      setCurrentLang(next);
      applyTranslations();
    });
  }

  // Theme select (Settings)
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.value = getCurrentTheme();
    themeSelect.addEventListener("change", () => {
      setCurrentTheme(themeSelect.value);
    });
  } else {
    // Ensure theme is applied on pages без селектора
    setCurrentTheme(getCurrentTheme());
  }

  // Header auth button
  const openAuthFromHeader = document.getElementById("openAuthFromHeader");
  if (openAuthFromHeader) {
    openAuthFromHeader.addEventListener("click", () => openAuthModal());
  }

  // Auth modal elements
  const authModal = document.getElementById("authModal");
  const authClose = document.getElementById("authClose");
  const tabRegister = document.getElementById("tabRegister");
  const tabLogin = document.getElementById("tabLogin");
  const authSubmit = document.getElementById("authSubmit");
  const authSkip = document.getElementById("authSkip");
  const authName = document.getElementById("authName");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");

  let authMode = "register";

  if (authClose && authModal) {
    authClose.addEventListener("click", () => closeAuthModal());
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  if (tabRegister && tabLogin) {
    tabRegister.addEventListener("click", () => {
      authMode = "register";
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
    });
    tabLogin.addEventListener("click", () => {
      authMode = "login";
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
    });
  }

  if (authSubmit) {
    authSubmit.addEventListener("click", () => {
      if (!authEmail || !authPassword) return;
      const email = authEmail.value.trim();
      const pass = authPassword.value.trim();
      const name = authName ? authName.value.trim() : "";
      if (!email || !pass) {
        alert("Заполните email и пароль (демо).");
        return;
      }
      const user = { email, name: name || "Demo User" };
      setDemoUser(user);
      alert(authMode === "register"
        ? "Регистрация выполнена (демо). В реале здесь будет backend."
        : "Вход выполнен (демо).");
      closeAuthModal();
    });
  }

  if (authSkip) {
    authSkip.addEventListener("click", () => {
      setGuest();
      alert("Вы продолжаете как гость. Некоторые функции могут быть ограничены.");
      closeAuthModal();
    });
  }

  // Support & Requests forms (demo)
  const supportForm = document.getElementById("supportForm");
  if (supportForm) {
    supportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Заявка в техподдержку отправлена (демо).");
      supportForm.reset();
    });
  }

  const requestAgentForm = document.getElementById("requestAgentForm");
  if (requestAgentForm) {
    requestAgentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Идея агента отправлена (демо).");
      requestAgentForm.reset();
    });
  }

  const requestPartnerForm = document.getElementById("requestPartnerForm");
  if (requestPartnerForm) {
    requestPartnerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Партнёрский запрос / пожелание отправлено (демо).");
      requestPartnerForm.reset();
    });
  }

  // Settings demo save
  const settingsBtn = document.getElementById("settingsSaveBtn");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      alert("Настройки сохранены (демо). В продакшене данные уйдут в backend.");
    });
  }

  // Render hero agents
  const heroAgentsContainer = document.getElementById("heroAgents");
  if (heroAgentsContainer) {
    const featured = AGENTS.filter((a) => a.featured).slice(0, 4);
    heroAgentsContainer.innerHTML = featured.map((a) => `
      <div class="hero-agent-card">
        <strong>${a.name}</strong>
        <div class="agent-desc">${a.short}</div>
        <div class="hero-agent-meta">
          <span>${a.category}</span>
          <div style="font-size:8px;color:#22c55e;">↑ live</div>
        </div>
      </div>
    `).join("");
  }

  // Render featured agents on index
  const featuredGrid = document.getElementById("featuredAgents");
  if (featuredGrid) {
    const featured = AGENTS.filter((a) => a.featured);
    featuredGrid.innerHTML = featured.map(agentCardHTML).join("");
  }

  // Catalog page logic
  const catalogGrid = document.getElementById("catalogAgents");
  const searchInput = document.getElementById("searchInput");
  const filterChips = document.querySelectorAll("#filterChips .filter-chip");

  function renderCatalog() {
    if (!catalogGrid) return;
    const query = (searchInput?.value || "").toLowerCase();
    const activeChip = document.querySelector("#filterChips .filter-chip.active");
    const category = activeChip ? activeChip.getAttribute("data-category") : "all";

    const filtered = AGENTS.filter((a) => {
      const matchesCategory = category === "all" || a.category === category;
      const text = (a.name + " " + a.short + " " + a.tags.join(" ")).toLowerCase();
      const matchesQuery = !query || text.includes(query);
      return matchesCategory && matchesQuery;
    });

    catalogGrid.innerHTML = filtered.length
      ? filtered.map(agentCardHTML).join("")
      : '<div style="font-size:11px;color:#6b7280;">Ничего не найдено под ваш запрос. Попробуйте изменить фильтры.</div>';
  }

  if (filterChips.length && catalogGrid) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderCatalog();
      });
    });
  }

  if (searchInput && catalogGrid) {
    searchInput.addEventListener("input", renderCatalog);
  }

  if (catalogGrid) {
    renderCatalog();
  }

  // Admin table
  const adminTableBody = document.querySelector("#adminAgentsTable tbody");
  if (adminTableBody) {
    adminTableBody.innerHTML = AGENTS.map((a, index) => {
      const status =
        index % 3 === 0
          ? '<span class="status-pill status-live"><span class="dot"></span>live</span>'
          : index % 3 === 1
          ? '<span class="status-pill status-review"><span class="dot"></span>review</span>'
          : '<span class="status-pill status-draft"><span class="dot"></span>draft</span>';
      return `
        <tr>
          <td>${a.name}</td>
          <td>${a.category}</td>
          <td>${status}</td>
          <td>
            <button style="padding:2px 6px;font-size:8px;border-radius:8px;border:1px solid rgba(75,85,99,0.9);background:var(--bg-main);color:var(--text-soft);cursor:pointer;">
              open
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Agent actions: connect + more (delegated)
  document.addEventListener("click", (e) => {
    const moreBtn = e.target.closest(".more-btn");
    if (moreBtn) {
      const card = moreBtn.closest(".agent-card");
      if (!card) return;
      const more = card.querySelector(".agent-more");
      if (!more) return;
      const isOpen = more.style.display === "block";
      more.style.display = isOpen ? "none" : "block";
      const span = moreBtn.querySelector("span");
      if (span) span.textContent = isOpen ? "Подробнее" : "Свернуть";
    }

    const connectBtn = e.target.closest(".connect-btn");
    if (connectBtn) {
      if (!isAuthedOrGuest()) {
        openAuthModal();
      } else {
        alert("Подключение агента (демо). В реальном запуске здесь логика интеграции.");
      }
    }
  });

  // Scroll fade-in
  const fadeEls = document.querySelectorAll(".fade-in");
  if (fadeEls.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach((el) => obs.observe(el));
  }

  // Apply translations last
  applyTranslations();
});

// Single-open toggle for agent cards
function closeAllAgentCards(except) {
  document.querySelectorAll(".agent-card.expanded").forEach((card) => {
    if (except && card === except) return;
    card.classList.remove("expanded");
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-role='agent-more']");
  if (!btn) return;
  const card = e.target.closest(".agent-card");
  if (!card) return;
  const willOpen = !card.classList.contains("expanded");
  closeAllAgentCards(card);
  if (willOpen) card.classList.add("expanded");
});

function hydrateI18NThemeLabels(){
  if(!I18N) return;
  if(!I18N.en) I18N.en = {};
  I18N.en.theme_original = I18N.en.theme_original || "Original";
  I18N.en.theme_light = I18N.en.theme_light || "Light";
  I18N.en.theme_blue = I18N.en.theme_blue || "Dark Blue";
  if(!I18N.ru) I18N.ru = {};
  I18N.ru.theme_original = I18N.ru.theme_original || "Оригинальная";
  I18N.ru.theme_light = I18N.ru.theme_light || "Светлая";
  I18N.ru.theme_blue = I18N.ru.theme_blue || "Тёмно‑синяя";
}
document.addEventListener("DOMContentLoaded", hydrateI18NThemeLabels);
