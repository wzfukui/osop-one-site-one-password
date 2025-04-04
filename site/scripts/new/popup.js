// OSOP - One Site One Password
// Version 2.0.0
$(document).ready(function() {
  // 元素缓存
  const $siteName = $('#siteName');
  const $myCipher = $('#myCipher');
  const $generateBtn = $('#generateBtn');
  const $result = $('#result');
  const $shortPassword = $('#shortPassword');
  const $mediumPassword = $('#mediumPassword');
  const $longPassword = $('#longPassword');
  const $timer = $('#timer');
  const $progressBar = $('#progressBar');
  const $togglePassword = $('#togglePassword');
  
  // 初始化i18n
  let currentLang = 'zh';
  
  // 检测浏览器语言并设置初始语言
  if (window.OSOP_i18n) {
    currentLang = OSOP_i18n.loadLanguagePreference();
    OSOP_i18n.updatePageText();
  } else {
    // 如果i18n模块不存在，创建一个简单的后备实现
    window.OSOP_i18n = {
      t: function(key) {
        return key;
      }
    };
    
    // 尝试检测浏览器语言
    try {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('en')) {
        currentLang = 'en';
        updateSimpleTranslations();
      }
    } catch (e) {
      console.error('Language detection failed:', e);
    }
  }
  
  // 简单的翻译更新函数（当i18n模块不可用时）
  function updateSimpleTranslations() {
    if (currentLang === 'en') {
      // 使用英文
      $('[data-i18n="app_name"]').text('One Site One Password');
      $('[data-i18n="app_slogan"]').text('Generate when needed, not store passwords!');
      $('[data-i18n="site_name"]').text('Site Name');
      $('#siteName').attr('placeholder', 'e.g: gmail, facebook, twitter.com');
      $('[data-i18n="initial_cipher"]').text('Initial Cipher');
      $('#myCipher').attr('placeholder', 'Enter your key (at least 5 characters)');
      $('[data-i18n="generate_btn"]').text('Generate Password');
      $('[data-i18n="generated_passwords"]').text('Generated Passwords');
      $('[data-i18n="short_password"]').text('Short Password (8 chars)');
      $('[data-i18n="medium_password"]').text('Medium Password (14 chars)');
      $('[data-i18n="long_password"]').text('Long Password (20 chars)');
      $('.copy-btn').text('Copy');
      $('[data-i18n="timer_text"]').html('Passwords will be cleared in <span id="timer">60</span> seconds');
    }
  }
  
  // 密码查看切换
  $togglePassword.on('click', function() {
    const type = $myCipher.attr('type') === 'password' ? 'text' : 'password';
    $myCipher.attr('type', type);
    $(this).find('.eye-icon').text(type === 'password' ? '👁️' : '👁️‍🗨️');
  });
  
  // 密码生成按钮点击事件
  $generateBtn.on('click', function() {
    generatePasswords();
  });
  
  // 回车键生成密码
  $myCipher.on('keypress', function(e) {
    if (e.which === 13) {
      generatePasswords();
    }
  });
  
  // 修改复制按钮事件，防止文本高亮选择
  $('.copy-btn').on('click', function() {
    const targetId = $(this).data('target');
    const $target = $('#' + targetId);
    
    // 获取值但不选择文本
    const textToCopy = $target.val();
    
    // 使用Clipboard API复制文本
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(OSOP_i18n.t('toast_copied'));
        // 按钮视觉反馈
        $(this).addClass('copy-success');
        $(this).text(OSOP_i18n.t('copied'));
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
          $(this).removeClass('copy-success');
          $(this).text(OSOP_i18n.t('copy_btn'));
        }, 2000);
      }).catch(err => {
        console.error('复制失败: ', err);
        showToast(OSOP_i18n.t('toast_copy_failed'));
      });
    } else {
      // 回退方案：创建临时元素复制
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';  // 避免滚动到底部
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        showToast(OSOP_i18n.t('toast_copied'));
        // 按钮视觉反馈
        $(this).addClass('copy-success');
        $(this).text(OSOP_i18n.t('copied'));
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
          $(this).removeClass('copy-success');
          $(this).text(OSOP_i18n.t('copy_btn'));
        }, 2000);
      } catch (err) {
        console.error('复制失败: ', err);
        showToast(OSOP_i18n.t('toast_copy_failed'));
      }
      
      document.body.removeChild(textarea);
    }
  });
  
  // 注册语言改变事件监听器，更新复制按钮文本
  document.addEventListener('languageChanged', function() {
    $('.copy-btn').each(function() {
      // 更新按钮上的文本为当前语言
      $(this).text(OSOP_i18n.t('copy_btn'));
    });
  });
  
  // 添加Toast提示函数
  function showToast(message) {
    // 移除现有的toast
    $('.toast-message').remove();
    
    // 创建toast元素
    const $toast = $('<div class="toast-message">' + message + '</div>');
    $('body').append($toast);
    
    // 显示toast
    setTimeout(() => $toast.addClass('show'), 10);
    
    // 3秒后隐藏并移除
    setTimeout(() => {
      $toast.removeClass('show');
      setTimeout(() => $toast.remove(), 300);
    }, 2000);
  }
  
  // 生成密码的主函数
  function generatePasswords() {
    const siteName = $siteName.val().trim();
    const mycipher = $myCipher.val();
    
    if (!validateInput(siteName, mycipher)) {
      return false;
    }
    
    const superPassword = createSuperPassword(siteName, mycipher);
    
    // 显示结果区域
    $result.slideUp(100).slideDown(300);
    
    // 填充生成的密码
    $shortPassword.val(generatePassword(superPassword, 8));
    $mediumPassword.val(generatePassword(superPassword, 14));
    $longPassword.val(generatePassword(superPassword, 20));
    
    // 清空初始暗语输入框
    $myCipher.val('');
    
    // 开始倒计时
    startTimer();
    
    return true;
  }
  
  // 验证输入
  function validateInput(siteName, cipher) {
    if (siteName.length < 1) {
      showError(OSOP_i18n.t('error_site_empty'));
      return false;
    }
    
    if (cipher.length < 5) {
      showError(OSOP_i18n.t('error_cipher_length'));
      return false;
    }
    
    if (siteName === cipher) {
      showError(OSOP_i18n.t('error_same_input'));
      return false;
    }
    
    return true;
  }
  
  // 显示错误信息
  function showError(message) {
    // 使用更现代的通知方式
    const $errorMessage = $('<div class="error-message">').text(message);
    $errorMessage.css({
      'position': 'fixed',
      'top': '10px',
      'left': '50%',
      'transform': 'translateX(-50%)',
      'background-color': 'var(--danger)',
      'color': 'white',
      'padding': '10px 16px',
      'border-radius': '6px',
      'font-size': '14px',
      'z-index': 1000,
      'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
      'opacity': 0,
      'transition': 'opacity 0.3s ease'
    });
    
    $('body').append($errorMessage);
    
    // 显示错误信息
    setTimeout(() => $errorMessage.css('opacity', 1), 10);
    
    // 3秒后移除错误信息
    setTimeout(() => {
      $errorMessage.css('opacity', 0);
      setTimeout(() => $errorMessage.remove(), 300);
    }, 3000);
  }
  
  // 开始60秒倒计时清除密码
  function startTimer() {
    let secondsLeft = 60;
    updateTimer(secondsLeft);
    
    // 重置进度条
    $progressBar.css('width', '100%');
    
    // 进度条动画
    $progressBar.css('transition', 'width 60s linear');
    $progressBar.css('width', '0%');
    
    // 清除之前的计时器
    if (window.passwordTimer) {
      clearInterval(window.passwordTimer);
    }
    
    // 设置新的计时器
    window.passwordTimer = setInterval(function() {
      secondsLeft--;
      updateTimer(secondsLeft);
      
      if (secondsLeft <= 0) {
        clearInterval(window.passwordTimer);
        clearPasswords();
      }
    }, 1000);
  }
  
  // 更新计时器显示
  function updateTimer(seconds) {
    $timer.text(seconds);
  }
  
  // 清除生成的密码
  function clearPasswords() {
    $shortPassword.val('');
    $mediumPassword.val('');
    $longPassword.val('');
    
    // 添加清除后的视觉反馈
    $result.slideUp(300);
    
    // 重置进度条
    setTimeout(() => {
      $progressBar.css('transition', 'none');
      $progressBar.css('width', '100%');
    }, 300);
  }
  
  // 以下是原始加密逻辑函数的封装
  
  // 创建超级密码
  function createSuperPassword(siteName, mycipher) {
    return MyCrypt20121016('2.0.0', 'QwErTyUiOpLkJhGfDsAzXcVbNm<>()', siteName, mycipher);
  }
  
  // 加密算法2012-10-16 (保持原有实现)
  function MyCrypt20121016(version, salt, siteName, mycipher) {
    let md5_1, md5_2, md5_3, md5_4;
    md5_1 = $.md5(salt + siteName);
    md5_2 = $.md5(salt + mycipher);
    md5_3 = $.md5(md5_1 + salt + md5_2);
    md5_4 = $.md5(md5_3 + salt);
    return $.base64.encode(md5_4);
  }
  
  // 根据长度生成不同的密码，按照原始实现方式
  function generatePassword(superPassword, length) {
    if (length < 6) {
      length = 6;
    }
    
    superPassword = superPassword.toUpperCase(); // 字符串转成大写

    const start = Math.ceil(length / 2);
    const tempPass = [];      // 临时字母表
    let digitalCount = 0;    // 临时字母表中数字的个数
    
    for (let i = 0; i < length; i++) {
      if (superPassword.charAt(i + start) <= '9' && superPassword.charAt(i + start) >= '0') {
        // 包含数字
        digitalCount++;
      }
      if ((i + start) % 2 === 0) {
        tempPass.push(superPassword.charAt(i + start).toLowerCase());
      }
      else {
        tempPass.push(superPassword.charAt(i + start));
      }
    }
    // 规避一个数字都没有的情况
    if (0 === digitalCount) {
      tempPass.pop();
      tempPass.push('0');
    }
    
    return tempPass.join('');
  }
  
  // 页面加载完成后聚焦网站名称输入框
  $siteName.focus();
}); 