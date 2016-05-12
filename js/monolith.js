// ===================================
// USER AGENT
// ===================================
window.UA = (function() {
  var isIPad3, ua, ver, _ua;
  _ua = navigator.userAgent.toLowerCase();
  ua = {
    isIE: false,
    isIE6: false,
    isIE7: false,
    isIE8: false,
    isIE9: false,
    isLtIE9: false,
    isIOS: false,
    isIPhone: false,
    isIPad: false,
    isIPhone4: false,
    isIPad3: false,
    isAndroid: false,
    isAndroidMobile: false,
    isChrome: false,
    isSafari: false,
    isMozilla: false,
    isWebkit: false,
    isOpera: false,
    isPC: false,
    isTablet: false,
    isSmartPhone: false,
    browser: _ua
  };
  if (ua.isIE = /msie\s(\d+)/.test(_ua)) {
    ver = RegExp.$1;
    ver *= 1;
    ua.isIE6 = ver === 6;
    ua.isIE7 = ver === 7;
    ua.isIE8 = ver === 8;
    ua.isIE9 = ver === 9;
    ua.isLtIE9 = ver < 9;
  }
  if (ua.isIE7 && _ua.indexOf('trident/4.0') !== -1) {
    ua.isIE7 = false;
    ua.isIE8 = true;
  }
  if (ua.isIPhone = /i(phone|pod)/.test(_ua)) {
    ua.isIPhone4 = window.devicePixelRatio === 2;
  }
  if (ua.isIPad = /ipad/.test(_ua)) {
    isIPad3 = window.devicePixelRatio === 2;
  }
  ua.isIOS = ua.isIPhone || ua.isIPad;
  ua.isAndroid = /android/.test(_ua);
  ua.isAndroidMobile = /android(.+)?mobile/.test(_ua);
  ua.isPC = !ua.isIOS && !ua.isAndroid;
  ua.isTablet = ua.isIPad || (ua.isAndroid && ua.isAndroidMobile);
  ua.isSmartPhone = ua.isIPhone || ua.isAndroidMobile;
  ua.isChrome = /chrome/.test(_ua);
  ua.isWebkit = /webkit/.test(_ua);
  ua.isOpera = /opera/.test(_ua);
  ua.isMozilla = _ua.indexOf("compatible") < 0 && /mozilla/.test(_ua);
  ua.isSafari = !ua.isChrome && ua.isWebkit;
  return ua;
})();

// ===================================
// MONOLITH OBJECT
// ===================================
var MONOLITH = MONOLITH || {};

jQuery(function ($, window, MONOLITH) {

  'use strict';

  var ML = MONOLITH;

  // ===================================
  // DOM
  // ===================================
  ML.DOM = {
    $window  : $(window),
    $html    : $('html'),
    $body    : $('body'),
    $htmlbody: $('html, body')
  };

  // ===================================
  // METHODS
  // ===================================
  ML.METHODS = {
    init: function () {
      // 携帯端末時の処理
      if (window.UA.isSmartPhone || window.UA.isTablet) {
        // 読み込み時アドレスバーを隠す
        ML.METHODS.hideAddressBar();
      }
    },

    /**
     * ページ内スクロール
     * @param  {domObj} that クリックする要素
     */
    hashScroll: function (that) {
      var point = $(that.hash).offset();
      ML.DOM.$htmlbody.queue([]).stop().animate({
        scrollTop: point.top
      }, {
        duration: 300,
        easing: "swing"
      });
      return false;
    },

    /**
     * ページ読み込み時アドレスバーを隠す
     */
    hideAddressBar: function () {
      setTimeout(function () { scrollTo(0, 1); }, 100);
    },

    /**
     * クリックできる範囲を要素全体に広げる
     * @param {jQueryObj} $this     クリッカブルにする要素
     * @param {Mix}       filterElm リンク先のhrefを子に持つ要素
     */
    createClickable: function ($this, filterElm) {
      window.location = $this.find(filterElm).children('a').attr('href');
      return false;
    }
  };

  // INITIAL EXECUTE
  ML.METHODS.init();

  // ===================================
  // EXECUTE BY EVENT
  // ===================================
  // ページ内リンク
  $("a[href^=#]").on('click', function () {
    ML.METHODS.hashScroll(this);
  });

}(jQuery, window, MONOLITH));
