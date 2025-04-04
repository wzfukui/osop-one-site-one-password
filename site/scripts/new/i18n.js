/**
 * 一站一密 (OSOP) - i18n国际化支持
 * 支持中英文两种语言
 */

// 默认语言为中文
let currentLanguage = 'zh';

// 获取浏览器语言并设置初始语言
function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('en')) {
    currentLanguage = 'en';
  } else {
    currentLanguage = 'zh';
  }
  return currentLanguage;
}

// 翻译文本库
const translations = {
  // 主页和公共部分
  'app_name': {
    'zh': '一站一密',
    'en': 'One Site One Password'
  },
  'app_slogan': {
    'zh': '用时生成，而不是存储密码！',
    'en': 'Generate when needed, not store passwords!'
  },
  'hero_description': {
    'zh': '一站一密 (OSOP) 采用创新的"即时生成"理念，根据您的暗语和网站名称，通过先进的加密算法，为每个网站生成独立且安全的密码。无需记忆多个密码，无需担心数据库泄露，彻底摆脱密码管理的困扰。',
    'en': 'One Site One Password (OSOP) adopts the innovative "generate on demand" concept. Using your personal cipher and website name, it generates unique and secure passwords for each site through advanced encryption algorithms. No need to remember multiple passwords or worry about database leaks.'
  },
  'generator_title': {
    'zh': '捍卫密码，捍卫安全！',
    'en': 'Defend your passwords, protect your security!'
  },
  'site_name': {
    'zh': '网站名称',
    'en': 'Site Name'
  },
  'site_name_placeholder': {
    'zh': '例如: gmail, facebook, weibo.com',
    'en': 'e.g: gmail, facebook, twitter.com'
  },
  'initial_cipher': {
    'zh': '初始暗语',
    'en': 'Initial Cipher'
  },
  'cipher_placeholder': {
    'zh': '输入您的密钥 (至少5个字符)',
    'en': 'Enter your key (at least 5 characters)'
  },
  'generate_btn': {
    'zh': '生成密码',
    'en': 'Generate Password'
  },
  'generated_passwords': {
    'zh': '生成的密码',
    'en': 'Generated Passwords'
  },
  'short_password': {
    'zh': '短密码 (8位)',
    'en': 'Short Password (8 chars)'
  },
  'medium_password': {
    'zh': '中密码 (14位)',
    'en': 'Medium Password (14 chars)'
  },
  'long_password': {
    'zh': '长密码 (20位)',
    'en': 'Long Password (20 chars)'
  },
  'copy_btn': {
    'zh': '复制',
    'en': 'Copy'
  },
  'copied': {
    'zh': '已复制',
    'en': 'Copied'
  },
  'timer_text': {
    'zh': '密码将在 <span id="timer">60</span> 秒后自动清除',
    'en': 'Passwords will be cleared in <span id="timer">60</span> seconds'
  },
  'toast_copied': {
    'zh': '已复制到剪贴板',
    'en': 'Copied to clipboard'
  },
  'toast_copy_failed': {
    'zh': '复制失败，请重试',
    'en': 'Copy failed, please try again'
  },

  // 错误信息
  'error_site_empty': {
    'zh': '网站名称不能为空',
    'en': 'Site name cannot be empty'
  },
  'error_cipher_length': {
    'zh': '初始暗语长度至少需要5个字符',
    'en': 'Initial cipher must be at least 5 characters'
  },
  'error_same_input': {
    'zh': '网站名称和初始暗语不能相同',
    'en': 'Site name and initial cipher cannot be the same'
  },

  // 导航菜单
  'nav_generate': {
    'zh': '生成密码',
    'en': 'Generate'
  },
  'nav_features': {
    'zh': '功能特点',
    'en': 'Features'
  },
  'nav_usage': {
    'zh': '使用方法',
    'en': 'Usage'
  },
  'nav_security': {
    'zh': '安全说明',
    'en': 'Security'
  },
  'nav_faq': {
    'zh': '帮助中心',
    'en': 'FAQ'
  },
  'nav_privacy': {
    'zh': '隐私政策',
    'en': 'Privacy Policy'
  },

  // 特性描述
  'feature_1_title': {
    'zh': '即时生成，不留痕迹',
    'en': 'Generate on demand, leave no trace'
  },
  'feature_1_desc': {
    'zh': '不在本地或云端储存任何密码数据，每次需要时即时计算生成，用完即焚。',
    'en': 'No password data stored locally or in the cloud. Passwords are generated on demand and cleared after use.'
  },
  'feature_2_title': {
    'zh': '一个暗语走天下',
    'en': 'One cipher for all sites'
  },
  'feature_2_desc': {
    'zh': '只需记住一个初始暗语，告别密码记忆困扰，同时保证每个网站使用不同密码。',
    'en': 'Remember just one cipher to generate different passwords for all websites, eliminating the burden of memorizing multiple passwords.'
  },
  'feature_3_title': {
    'zh': '完全本地运算',
    'en': 'Completely local processing'
  },
  'feature_3_desc': {
    'zh': '所有计算在您的设备上完成，不向任何服务器发送数据，保证您的密钥绝对安全。',
    'en': 'All calculations are performed on your device, no data is sent to any server, ensuring absolute security of your key.'
  },
  'feature_4_title': {
    'zh': '抗推导加密算法',
    'en': 'Anti-derivation encryption'
  },
  'feature_4_desc': {
    'zh': '采用多重不可逆算法，即使某网站密码泄露也无法推导出您的初始暗语。',
    'en': 'Uses multiple irreversible algorithms. Even if a password is leaked, your initial cipher cannot be derived.'
  },
  'feature_5_title': {
    'zh': '灵活的密码长度',
    'en': 'Flexible password lengths'
  },
  'feature_5_desc': {
    'zh': '同时提供8位、14位和20位三种长度密码，满足不同网站的安全策略要求。',
    'en': 'Provides passwords in three lengths: 8, 14, and 20 characters, meeting different website security requirements.'
  },
  'feature_6_title': {
    'zh': '60秒自动清除',
    'en': '60-second auto-clear'
  },
  'feature_6_desc': {
    'zh': '生成的密码60秒后自动从页面清除，防止他人窥视，提供额外安全保障。',
    'en': 'Generated passwords are automatically cleared from the page after 60 seconds, preventing others from viewing them.'
  },
  'feature_7_title': {
    'zh': '支持离线使用',
    'en': 'Offline support'
  },
  'feature_7_desc': {
    'zh': '所有代码在本地执行，无需联网即可生成密码，即使在没有网络的环境中也能安全使用。',
    'en': 'All code runs locally, no internet connection required to generate passwords. Can be safely used even in offline environments.'
  },
  'feature_8_title': {
    'zh': 'Chrome插件支持',
    'en': 'Chrome extension available'
  },
  'feature_8_desc': {
    'zh': '提供便捷的Chrome浏览器扩展，使用更加简单，随时随地一键生成安全密码。',
    'en': 'A convenient Chrome browser extension is available, making it even easier to generate secure passwords anytime, anywhere.'
  },
  'feature_9_title': {
    'zh': '开源透明',
    'en': 'Open source transparency'
  },
  'feature_9_desc': {
    'zh': '代码完全开源，核心算法与界面分离，安全机制透明可查，欢迎专业人士审计和贡献。',
    'en': 'Completely open source code, core algorithms separated from interface, transparent security mechanisms open for audit and contribution by professionals.'
  },

  // 使用步骤
  'step_1_title': {
    'zh': '输入网站名称',
    'en': 'Enter website name'
  },
  'step_1_desc': {
    'zh': '在网站名称输入框中填写域名或特征字符（如 "gmail"、"weibo.com"）。',
    'en': 'Enter the domain name or characteristic string in the website name field (e.g., "gmail", "twitter.com").'
  },
  'step_2_title': {
    'zh': '输入初始暗语',
    'en': 'Enter your cipher'
  },
  'step_2_desc': {
    'zh': '输入您的初始暗语（建议使用一个复杂但容易记忆的短语，如一句话的首字母组合）。',
    'en': 'Enter your initial cipher (we recommend using something complex yet memorable, like the first letters of a phrase).'
  },
  'step_3_title': {
    'zh': '生成密码',
    'en': 'Generate password'
  },
  'step_3_desc': {
    'zh': '点击"生成密码"按钮，系统会立即计算并生成三种不同长度的强密码。',
    'en': 'Click the "Generate Password" button, and the system will immediately calculate and generate three strong passwords of different lengths.'
  },
  'step_4_title': {
    'zh': '选择并使用',
    'en': 'Select and use'
  },
  'step_4_desc': {
    'zh': '根据需要选择合适长度的密码，点击"复制"按钮复制到剪贴板使用。下次需要时重复相同步骤即可。',
    'en': 'Choose a password of suitable length according to your needs, click the "Copy" button to copy it to the clipboard. Repeat the same steps when you need it again.'
  },

  // 安全说明
  'security_1': {
    'zh': '完全无存储设计，杜绝数据库泄露风险，甚至密码管理器被黑客入侵的风险',
    'en': 'Zero-storage design eliminates risks of database leaks or password manager breaches'
  },
  'security_2': {
    'zh': '采用MD5+Salt+Base64多重加密，确保即使单个密码泄露也无法反推您的初始暗语',
    'en': 'Uses MD5+Salt+Base64 multi-layer encryption, ensuring your initial cipher cannot be reverse-engineered even if a password is leaked'
  },
  'security_3': {
    'zh': '网站名称作为加密因子，保证不同网站生成完全不同的密码，降低连锁攻击风险',
    'en': 'Website name serves as an encryption factor, ensuring completely different passwords for different sites, reducing chain attack risks'
  },
  'security_4': {
    'zh': '建议定期更换初始暗语，进一步提高安全性（比如每季度或半年更换一次）',
    'en': 'We recommend changing your initial cipher periodically to further enhance security (e.g., quarterly or semi-annually)'
  },
  'security_5': {
    'zh': '主要电子邮件账号建议使用其他方式管理（因为通常用于密码找回）',
    'en': 'We recommend managing your primary email account differently (as it\'s typically used for password recovery)'
  },
  'security_6': {
    'zh': '完全本地实现，支持离线使用，不联网也可安全生成密码',
    'en': 'Completely local implementation, supports offline use, passwords can be securely generated without internet connection'
  },
  'security_7': {
    'zh': '源代码公开透明，核心算法与界面分离，欢迎专业人士审计',
    'en': 'Source code is open and transparent, core algorithms separated from interface, professionals welcome to audit'
  },

  // 更新信息
  'update_info': {
    'zh': '算法更新时间: 2012.10.16 | UI更新时间: 2025.04.03',
    'en': 'Algorithm updated: 2012.10.16 | UI updated: 2025.04.03'
  },

  // FAQ页面
  'faq_title': {
    'zh': '常见问题',
    'en': 'Frequently Asked Questions'
  },
  'faq_q1': {
    'zh': '什么是一站一密？',
    'en': 'What is One Site One Password?'
  },
  'faq_a1': {
    'zh': '一站一密是一个密码生成器，它使用简单算法为每个网站生成唯一的强密码。与传统密码管理不同，我们不存储密码，而是在需要时生成。',
    'en': 'One Site One Password is a password generator that uses a simple algorithm to create unique strong passwords for each website. Unlike traditional password managers, we don\'t store passwords but generate them when needed.'
  },
  'faq_q2': {
    'zh': '为什么一站一密比密码管理更安全？',
    'en': 'Why is OSOP more secure than password managers?'
  },
  'faq_a2': {
    'zh': '传统密码管理器存储所有密码，成为攻击目标。一站一密不存储密码，没有数据库可被黑。所有密码生成在本地完成，提供更高安全性。',
    'en': 'Traditional password managers store all passwords, becoming targets for attacks. OSOP doesn\'t store passwords, so there\'s no database to hack. All password generation happens locally, providing better security.'
  },
  'faq_q3': {
    'zh': '如何使用一站一密？',
    'en': 'How do I use One Site One Password?'
  },
  'faq_a3': {
    'zh': '使用非常简单:<ol><li>输入网站名称（如"gmail"或"facebook"）</li><li>输入您的个人暗语（至少5个字符）</li><li>点击"生成密码"</li><li>选择并复制适合该网站的密码长度</li></ol>',
    'en': 'It\'s very simple to use:<ol><li>Enter the website name (like "gmail" or "facebook")</li><li>Enter your personal cipher (at least 5 characters)</li><li>Click "Generate Password"</li><li>Select and copy the password length suitable for that website</li></ol>'
  },
  'faq_q4': {
    'zh': '忘记暗语怎么办？',
    'en': 'What if I forget my cipher?'
  },
  'faq_a4': {
    'zh': '暗语是生成密码的关键。如果忘记，将无法重新生成相同密码。建议选择一个有意义但不易被猜到的暗语，或将其安全记录在离线介质上。',
    'en': 'The cipher is key to generating passwords. If forgotten, you won\'t be able to regenerate the same passwords. We recommend choosing a meaningful but not easily guessable cipher, or securely recording it offline.'
  },
  'faq_q5': {
    'zh': '每次生成的密码是否相同？',
    'en': 'Are the generated passwords the same each time?'
  },
  'faq_a5': {
    'zh': '是的，只要使用相同的网站名称和暗语，生成的密码一定相同。请确保输入一致（如总是使用"gmail"而非有时"gmail.com"）。',
    'en': 'Yes, as long as you use the same website name and cipher, the generated passwords will be identical. Make sure your inputs are consistent (e.g., always use "gmail" not sometimes "gmail.com").'
  },
  'faq_q6': {
    'zh': '密码强度如何？',
    'en': 'How strong are the passwords?'
  },
  'faq_a6': {
    'zh': '生成的密码包含大小写字母、数字和特殊字符，符合大多数网站要求。提供8位、14位和20位三种长度选择，适应不同安全需求。',
    'en': 'Generated passwords include uppercase and lowercase letters, numbers, and special characters, meeting most website requirements. We offer three lengths: 8, 14, and 20 characters to accommodate different security needs.'
  },
  'faq_q7': {
    'zh': '是否支持多种设备？',
    'en': 'Does it support multiple devices?'
  },
  'faq_a7': {
    'zh': '是的，一站一密可在任何浏览器中使用，同时提供Chrome扩展版本。只要使用相同的暗语和网站名，在任何设备上都能生成相同的密码。',
    'en': 'Yes, OSOP works in any browser and offers a Chrome extension. As long as you use the same cipher and website name, you\'ll generate identical passwords on any device.'
  },

  // 隐私政策页面
  'privacy_title': {
    'zh': '隐私政策',
    'en': 'Privacy Policy'
  },
  'privacy_intro': {
    'zh': '一站一密（OSOP）非常重视您的隐私保护。本隐私政策说明我们如何收集、使用、保护和共享您的信息。',
    'en': 'One Site One Password (OSOP) takes your privacy very seriously. This Privacy Policy explains how we collect, use, protect, and share your information.'
  },
  'privacy_collect_title': {
    'zh': '信息收集',
    'en': 'Information Collection'
  },
  'privacy_collect_content': {
    'zh': '我们不收集任何个人数据。所有密码生成计算完全在您的本地设备上进行，不会传输到我们的服务器或任何第三方服务器。',
    'en': 'We do not collect any personal data. All password generation calculations are performed entirely on your local device and are not transmitted to our servers or any third-party servers.'
  },
  'privacy_cookies_title': {
    'zh': 'Cookie使用',
    'en': 'Cookie Usage'
  },
  'privacy_cookies_content': {
    'zh': '我们不使用任何Cookie或类似技术来跟踪您的活动。',
    'en': 'We do not use any cookies or similar technologies to track your activity.'
  },
  'privacy_security_title': {
    'zh': '安全措施',
    'en': 'Security Measures'
  },
  'privacy_security_content': {
    'zh': '为保护您的信息安全：<ul><li>所有生成的密码在60秒后自动从页面清除</li><li>所有计算过程仅在您的浏览器内存中进行，不写入任何存储</li><li>我们的代码完全开源，您可以审计所有操作</li></ul>',
    'en': 'To protect your information security:<ul><li>All generated passwords are automatically cleared from the page after 60 seconds</li><li>All calculation processes are performed only in your browser\'s memory, not written to any storage</li><li>Our code is completely open source, and you can audit all operations</li></ul>'
  },
  'privacy_updates_title': {
    'zh': '政策更新',
    'en': 'Policy Updates'
  },
  'privacy_updates_content': {
    'zh': '我们可能会不时更新本隐私政策。建议您定期查看本页面以获取最新信息。',
    'en': 'We may update this Privacy Policy from time to time. We recommend that you review this page regularly for the latest information.'
  },
  'privacy_contact_title': {
    'zh': '联系我们',
    'en': 'Contact Us'
  },
  'privacy_contact_content': {
    'zh': '如果您对我们的隐私政策有任何疑问，请通过GitHub项目页面联系我们。',
    'en': 'If you have any questions about our Privacy Policy, please contact us through the GitHub project page.'
  },

  // 页脚
  'footer_github': {
    'zh': 'GitHub',
    'en': 'GitHub'
  },
  'footer_help': {
    'zh': '帮助',
    'en': 'Help'
  },
  'footer_web': {
    'zh': '网页版',
    'en': 'Web Version'
  },
  'footer_version': {
    'zh': '版本',
    'en': 'Version'
  },
  'footer_copyright': {
    'zh': '© 2012-2025 OSOP - 一站一密 捍卫密码，捍卫安全！',
    'en': '© 2012-2025 OSOP - One Site One Password Protect your passwords, secure your identity!'
  }
};

