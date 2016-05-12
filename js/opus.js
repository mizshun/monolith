var MONOLITH = MONOLITH || {};

jQuery(function ($, window, MONOLITH) {

  'use strict';

  var ML = MONOLITH,

  // ===================================
  // DOM
  // ===================================
  $window  = ML.DOM.$window,
  $service = ML.DOM.$service = $('.service'),
  $article = ML.DOM.$article = $('article'),
  $bxslider = ML.DOM.$bxslider = $('.bxslider');

  // ===================================
  // PLUGIN
  // ===================================
  // recentWorks スライダー
  $('.bxslider').bxSlider({
    auto: true,
    speed: 500,
    pause: 5000,
    pager: false,

    slideWidth: 293,
    minSlides: 2,
    maxSlides: 3,
    slideMargin: 16
  });
}(jQuery, window, MONOLITH));
