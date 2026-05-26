/**
 * SHIFT Assistant — Rule-based FAQ chatbot
 * Self-contained: injects its own styles and DOM elements.
 */
(function () {
  /* ── Base path detection (handles /products/ subdirectory) ── */
  const scriptEl =
    document.currentScript ||
    (function () {
      const all = document.querySelectorAll('script[src*="chatbot.js"]');
      return all[all.length - 1];
    })();
  const pageDir = window.location.pathname.replace(/[^/]*$/, '');
  const base = pageDir.endsWith('/products/') ? '../' : '';

  /* ── Inject stylesheet ── */
  const linkEl = document.createElement('link');
  linkEl.rel = 'stylesheet';
  linkEl.href = base + 'css/chatbot.css';
  document.head.appendChild(linkEl);

  /* ── FAQ knowledge base ── */
  const FAQS = [
    {
      keywords: ['hello', 'hi', 'hey', 'greet', 'start', 'howdy'],
      answer:
        "Hello! 👋 I'm the SHIFT Assistant. Ask me anything about our products, team, roadmap, or how to get in touch.",
    },
    {
      keywords: ['what is shift', 'about shift', 'shift mean', 'shift stand', 'shift hub', 'what shift'],
      answer:
        "<strong>SHIFT</strong> stands for <em>Smart Hub for Intelligent Future Technology</em>. It's Lumax Auto Technologies' R&D initiative focused on Software Defined Vehicles — advancing ADAS, connectivity, and in-cabin experiences for next-gen automobiles.",
    },
    {
      keywords: ['lumax', 'who is lumax', 'lumax auto', 'parent company', 'latl'],
      answer:
        '<strong>Lumax Auto Technologies Limited (LATL)</strong> is a leading Indian automotive components manufacturer. SHIFT is their dedicated R&D hub, developing cutting-edge SDV systems for OEMs like Maruti Suzuki (MSIL) and Tata Motors.',
    },
    {
      keywords: ['sdv', 'software defined vehicle', 'software defined', 'connected car', 'ota'],
      answer:
        '<strong>Software Defined Vehicles (SDVs)</strong> are automobiles where software governs core functions — enabling over-the-air updates, advanced personalization, and higher autonomy. SHIFT is Lumax\'s dedicated hub driving this transformation for Indian OEMs.',
    },
    {
      keywords: ['dms', 'driver monitor', 'surround view', 'svm', 'driver safety'],
      answer:
        'Our <strong>DMS & SVM</strong> combines Driver Monitoring System and Surround View Monitoring — delivering driver safety, ADAS compliance, and parking assistance. Validated for MSIL and Tata platforms. <a href="' +
        base +
        'products/dms.html">→ Learn more</a>',
    },
    {
      keywords: ['svs', '360', '360 view', 'bird eye', 'parking camera'],
      answer:
        'The <strong>SVS (Surround View System)</strong> gives a 360° bird's-eye view for low-speed manoeuvring. It integrates seamlessly with our DMS and camera modules as part of the full ADAS stack.',
    },
    {
      keywords: ['camera', 'camera platform', 'imaging', 'vision sensor', 'camera module'],
      answer:
        'The <strong>Camera Platform</strong> is a scalable sensing module supporting both SVS and DMS applications with high-resolution automotive-grade imaging. <a href="' +
        base +
        'products/camera.html">→ View product</a>',
    },
    {
      keywords: ['sidestep', 'electric step', 'running board', 'step board', 'auto step'],
      answer:
        'The <strong>Sidestep</strong> is an intelligent electric running board that auto-deploys when doors open and retracts when they close — adding convenience and a premium feel to SUVs. <a href="' +
        base +
        'products/sidestep.html">→ View product</a>',
    },
    {
      keywords: ['motor controller', 'bldc', 'dc motor', 'motor control', 'powertrain controller'],
      answer:
        'Our <strong>Motor Controller</strong> is a scalable DC & BLDC controller platform for automotive powertrain and body electronics, with automotive-grade reliability. <a href="' +
        base +
        'products/motor-controller.html">→ View product</a>',
    },
    {
      keywords: ['type c', 'usb c', 'usb-c', 'fast charge', 'usb hub', 'charging hub', 'pd charging'],
      answer:
        'Our <strong>USB-C Hub</strong> delivers multimedia connectivity and fast PD charging in one compact in-cabin module. <a href="' +
        base +
        'products/type-c-charger.html">→ View product</a>',
    },
    {
      keywords: ['wireless charger', 'wireless charging', 'qi', 'inductive', 'wireless charge'],
      answer:
        'The <strong>Wireless Charger</strong> provides Qi-standard inductive charging integrated into the centre console for a seamless cable-free experience. <a href="' +
        base +
        'products/wireless-charger.html">→ View product</a>',
    },
    {
      keywords: ['gesture', 'gesture control', 'hand gesture', 'gesture recognition', 'touchless'],
      answer:
        'Our <strong>Gesture Control</strong> module enables touchless control of infotainment, climate, and lighting via hand gesture recognition — keeping eyes on the road. <a href="' +
        base +
        'products/gesture-control.html">→ View product</a>',
    },
    {
      keywords: ['sbw', 'shift by wire', 'gear shift', 'gear shifter', 'steer by wire', 'electronic shifter'],
      answer:
        'The <strong>SBW Gear Shifter</strong> is a software-defined shift-by-wire system replacing mechanical gear linkage with electronic actuation — enabling cleaner cabin design and advanced drive modes. <a href="' +
        base +
        'products/sbw.html">→ View product</a>',
    },
    {
      keywords: ['product', 'products', 'portfolio', 'what do you make', 'solutions', 'all product'],
      answer:
        'SHIFT has <strong>9 products</strong> across 4 domains:<br><br>' +
        '🔵 <strong>ADAS:</strong> DMS & SVM, Camera Platform<br>' +
        '🟢 <strong>Body Electronics:</strong> Sidestep, SBW Gear Shifter<br>' +
        '🟡 <strong>Connectivity:</strong> USB-C Hub, Wireless Charger, Gesture Control<br>' +
        '🔴 <strong>Powertrain:</strong> Motor Controller<br><br>' +
        '<a href="' + base + 'products/index.html">→ See all products</a>',
    },
    {
      keywords: ['adas', 'advanced driver assistance', 'driver assistance', 'safety system', 'level 2', 'ncap'],
      answer:
        'SHIFT\'s ADAS portfolio includes <strong>DMS & SVM</strong> and the <strong>Camera Platform</strong> — validated for MSIL and Tata platforms, targeting NCAP compliance and Level 2+ autonomy support.',
    },
    {
      keywords: ['roadmap', 'timeline', 'launch', 'release', 'schedule', 'when launch', 'quarter', 'q1', 'q2', 'q3', 'q4'],
      answer:
        'Our roadmap spans Q1 2025 → Q4 2026:<br><br>' +
        '• Q1 2025: DMS & SVM, Motor Controller<br>' +
        '• Q3 2025: Camera Platform, Sidestep<br>' +
        '• Q1 2026: USB-C Hub, Wireless Charger<br>' +
        '• Q3–Q4 2026: Gesture Control, SBW<br><br>' +
        '<a href="' + base + 'roadmap.html">→ Full roadmap</a>',
    },
    {
      keywords: ['team', 'leadership', 'who leads', 'management', 'cto', 'head of', 'who is'],
      answer:
        'SHIFT leadership:<br><br>' +
        '• <strong>Satish Sundaresan</strong> — CTO<br>' +
        '• <strong>Satish Keni</strong> — R&D Delivery Head<br>' +
        '• <strong>Sindhu Santosh</strong> — HR<br>' +
        '• <strong>Rajesh Dabdi</strong> — Marketing<br><br>' +
        '<a href="' + base + 'team.html">→ Meet the full team</a>',
    },
    {
      keywords: ['contact', 'reach', 'email', 'get in touch', 'write to', 'talk to', 'message'],
      answer:
        'You can reach us via the <a href="' + base + 'contact.html">Contact page</a>. Key contacts:<br><br>' +
        '• <strong>Satish Sundaresan</strong> — CTO (Technology & OEM partnerships)<br>' +
        '• <strong>Satish Keni</strong> — R&D Delivery Head<br>' +
        '• <strong>Rajesh Dabdi</strong> — Marketing & business enquiries',
    },
    {
      keywords: ['career', 'job', 'hiring', 'open position', 'vacancy', 'join', 'apply', 'work here', 'recruit'],
      answer:
        'SHIFT currently has <strong>3 open positions</strong>:<br><br>' +
        '• ADAS Engineer<br>' +
        '• Embedded Firmware Engineer<br>' +
        '• Hardware Design Engineer<br><br>' +
        'Interested? Reach out via the <a href="' + base + 'contact.html">Contact page</a>.',
    },
    {
      keywords: ['insight', 'article', 'blog', 'research', 'publication', 'news', 'update', 'rd insight'],
      answer:
        'Our <a href="' + base + 'insights.html">R&D Insights</a> section features articles across Product, R&D, Events, and Team categories — covering ADAS innovations, SDV trends, and SHIFT product updates.',
    },
    {
      keywords: ['oem', 'customer', 'client', 'maruti', 'tata', 'msil', 'partner'],
      answer:
        "SHIFT's primary OEM partners are <strong>Maruti Suzuki (MSIL)</strong> and <strong>Tata Motors</strong>. Our products are validated specifically for their vehicle platforms.",
    },
  ];

  const SUGGESTIONS = [
    'What is SHIFT?',
    'Show me products',
    "What's on the roadmap?",
    'Who is the CTO?',
    'How do I contact you?',
    'Are there open positions?',
  ];

  const FALLBACK =
    "I'm not sure about that one. Try asking about our <a href=\"" +
    base +
    'products/index.html">products</a>, <a href="' +
    base +
    'team.html">team</a>, <a href="' +
    base +
    'roadmap.html">roadmap</a>, or <a href="' +
    base +
    'contact.html">contact us</a> directly.';

  /* ── Scoring / matching ── */
  function findAnswer(input) {
    const q = input.toLowerCase().replace(/[?!.,]/g, '');
    let best = null;
    let bestScore = 0;

    for (const faq of FAQS) {
      let score = 0;
      for (const kw of faq.keywords) {
        if (q.includes(kw)) score += kw.split(' ').length; // multi-word keywords score higher
      }
      if (score > bestScore) {
        bestScore = score;
        best = faq;
      }
    }
    return bestScore > 0 ? best.answer : FALLBACK;
  }

  /* ── Build DOM ── */
  const bubble = document.createElement('div');
  bubble.id = 'cb-bubble';
  bubble.setAttribute('role', 'button');
  bubble.setAttribute('aria-label', 'Open SHIFT chat assistant');
  bubble.setAttribute('tabindex', '0');
  bubble.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    '<span id="cb-notif" class="cb-notif">1</span>';

  const win = document.createElement('div');
  win.id = 'cb-win';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-modal', 'true');
  win.setAttribute('aria-label', 'SHIFT Chat Assistant');
  win.innerHTML =
    '<div class="cb-header">' +
    '  <div class="cb-header-left">' +
    '    <div class="cb-avatar">S</div>' +
    '    <div>' +
    '      <div class="cb-name">SHIFT Assistant</div>' +
    '      <div class="cb-status"><span class="cb-dot"></span>Online · Instant replies</div>' +
    '    </div>' +
    '  </div>' +
    '  <button id="cb-close" class="cb-close-btn" aria-label="Close chat">' +
    '    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '  </button>' +
    '</div>' +
    '<div id="cb-msgs" class="cb-msgs" aria-live="polite"></div>' +
    '<div id="cb-sugg" class="cb-sugg"></div>' +
    '<div class="cb-input-row">' +
    '  <input id="cb-input" class="cb-input" type="text" placeholder="Ask about products, team, roadmap…" autocomplete="off" aria-label="Chat message">' +
    '  <button id="cb-send" class="cb-send-btn" aria-label="Send message">' +
    '    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
    '  </button>' +
    '</div>';

  document.body.appendChild(bubble);
  document.body.appendChild(win);

  /* ── References ── */
  const notif   = document.getElementById('cb-notif');
  const msgs    = document.getElementById('cb-msgs');
  const suggBox = document.getElementById('cb-sugg');
  const input   = document.getElementById('cb-input');
  const sendBtn = document.getElementById('cb-send');
  const closeBtn = document.getElementById('cb-close');

  let isOpen = false;
  let welcomed = false;

  /* ── Helpers ── */
  function scrollToBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addMsg(html, role) {
    const el = document.createElement('div');
    el.className = 'cb-msg cb-msg--' + role;
    el.innerHTML = html;
    msgs.appendChild(el);
    scrollToBottom();
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'cb-msg cb-msg--bot cb-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    scrollToBottom();
    return el;
  }

  function botReply(html, delay) {
    const typing = showTyping();
    setTimeout(function () {
      typing.remove();
      addMsg(html, 'bot');
    }, delay || 850);
  }

  function renderSuggestions() {
    suggBox.innerHTML = '';
    SUGGESTIONS.forEach(function (s) {
      const chip = document.createElement('button');
      chip.className = 'cb-chip';
      chip.textContent = s;
      chip.addEventListener('click', function () {
        sendMessage(s);
        suggBox.innerHTML = '';
      });
      suggBox.appendChild(chip);
    });
  }

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    input.value = '';
    suggBox.innerHTML = '';
    addMsg(trimmed, 'user');
    const answer = findAnswer(trimmed);
    botReply(answer, 850);
  }

  /* ── Open / close ── */
  function openChat() {
    isOpen = true;
    win.classList.add('cb-win--open');
    bubble.classList.add('cb-bubble--active');
    if (notif) notif.style.display = 'none';
    if (!welcomed) {
      welcomed = true;
      botReply(
        "👋 Hi! I'm the <strong>SHIFT Assistant</strong>. Ask me anything about our products, team, roadmap, or how to get in touch.",
        400
      );
      setTimeout(renderSuggestions, 1300);
    }
    setTimeout(function () { input.focus(); }, 350);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('cb-win--open');
    bubble.classList.remove('cb-bubble--active');
  }

  /* ── Events ── */
  bubble.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
  bubble.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); isOpen ? closeChat() : openChat(); }
  });
  closeBtn.addEventListener('click', closeChat);

  sendBtn.addEventListener('click', function () { sendMessage(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage(input.value);
  });
})();
