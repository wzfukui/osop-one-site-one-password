/**
 * 一站一密 (OSOP) - 加密核心算法
 * 版本: 2.0.0
 */

var DEBUG = false; // 调试开关
var VERSION = '2.0.0'; // 版本
var SALTSTR = 'QwErTyUiOpLkJhGfDsAzXcVbNm<>()'; // 自定义盐值

/**
 * 加密算法2012-10-16
 * 生成超级密码
 */
function MyCrypt20121016(version, salt, v_sitename, v_mycipher) {
    var md5_1, md5_2, md5_3, md5_4;
    md5_1 = $.md5(salt + v_sitename);
    md5_2 = $.md5(salt + v_mycipher);
    md5_3 = $.md5(md5_1 + salt + md5_2);
    md5_4 = $.md5(md5_3 + salt);
    var base64str = $.base64.encode(md5_4);
    
    if (DEBUG) {
        console.log("md5_1:" + md5_1 + "\nmd5_2:" + md5_2 + "\nmd5_3:" + md5_3 + "\nmd5_4:" + md5_4 + "\nbase64:" + base64str);
    }
    
    return base64str;
}

/**
 * 生成指定长度的密码
 */
function GeneratePassword(superpass, length) {
    if (DEBUG) {
        console.log("GeneratePassword:" + superpass + "|" + length);
    }
    
    if (length < 6) {
        length = 6;
    }
    
    superpass = superpass.toUpperCase(); // 字符串转成大写

    var start = Math.ceil(length / 2);
    var temppass = []; // 临时字母表
    var DigitalCount = 0; // 临时字母表中数字的个数
    
    for (var i = 0; i < length; i++) {
        if (superpass.charAt(i + start) <= '9' && superpass.charAt(i + start) >= '0') {
            // 包含数字
            DigitalCount++;
        }
        
        if ((i + start) % 2 == 0) {
            temppass.push(superpass.charAt(i + start).toLowerCase());
        } else {
            temppass.push(superpass.charAt(i + start));
        }
    }
    
    // 规避一个数字都没有的情况
    if (0 == DigitalCount) {
        temppass.pop();
        temppass.push('0');
    }
    
    if (DEBUG) {
        console.log("生成长度为" + length + "的密码：" + temppass.join(''));
    }
    
    return temppass.join('');
}