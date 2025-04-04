// OSOP - One Site One Password
// 扩展版 JavaScript
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
  
  // 初始化语言
  OSOP_i18n.loadLanguagePreference();
  OSOP_i18n.updatePageText();
  
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
    const existingToasts = document.querySelectorAll('.toast-message');
    existingToasts.forEach(el => el.parentNode.removeChild(el));
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示toast
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // 3秒后隐藏并移除
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
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
    
    // 显示结果区域并平滑滚动到结果
    if ($result.is(':hidden')) {
      $result.slideDown(300);
    } else {
      $result.slideUp(100).slideDown(300);
    }
    
    // 填充生成的密码
    $shortPassword.val(GeneratePassword(superPassword, 8));
    $mediumPassword.val(GeneratePassword(superPassword, 14));
    $longPassword.val(GeneratePassword(superPassword, 20));
    
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
    // 移除现有错误消息
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(el => el.parentNode.removeChild(el));
    
    // 创建新的错误消息
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.opacity = '0';
    document.body.appendChild(errorMessage);
    
    // 显示错误信息
    setTimeout(() => errorMessage.style.opacity = '1', 10);
    
    // 3秒后移除错误信息
    setTimeout(() => {
      errorMessage.style.opacity = '0';
      setTimeout(() => {
        if (errorMessage.parentNode) {
          document.body.removeChild(errorMessage);
        }
      }, 300);
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
  
  // 创建超级密码
  function createSuperPassword(siteName, mycipher) {
    return MyCrypt20121016('2.0.0', 'QwErTyUiOpLkJhGfDsAzXcVbNm<>()', siteName, mycipher);
  }
  
  // 页面加载完成后自动聚焦网站名称输入框
  setTimeout(() => {
    $siteName.focus();
  }, 500);
}); 