// 获取指定键的翻译文本
function t(key) {
  if (translations[key] && translations[key][currentLanguage]) {
    return translations[key][currentLanguage];
  }
  // 如果找不到对应翻译，返回键值作为后备
  return key;
}

// 切换语言
function switchLanguage(lang) {
  if (lang === 'zh' || lang === 'en') {
    currentLanguage = lang;
    localStorage.setItem('osop_language', lang);
    updatePageText();
    // 添加事件触发，让其他脚本知道语言已改变
    document.dispatchEvent(new Event('languageChanged'));
    return true;
  }
  return false;
}

// 从localStorage加载用户语言偏好
function loadLanguagePreference() {
  const savedLang = localStorage.getItem('osop_language');
  if (savedLang === 'zh' || savedLang === 'en') {
    currentLanguage = savedLang;
  } else {
    detectLanguage();
  }
  return currentLanguage;
}

// 更新页面所有带有data-i18n属性的元素文本
function updatePageText() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
        element.placeholder = t(key);
      } else {
        element.innerHTML = t(key);
      }
    }
  });
}

// 导出函数和变量
window.OSOP_i18n = {
  t,
  switchLanguage,
  detectLanguage,
  loadLanguagePreference,
  updatePageText,
  get currentLanguage() { return currentLanguage; }
}; 