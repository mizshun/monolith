var MONOLITH = MONOLITH || {};

jQuery(function ($, window, MONOLITH) {

  'use strict';

  // ===================================
  // COMMON SETTINGS
  // ===================================
  var ML = MONOLITH,

      // COMMON DOM PARTS
      $window     = $(window),
      $html       = $('html'),
      $body       = $('body'),
      $htmlbody   = $('html, body'),
      $btnMenu    = $('#btn-menu'),
      $btnSubMenu = $('#btn-subMenu'),
      $globalNav  = $('#global-nav'),
      $service    = $('.service'),
      $blogSub    = $('.blog-sub'),
      $blogCont   = $('#blog-cont'),
      $article    = $('article');

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
  ML = {
    settings: {
    },

    METHODS: {
      init: function () {
        // 携帯端末時の処理
        if (UA.isSmartPhone || UA.isTablet) {
          // window.console.log(UA); // todo 確認用 消去
          // 読み込み時アドレスバーを隠す
          ML.METHODS.hideAddressBar();
        }
      },

      /**
       * ドロップダウンアニメーションで要素を表示する
       * @param {jQueryObject} $this     ドロップダウン表示する要素
       * @param {Mix}          hElm 高さを取得する要素
       */
      // dropdown: function ($this) {
      //   $this.toggleClass('open');
      //   return false;
      // },

      /**
       * ページ内スクロール
       * @param  {domObj} that クリックする要素
       */
      hashScroll: function (that) {
        var point = $(that.hash).offset();
        // $html.queue([]).stop().animate({
        $htmlbody.queue([]).stop().animate({
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
       * アニメーションで要素を表示する (FIXED対策)
       * @param {jQueryObject} $this 表示する要素
       */
      openSub: function ($this) {
        if (!$this.hasClass('open')) {
          setTimeout(function () { scrollTo(0, $body.scrollTop() + 1); }, 100);
        }
        $this.toggleClass('open');
        return false;
      },

      /**
       * クリックできる範囲を要素全体に広げる
       * @param {jQueryObj} $this     クリッカブルにする要素
       * @param {Mix}       filterElm リンク先のhrefを子に持つ要素
       */
      createClickable: function ($this, filterElm) {
        window.location = $this.find(filterElm).children('a').attr('href');
        return false;
      },

      /**
       * 要素の高さをあわせる
       * @param {jQueryObject} $this         高さをあわせる要素
       * @param {Mix}          paddingBottom 要素下の余白
       */
      adjustHeight: function ($this, paddingBottom) {
        var $this     = $this,
            resHeight = 0,
            pb        = paddingBottom,
            hH, pH;
        // 高さを取得する
        $this
          .css({ paddingBottom: pb })
          .each(function () {
            hH = $(this).find('h3').outerHeight(true);
            pH = $(this).find('p').outerHeight(true);
            resHeight = Math.max(resHeight, hH + pH);
          })
          .height(resHeight);
      }
    }
  };

  // INITIAL EXECUTE
  ML.METHODS.init();

  // ===================================
  // EXECUTE BY EVENT
  // ===================================
  // グローバルナビ
  // $btnMenu.on('click', $globalNav, function (e) {
  //   ML.METHODS.dropdown(e.data);
  // });

  // ページ内リンク
  $("a[href^=#]").on('click', function () {
    ML.METHODS.hashScroll(this);
  });

  // 要素の高さをあわせる(オリエンテーション時にも)
  $(window).on('load resize', $blogCont, function () {
    ML.METHODS.adjustHeight($service.find('.post-body'), 45);
  });

  // SMARTPHONE
  if (UA.isSmartPhone || UA.isTablet) {
    $article.on('click', { filterElm: 'h3' }, function(e){
      // ML.METHODS.createClickable($(this), e.data.filterElm);
    });
  }

  // ブログサブナビゲーション
  $btnSubMenu.on('click', $blogSub, function (e) {
    ML.METHODS.openSub(e.data);
  });
}(jQuery, window, MONOLITH));
