/* ================================================
   Ayaka's Hair Salon - Main JavaScript
   Navigation, Menu Tabs, i18n, Scroll Animations
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenuTabs();
  initScrollReveal();
  initSmoothScroll();
  initI18n();
});

/* ================================================
   NAVBAR - Sticky + Mobile Hamburger
   ================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  // Scroll handling
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 60);
    lastScroll = currentScroll;
  }, { passive: true });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ================================================
   MENU TABS
   ================================================ */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show target category
      categories.forEach(cat => {
        cat.classList.remove('active');
        if (cat.id === `cat-${target}`) {
          cat.classList.add('active');
        }
      });
    });
  });
}

/* ================================================
   SCROLL REVEAL (Intersection Observer)
   ================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal (performance)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ================================================
   i18n (Bilingual EN/JA)
   ================================================ */
const translations = {
  en: {
    // Nav
    nav_about: 'About',
    nav_menu: 'Menu',
    nav_gallery: 'Gallery',
    nav_access: 'Access',
    nav_booking: 'Book Now',
    lang_switch: '日本語',

    // Hero
    hero_label: 'Japanese Hair Salon in Gold Coast',
    hero_title: 'No Name',
    hero_subtitle: 'Japanese precision and care,\nright here on the Gold Coast.',
    hero_name_notice: '(Name under consideration)',
    hero_cta: 'Book Now',
    hero_cta2: 'View Menu',

    // Values
    values_label: 'Our Values',
    values_title: 'What We Value',
    values_subtitle: 'We prioritize a calm environment and meticulous care for every client.',

    values_1_title: 'Precision Technique',
    values_1_desc: 'Japanese cutting techniques refined through years of training. We pay attention to every strand.',
    values_2_title: 'Personal Consultation',
    values_2_desc: 'We take the time to understand your hair, lifestyle, and goals before picking up the scissors.',
    values_3_title: 'Relaxing Space',
    values_3_desc: 'A calm, private atmosphere where you can unwind and enjoy personalized, meticulous service.',

    // Menu
    menu_label: 'Services',
    menu_title: 'Menu',
    menu_subtitle: 'All cuts include shampoo and styling. Prices may vary depending on hair length.',

    tab_cut: 'Cut',
    tab_color: 'Color',
    tab_perm: 'Perm',
    tab_straight: 'Straight',
    tab_others: 'Others',

    cat_cut_title: 'Cut — Includes Shampoo & Styling',
    menu_mens: 'Mens Cut',
    menu_ladies: 'Ladies Cut',

    cat_color_title: 'Color',
    menu_regrowth: 'Regrowth (~2cm)',
    menu_fullcolor: 'Full Color',
    menu_bleach_regrowth: 'Bleach Regrowth (~2cm)',
    menu_fullbleach: 'Full Bleach',

    cat_perm_title: 'Perm',
    menu_point_perm: 'Point Perm',
    menu_normal_perm: 'Normal Perm',
    menu_twist_spiral: 'Twist / Spiral Perm',

    cat_straight_title: 'Straight',
    menu_point_straight: 'Point Straight',
    menu_full_straight: 'Full Straight',
    menu_acid_treatment: 'Acid Hair Treatment',

    cat_others_title: 'Others',
    menu_treatment: 'Treatment',
    menu_headspa: 'Head Spa',

    menu_note: '※ S = Short / M = Medium / L = Long — For design color, please consult.',

    // Gallery
    gallery_label: 'Gallery',
    gallery_title: 'Our Work',
    gallery_subtitle: 'A selection of styles created at our salon.',
    gallery_cta: 'See more on Instagram →',

    // Booking
    booking_label: 'Reservation',
    booking_title: 'Book an Appointment',
    booking_subtitle: 'Reserve your spot online — quick and easy.',
    booking_placeholder: 'Online booking is available up to 6:00 PM.\nFor appointments after 6:00 PM, please consult with us via Instagram DM.',
    booking_policy: 'Cancellation Policy:\n- Until 1 day before: Free\n- Same-day: 100% of service fee\n- Rescheduling: Please contact us as early as possible.',

    // Access
    access_label: 'Find Us',
    access_title: 'Access',
    access_address_title: 'Address',
    access_address: 'Southport\n(Details will be sent after booking confirmed)',
    access_hours_title: 'Business Hours',
    access_hours_daily: '9:00 AM – 6:00 PM',
    access_hours_weekdays: 'Mon - Fri',
    access_hours_weekends: 'Sat, Sun, Holidays',
    access_parking_title: 'Parking',
    access_parking_desc: 'Please use the available street parking near the salon.',
    access_payment_title: 'Payment',
    access_payment_desc: 'Cash Only',
    access_hours_closed: 'Closed',

    // Footer
    footer_copyright: '© 2026 No Name. All rights reserved.',
  },

  ja: {
    // Nav
    nav_about: 'こだわり',
    nav_menu: 'メニュー',
    nav_gallery: 'ギャラリー',
    nav_access: 'アクセス',
    nav_booking: '予約する',
    lang_switch: 'English',

    // Hero
    hero_label: 'ゴールドコーストの日本人ヘアサロン',
    hero_title: 'No Name',
    hero_subtitle: '日本の繊細な技術と丁寧な接客を、\nゴールドコーストで。',
    hero_name_notice: '（店名は現在検討中です）',
    hero_cta: '予約する',
    hero_cta2: 'メニューを見る',

    // Values
    values_label: '私たちのこだわり',
    values_title: '大切にしていること',
    values_subtitle: 'お客様お一人おひとりと丁寧に向き合い、落ち着いた空間で特別なひとときを提供します。',

    values_1_title: '繊細なカット技術',
    values_1_desc: '日本で培った確かな技術で、一本一本の毛流れまで丁寧にカットします。',
    values_2_title: '丁寧なカウンセリング',
    values_2_desc: '髪質やライフスタイルをしっかり伺い、あなたに最適なスタイルをご提案します。',
    values_3_title: 'リラックスできる空間',
    values_3_desc: '落ち着いたプライベートな空間で、一人ひとりに合わせた丁寧な施術を大切にしています。',

    // Menu
    menu_label: 'サービス',
    menu_title: 'メニュー',
    menu_subtitle: 'すべてのカットにシャンプー・スタイリングが含まれます。価格は髪の長さにより変動する場合がございます。',

    tab_cut: 'カット',
    tab_color: 'カラー',
    tab_perm: 'パーマ',
    tab_straight: 'ストレート',
    tab_others: 'その他',

    cat_cut_title: 'カット — シャンプー・スタイリング込み',
    menu_mens: 'メンズカット',
    menu_ladies: 'レディースカット',

    cat_color_title: 'カラー',
    menu_regrowth: 'リタッチ（〜2cm）',
    menu_fullcolor: 'フルカラー',
    menu_bleach_regrowth: 'ブリーチリタッチ（〜2cm）',
    menu_fullbleach: 'フルブリーチ',

    cat_perm_title: 'パーマ',
    menu_point_perm: 'ポイントパーマ',
    menu_normal_perm: 'ノーマルパーマ',
    menu_twist_spiral: 'ツイスト / スパイラルパーマ',

    cat_straight_title: 'ストレート',
    menu_point_straight: 'ポイントストレート',
    menu_full_straight: 'フルストレート',
    menu_acid_treatment: '酸熱トリートメント',

    cat_others_title: 'その他',
    menu_treatment: 'トリートメント',
    menu_headspa: 'ヘッドスパ',

    menu_note: '※ S＝ショート / M＝ミディアム / L＝ロング — デザインカラーはご相談ください。',

    // Gallery
    gallery_label: 'ギャラリー',
    gallery_title: 'スタイル作品',
    gallery_subtitle: 'サロンで仕上げたスタイルの一部をご紹介します。',
    gallery_cta: 'Instagramでもっと見る →',

    // Booking
    booking_label: 'ご予約',
    booking_title: 'ご予約はこちら',
    booking_subtitle: 'オンラインで簡単にご予約いただけます。',
    booking_placeholder: 'オンラインでのご予約は18:00までとさせていただいております。\n18:00以降のご予約をご希望の場合は、InstagramのDMにてご相談ください。',
    booking_policy: 'キャンセルポリシー：\n・前日までのキャンセル・変更：無料\n・当日キャンセル：施術代金の100%\n・日程変更：お早めにご相談ください',

    // Access
    access_label: 'アクセス',
    access_title: 'アクセス',
    access_address_title: '住所',
    access_address: 'Southport\n（詳細は予約確定後にお送りします）',
    access_hours_title: '営業時間',
    access_hours_daily: '9:00 〜 18:00',
    access_hours_weekdays: '月 〜 金',
    access_hours_weekends: '土、日、祝祭日',
    access_parking_title: '駐車場',
    access_parking_desc: 'お近くの路上駐車スペースをご利用ください。',
    access_payment_title: 'お支払い方法',
    access_payment_desc: '現金のみ',
    access_hours_closed: '定休日',

    // Footer
    footer_copyright: "© 2026 No Name. All rights reserved.",
  }

};

function initI18n() {
  // Get saved language or detect from browser
  let currentLang = localStorage.getItem('salon-lang');
  if (!currentLang) {
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    currentLang = browserLang.startsWith('ja') ? 'ja' : 'en';
  }
  applyLanguage(currentLang);

  // Toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ja' : 'en';
      currentLang = newLang;
      localStorage.setItem('salon-lang', newLang);
      applyLanguage(newLang);
    });
  }
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      // Handle elements with newlines
      if (dict[key].includes('\n')) {
        el.innerHTML = dict[key].replace(/\n/g, '<br>');
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Update toggle button text
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = dict.lang_switch;
  }
}
