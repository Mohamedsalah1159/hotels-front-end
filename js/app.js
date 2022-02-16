"use strict";

// check if touch device
function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  var mq = function mq(query) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

if (isTouchDevice()) {
  $('body').addClass('touch-device');
} // header


(function () {
  var header = $('.js-header'),
      items = header.find('.js-header-item'),
      burger = header.find('.js-header-burger'),
      wrapper = header.find('.js-header-wrapper');
  items.each(function () {
    var item = $(this),
        head = item.find('.js-header-head'),
        body = item.find('.js-header-body');
    head.on('click', function (e) {
      e.stopPropagation();

      if (!item.hasClass('active')) {
        items.removeClass('active');
        item.addClass('active');
      } else {
        items.removeClass('active');
      }
    });
    body.on('click', function (e) {
      e.stopPropagation();
    });
    $('html, body').on('click', function () {
      items.removeClass('active');
    });
  });
  burger.on('click', function (e) {
    e.stopPropagation();
    burger.toggleClass('active');
    wrapper.toggleClass('visible');
  });
})(); // sorting


(function () {
  var button = $('.js-sorting-button'),
      map = $('.js-sorting-map');
  button.on('click', function (e) {
    e.stopPropagation();
    $(this).toggleClass('active');
    map.toggleClass('show');
  });
  map.on('click', function (e) {
    e.stopPropagation();
  });
  $('html, body').on('click', function () {
    button.removeClass('active');
    map.removeClass('show');
  });
})(); // location


(function () {
  var locations = $('.js-location');
  locations.each(function () {
    var location = $(this),
        head = location.find('.js-location-head'),
        input = location.find('.js-location-input'),
        clear = location.find('.js-location-clear'),
        body = location.find('.js-location-body'),
        items = location.find('.js-location-item');
    input.keyup(function () {
      locations.removeClass('active');
      location.addClass('active');
    });
    head.on('click', function (e) {
      e.stopPropagation();
      $('.js-travelers').removeClass('active');

      if ($('.js-date-range').length) {
        $('.js-date-range').data('dateRangePicker').close();
      }

      if ($('.js-date-single').length) {
        $('.js-date-single').data('dateRangePicker').close();
      }
    });
    body.on('click', function (e) {
      e.stopPropagation();
    });
    clear.on('click', function (e) {
      locations.removeClass('active');
      input.val('');
    });
    $('html, body').on('click', function () {
      locations.removeClass('active');
    });
    items.each(function () {
      var item = $(this),
          text = item.text();
      item.on('click', function (e) {
        e.preventDefault();
        input.val(text);
        location.removeClass('active');
      });
    });
  });
})(); // counter


(function () {
  var counters = $('.js-counter');
  counters.each(function () {
    var counter = $(this),
        minus = counter.find('.js-counter-minus'),
        plus = counter.find('.js-counter-plus'),
        value = counter.find('.js-counter-value'),
        result = counter.find('.js-counter-result');
    var min = counter.data('min'),
        number = min;
    value.text(min);
    result.val(min);
    minus.on('click', function () {
      if (number > min) {
        var valueMinus = --number;
        value.text(valueMinus);
      }

      if (number === min) {
        minus.addClass('disabled');
      }

      result.val(number);
    });
    plus.on('click', function () {
      var valuePlus = ++number;
      value.text(valuePlus);

      if (number !== min) {
        minus.removeClass('disabled');
      }

      result.val(number);
    });
  });
})(); // travelers


(function () {
  var travelers = $('.js-travelers'),
      head = travelers.find('.js-travelers-head'),
      content = travelers.find('.js-travelers-content'),
      body = travelers.find('.js-travelers-body'),
      counters = travelers.find('.js-counter'),
      button = counters.find('.js-counter-button');
  head.on('click', function (e) {
    e.stopPropagation();
    travelers.toggleClass('active');
    $('.js-location').removeClass('active');

    if ($('.js-date-range').length) {
      $('.js-date-range').data('dateRangePicker').close();
    }

    if ($('.js-date-single').length) {
      $('.js-date-single').data('dateRangePicker').close();
    }

    $('.js-date-open').show();
    $('.js-date-close').hide();
  });
  body.on('click', function (e) {
    e.stopPropagation();
  });
  $('html, body').on('click', function () {
    travelers.removeClass('active');
  });
  button.on('click', function () {
    var adults = Number($('.js-counter-adults').val()),
        children = Number($('.js-counter-children').val()),
        babies = Number($('.js-counter-babies').val());
    var sum = adults + children + babies;
    adults > 0 || children > 0 || babies > 0 ? sum > 1 ? content.text(sum + " guests") : content.text(sum + " guest") : content.text('Travelers');
  });
})(); // guests


(function () {
  var guests = $('.js-guests'),
      head = guests.find('.js-guests-head'),
      content = guests.find('.js-guests-content'),
      body = guests.find('.js-guests-body'),
      counter = guests.find('.js-counter'),
      button = counter.find('.js-counter-button');
  head.on('click', function () {
    guests.toggleClass('active');
  });
  button.on('click', function () {
    var guestsNumber = Number($('.js-counter-quests').val());
    guestsNumber > 0 ? guestsNumber > 1 ? content.text(guestsNumber + " guests") : content.text(guestsNumber + " guest") : "1 guest";
  });
})(); // global variables


var prevArrow = '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path fill-rule="evenodd" d="M4.909.265a1 1 0 0 0-1.413.057l-3.231 3.5a1 1 0 0 0 0 1.357l3.231 3.5a1 1 0 0 0 1.47-1.357L3.284 5.5H13a1 1 0 1 0 0-2H3.284l1.682-1.822A1 1 0 0 0 4.909.265z" fill="#777e91"/></svg></button>',
    nextArrow = '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path fill-rule="evenodd" d="M9.091.265a1 1 0 0 1 1.413.057l3.231 3.5a1 1 0 0 1 0 1.357l-3.231 3.5a1 1 0 0 1-1.47-1.357L10.716 5.5H1a1 1 0 1 1 0-2h9.716L9.034 1.678A1 1 0 0 1 9.091.265z" fill="#23262f"/></svg></button>';
$(document).ready(function () {
  // slider adventure
  $('.js-slider-adventure').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // slider travel

  $('.js-slider-travel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true
  }); // slider live

  $('.js-slider-live').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 100000,
      settings: "unslick"
    }]
  }); // slider browse

  $('.js-slider-browse').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // slider places

  $('.js-slider-places').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 100000,
      settings: "unslick"
    }]
  }); // slider hosts

  $('.js-slider-hosts').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [{
      breakpoint: 1179,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // slider categories

  $('.js-slider-categories').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 1179,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        infinite: true
      }
    }]
  }); // slider best

  $('.js-slider-best').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 100000,
      settings: "unslick"
    }]
  }); // slider complete

  $('.js-slider-complete').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true
  }); // slider topics

  $('.js-slider-topics').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // slider host

  $('.js-slider-host').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }]
  }); // slider description

  $('.js-slider-description').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: true,
    speed: 500
  }); // slider interest

  $('.js-slider-interest').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // slider destinations

  $('.js-slider-destinations').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    dots: false,
    infinite: false,
    speed: 500,
    responsive: [{
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }]
  });
  $(window).on('resize orientationchange', function () {
    $('.js-slider-resize').slick('resize');
  });
}); 
//input range
(function() {
  "use strict";
  
  var supportsMultiple = self.HTMLInputElement && "valueLow" in HTMLInputElement.prototype;
  
  var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  
  self.multirange = function(input) {
    if (supportsMultiple || input.classList.contains("multirange")) {
      return;
    }
  
    var value = input.getAttribute("value");
    var values = value === null ? [] : value.split(",");
    var min = +(input.min || 0);
    var max = +(input.max || 100);
    var ghost = input.cloneNode();
  
    input.classList.add("multirange", "original");
    ghost.classList.add("multirange", "ghost");
  
    input.value = values[0] || min + (max - min) / 2;
    ghost.value = values[1] || min + (max - min) / 2;
  
    input.parentNode.insertBefore(ghost, input.nextSibling);
  
    Object.defineProperty(input, "originalValue", descriptor.get ? descriptor : {
      // Fuck Safari >:(
      get: function() { return this.value; },
      set: function(v) { this.value = v; }
    });
  
    Object.defineProperties(input, {
      valueLow: {
        get: function() { return Math.min(this.originalValue, ghost.value); },
        set: function(v) { this.originalValue = v; },
        enumerable: true
      },
      valueHigh: {
        get: function() { return Math.max(this.originalValue, ghost.value); },
        set: function(v) { ghost.value = v; },
        enumerable: true
      }
    });
  
    if (descriptor.get) {
      
      Object.defineProperty(input, "value", {
        get: function() { return this.valueLow + "," + this.valueHigh; },
        set: function(v) {
          var values = v.split(",");
          this.valueLow = values[0];
          this.valueHigh = values[1];
          update();
        },
        enumerable: true
      });
    }
  
    if (typeof input.oninput === "function") {
      ghost.oninput = input.oninput.bind(input);
    }
  
    function update() {
      ghost.style.setProperty("--low", 100 * ((input.valueLow - min) / (max - min)) + 1 + "%");
      ghost.style.setProperty("--high", 100 * ((input.valueHigh - min) / (max - min)) - 1 + "%");
    }
  
    input.addEventListener("input", update);
    ghost.addEventListener("input", update);
  
    update();
  }
  
  multirange.init = function() {
    [].slice.call(document.querySelectorAll("input[type=range][multiple]:not(.multirange)")).forEach(multirange);
  }
  
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", multirange.init);
  }
  else {
    multirange.init();
  }
  
  })();
  //filtration
  $(".fil-popup .section-filteration>span").on("click", function(){
    $(".fil-popup").hide(400);
  })
  $(".wishlists .wishlists__sorting .more-filtr button.button").on("click", function(){
    $(".fil-popup").show(400);
  });
$(".wishlists .wishlists__sorting .more-filtr button.showMap").on("click", function(){
  $(this)[0].innerHTML == 'view Map' ? $(this)[0].innerHTML = 'close Map' : $(this)[0].innerHTML = 'view Map'
  $(".side1").toggle()
  $(".main1").toggle()
});
  $(".room-popup .section-filteration>span").on("click", function(){
    $(".room-popup").hide(400);
  });
  $(".card_details .card__preview button").on("click", function(){
    $(".room-popup").show(400);
  });

    $(".room-popup").click(function(e){

        if($(e.target).hasClass("room-popup") ){
          $(".room-popup").hide(400);
          }else{
            $(".room-popup").show();
          }
  });
      $(".fil-popup").click(function(e){

        if($(e.target).hasClass("fil-popup") ){
          $(".fil-popup").hide(400);
          }else{
            $(".fil-popup").show();
          }
  });

  //input range
  function updateTextInput(val) {
    document.getElementById('textInput').value=val; 
  }
  function updateTextInput2(val) {
    document.getElementById('textInput2').value=val; 
  }
  function updateTextInput3(val) {
    document.getElementById('textInput3').value=val; 
  }

    $(".num-room").text($(".quadruple .par-card .travelers__item .counter .counter__value").text());
    $(".price form .price__body .travelers__item p").text($(".quadruple .par-card div .salary-night .newprice").text() * $(".num-room").text());
  $(".quadruple .par-card .travelers__item .counter .counter__button").on("click", function() {
    $(".num-room").text($(".quadruple .par-card .travelers__item .counter .counter__value").text());
    $(".price form .price__body .travelers__item p").text($(".quadruple .par-card div .salary-night .newprice").text() * $(".num-room").text());
  });
  $(".counter__button").on("click", function(){
    if($(this).siblings(".counter__value").text() >= 7){
      $(this).parent().find(".js-counter-plus").addClass("disabled");

    }else{
      $(this).parent().find(".js-counter-plus").removeClass("disabled");
    }
  })
// nice select

$(document).ready(function () {
  $('.select, .select-empty').niceSelect();
}); // tabs

(function () {
  var tabs = $('.js-tabs');
  tabs.each(function () {
    var thisTabs = $(this),
        nav = thisTabs.find('.js-tabs-link'),
        option = thisTabs.find('.option'),
        item = thisTabs.find('.js-tabs-item');
    nav.on('click', function () {
      var thisNav = $(this),
          indexNav = thisNav.index();
      nav.removeClass('active');
      thisNav.addClass('active');
      item.hide();
      item.eq(indexNav).fadeIn();
      return false;
    }).first().trigger('click');
  });
  $(document).ready(function () {
    var option = $('.js-tabs-select .option');
    option.on('click', function () {
      var thisOption = $(this),
          indexOption = thisOption.index();
      $('.js-tabs-item').hide();
      $('.js-tabs-item').eq(indexOption).fadeIn();
      initSlider($('.js-tabs-item').eq(indexOption));
    });
  });
})(); // actions


(function () {
  var actions = $('.js-actions'),
      items = actions.find('.js-actions-item'),
      favorite = actions.find('.js-actions-favorite');
  items.each(function () {
    var item = $(this),
        button = item.find('.js-actions-button'),
        body = item.find('.js-actions-body');
    button.on('click', function (e) {
      e.stopPropagation();

      if (!item.hasClass('active')) {
        items.removeClass('active');
        item.addClass('active');
      } else {
        items.removeClass('active');
      }
    });
    body.on('click', function (e) {
      e.stopPropagation();
    });
    $('html, body').on('click', function () {
      items.removeClass('active');
    });
  });
  favorite.on('click', function () {
    $(this).toggleClass('active');
  });
})();

$('[data-fancybox="gallery"]').fancybox({
  buttons: ['share', 'fullScreen', 'close']
}); // rating

(function () {
  var rating = $(".js-rating");
  rating.each(function (index) {
    var _this = $(this),
        readOnly = _this.data('read');

    $(this).rateYo({
      rating: $(this).data("rating"),
      fullStar: true,
      readOnly: readOnly,
      starWidth: "19px",
      spacing: "4px",
      normalFill: "#B1B5C3",
      ratedFill: "#FFD166",
      starSvg: '<svg width="19" height="18" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M6.49075 5.87586L9.19442 0.468508C9.29094 0.275471 9.56642 0.275471 9.66293 0.468508L12.3666 5.87586C12.4054 5.95351 12.4802 6.00687 12.5663 6.01834L18.3319 6.7871C18.547 6.81577 18.6359 7.07849 18.4825 7.2319L14.2421 11.4723C14.1802 11.5342 14.1533 11.623 14.1705 11.7089L15.3237 17.4749C15.3664 17.6886 15.1446 17.858 14.9497 17.7605L9.54581 15.0586C9.47207 15.0217 9.38529 15.0217 9.31155 15.0586L3.90765 17.7605C3.71271 17.858 3.49096 17.6886 3.5337 17.4749L4.6869 11.7089C4.70408 11.623 4.6772 11.5342 4.61528 11.4723L0.374865 7.2319C0.221458 7.07849 0.310398 6.81577 0.525446 6.7871L6.29111 6.01834C6.37715 6.00687 6.45193 5.95351 6.49075 5.87586Z" fill-opacity="1"/></svg>'
    });
  });
})(); // height windows for ios


var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // toggle body theme

(function () {
  var switchTheme = $('.js-theme'),
      body = $('body');
  switchTheme.on('change', function () {
    if (!body.hasClass('dark')) {
      body.addClass('dark');
      localStorage.setItem('darkMode', "on");
    } else {
      body.removeClass('dark');
      localStorage.setItem('darkMode', "off");
    }
  });
})(); // profile file load


(function () {
  var head = $('.js-background-head'),
      load = $('.js-background-load'),
      save = $('.js-background-save');
  load.on('click', function () {
    head.addClass('active');
  });
  save.on('click', function () {
    head.removeClass('active');
  });
})(); // slider


(function () {
  var slider = $('.js-slider');

  if (slider.length) {
    slider.each(function () {
      var _this = $(this),
          min = _this.data('min'),
          max = _this.data('max'),
          start = _this.data('start'),
          end = _this.data('end'),
          step = _this.data('step'),
          tooltips = _this.data('tooltips'),
          prefix = _this.data('prefix');

      var optionStart = [start],
          optionConnect = [true, false],
          optionTooltips = false;

      if (end) {
        optionStart = [start, end];
        optionConnect = true;
      }

      if (tooltips) {
        optionTooltips = [true];

        if (end) {
          optionTooltips = [true, true];
        }
      }

      noUiSlider.create(_this[0], {
        start: optionStart,
        connect: optionConnect,
        step: step,
        tooltips: optionTooltips,
        range: {
          'min': min,
          'max': max
        },
        format: wNumb({
          decimals: 0,
          prefix: prefix
        })
      });
    });
  }
})(); // slider


(function () {
  var range = $('.js-range-time');

  if (range.length) {
    range.each(function () {
      var _this = $(this),
          slider = _this.find('.js-range-slider'),
          start = _this.find('.js-range-start'),
          finish = _this.find('.js-range-finish'),
          from = slider.data('from'),
          to = slider.data('to');

      noUiSlider.create(slider[0], {
        start: [from, to],
        step: 0.5,
        connect: true,
        range: {
          'min': 0,
          'max': 24
        }
      });
      slider[0].noUiSlider.on('update', function (values, handle) {
        if (handle) {
          var textFinish = [values[handle]];
          finish.text(time(textFinish));
        } else {
          var textStart = [values[handle]];
          start.text(time(textStart));
        }
      });

      function time(value) {
        return value % 1 === 0 ? value : Math.round(value) - 1 + ":30";
      }

      ;
    });
  }
})(); // magnificPopup


(function () {
  var link = $('.js-popup-open');
  link.magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    removalDelay: 200,
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    }
  });
})();

(function () {
  var dateRange = $('.jss-date-range');

  if (dateRange.length) {
    dateRange.each(function () {
      var _this = $(this),
          format = _this.data('format'),
          container = _this.data('container');

      _this.dateRangePicker({
        autoClose: true,
        format: format,
        container: container,
        showTopbar: false,
        stickyMonths: true,
        startDate: moment().startOf("day").format('YYYY-MM-DD'),
        hoveringTooltip: false,
        customArrowPrevSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z" fill="#777e91"/></svg>',
        customArrowNextSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.793 7.793a1 1 0 0 0 0 1.414L12.586 12l-2.793 2.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414l-3.5-3.5a1 1 0 0 0-1.414 0z" fill="#777e91"/></svg>',
        getValue: function getValue() {
          if ($('.js-date-fromm').val() && $('.js-date-too').val()) return $('.js-date-fromm').val() + $('.js-date-too').val();else return '';
        },
        beforeShowDay: function(t) {
          var valid = !(t.getTime() < new Date().getTime());  //disable saturday and sunday
          var _class = '';
          var _tooltip = valid ? '' : 'disabled';
          return [valid,_class,_tooltip];
        },
        setValue: function setValue(s, s1, s2) {
          if ($('.js-date-fromm').attr('readonly') && $('.js-date-too').attr('readonly')) {
            $('.js-date-fromm').val(s1);
            $('.js-date-too').val(s2);
          } else {
            $('.js-date-fromm').val(s1);
            $('.js-date-too').val(s2);
          }
        },
        customOpenAnimation: function customOpenAnimation(cb) {
          $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function customCloseAnimation(cb) {
          $(this).fadeOut(300, cb);
        }
      });
    });
  }
})();


(function () {
  var dateRange = $('.js-date-range');

  if (dateRange.length) {
    dateRange.each(function () {
      var _this = $(this),
          format = _this.data('format'),
          container = _this.data('container');

      _this.dateRangePicker({
        autoClose: true,
        format: format,
        container: container,
        showTopbar: false,
        stickyMonths: true,
        startDate: moment().startOf("day").format('YYYY-MM-DD'),
        hoveringTooltip: false,
        customArrowPrevSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z" fill="#777e91"/></svg>',
        customArrowNextSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.793 7.793a1 1 0 0 0 0 1.414L12.586 12l-2.793 2.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414l-3.5-3.5a1 1 0 0 0-1.414 0z" fill="#777e91"/></svg>',
        getValue: function getValue() {
          if ($('.js-date-from').val() && $('.js-date-to').val()) return $('.js-date-from').val() + $('.js-date-to').val();else return '';
        },
        beforeShowDay: function(t) {
          var valid = !(t.getTime() < new Date().getTime());  //disable saturday and sunday
          var _class = '';
          var _tooltip = valid ? '' : 'disabled';
          return [valid,_class,_tooltip];
        },
        setValue: function setValue(s, s1, s2) {
          if ($('.js-date-from').attr('readonly') && $('.js-date-to').attr('readonly')) {
            $('.js-date-from').val(s1);
            $('.js-date-to').val(s2);
          } else {
            $('.js-date-from').val(s1);
            $('.js-date-to').val(s2);
          }
        },
        customOpenAnimation: function customOpenAnimation(cb) {
          $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function customCloseAnimation(cb) {
          $(this).fadeOut(300, cb);
        }
      });
    });
  }
})();

(function () {
  var dateRange = $('.jsss-date-range');

  if (dateRange.length) {
    dateRange.each(function () {
      var _this = $(this),
          format = _this.data('format'),
          container = _this.data('container');

      _this.dateRangePicker({
        singleDate : true,
        showShortcuts: false,
        singleMonth: true,
        autoClose: true,
        format: format,
        container: container,
        showTopbar: false,
        stickyMonths: true,
        startDate: moment().startOf("day").format('YYYY-MM-DD'),
        hoveringTooltip: false,
        customArrowPrevSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z" fill="#777e91"/></svg>',
        customArrowNextSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.793 7.793a1 1 0 0 0 0 1.414L12.586 12l-2.793 2.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414l-3.5-3.5a1 1 0 0 0-1.414 0z" fill="#777e91"/></svg>',
        getValue: function getValue() {
          if ($('.js-date-frommm').val()) return $('.js-date-frommm').val() ;else return '';
        },
        beforeShowDay: function(t) {
          var valid = !(t.getTime() < new Date().getTime());  //disable saturday and sunday
          var _class = '';
          var _tooltip = valid ? '' : 'disabled';
          return [valid,_class,_tooltip];
        },
        setValue: function setValue(s, s1) {
          if ($('.js-date-frommm').attr('readonly')) {
            $('.js-date-frommm').val(s1);
          } else {
            $('.js-date-frommm').val(s1);
          }
        },
        customOpenAnimation: function customOpenAnimation(cb) {
          $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function customCloseAnimation(cb) {
          $(this).fadeOut(300, cb);
        }
      });
    });
  }
})();

(function () {
  var dateSingle = $('.js-date-single');

  if (dateSingle.length) {
    dateSingle.each(function () {
      var _this = $(this),
          format = _this.data('format'),
          single = _this.data('single'),
          container = _this.data('container');

      _this.dateRangePicker({
        autoClose: true,
        format: format,
        showTopbar: false,
        singleDate: single,
        singleMonth: true,
        showShortcuts: false,
        separator: ' - ',
        container: container,
        hoveringTooltip: false,
        customArrowPrevSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M14.207 7.793a1 1 0 0 1 0 1.414L11.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0z" fill="#777e91"/></svg>',
        customArrowNextSymbol: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.793 7.793a1 1 0 0 0 0 1.414L12.586 12l-2.793 2.793a1 1 0 0 0 1.414 1.414l3.5-3.5a1 1 0 0 0 0-1.414l-3.5-3.5a1 1 0 0 0-1.414 0z" fill="#777e91"/></svg>',
        customOpenAnimation: function customOpenAnimation(cb) {
          $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function customCloseAnimation(cb) {
          $(this).fadeOut(300, cb);
        },
        setValue: function setValue(s) {
          if ($(this).attr('readonly')) {
            $(this).val(s);
          } else {
            $(this).val(s);
          }
        }
      });
    });
    $('.js-date-open').on('click', function (e) {
      $(this).hide();
      $('.js-date-close').show();
      e.stopPropagation();
      $('.js-travelers').removeClass('active');
      $(this).parents('.checkout__datepicker').find('.js-date-single').data('dateRangePicker').open();
    });
    $('.js-date-close').on('click', function (e) {
      $(this).hide();
      $('.js-date-open').show();
      e.stopPropagation();
      $('.js-travelers').removeClass('active');
      $(this).parents('.checkout__datepicker').find('.js-date-single').data('dateRangePicker').close();
    });
    $('body, html, .date-picker-wrapper').on('click', function () {
      $('.js-date-open').show();
      $('.js-date-close').hide();
    }); // dateSingle.dateRangePicker().bind('datepicker-closed', function(){
    //     console.log('close');
    //     // $('.js-date-open').show();
    //     // $('.js-date-close').hide();
    // });
  }
})(); // faq


(function () {
  var item = $('.faq__item, .faq1__item'),
      head = item.find('.faq__head, .faq1__head'),
      body = item.find('.faq__body, .faq1__body');
  head.on('click', function () {
    var thisHead = $(this);
    thisHead.parents('.faq__item, .faq1__item').toggleClass('active');
    thisHead.parents('.faq__item, .faq1__item').find('.faq__body, .faq1__body').slideToggle();
  });
})(); // upload preview show


(function () {
  var preview = $('.js-upload-preview'),
      open = $('.js-upload-button'),
      close = $('.js-upload-close');
  open.on('click', function () {
    preview.addClass('visible');
  });
  close.on('click', function () {
    preview.removeClass('visible');
  });
})(); // parallax effect


(function () {
  var parallax = $('.js-parallax');

  if (parallax.length) {
    parallax.each(function () {
      var _this = $(this),
          scale = _this.data('scale'),
          orientation = _this.data('orientation');

      new simpleParallax(_this[0], {
        scale: scale,
        orientation: orientation,
        delay: .5,
        overflow: true,
        transition: 'cubic-bezier(0,0,0,1)'
      });
    });
  }
})(); // smile


(function () {
  var smile = $('.js-smile'),
      button = smile.find('.js-smile-button'),
      body = smile.find('.js-smile-body');
  button.on('click', function (e) {
    e.stopPropagation();
    $(this).parents('.js-smile').toggleClass('active');
  });
  body.on('click', function (e) {
    e.stopPropagation();
  });
  $('html, body').on('click', function () {
    smile.removeClass('active');
  });
})(); 

$('.card__preview .carousel').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: prevArrow,
  nextArrow: nextArrow,
  dots: false,
  infinite: true,
  speed: 500,
});
// inpu range 2
var s = document.createElement('style');
document.head.appendChild(s);

var inputDiv = document.querySelector('#inputDiv');
var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));
/* EL INPUT */
var elInput = document.querySelector("input[type='range']");
elInput.style.width = w +"px";
var inputMin = elInput.getAttribute('min');
var inputMax = elInput.getAttribute('max');
var k = w/(inputMax - inputMin);

/* LA ETIQUETA */
var etiqueta = document.querySelector('#etiqueta');
var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));


/* el valor de la etiqueta (el tooltip) */
etiqueta.innerHTML = elInput.value;
/* calcula la posición inicial de la etiqueta (el tooltip) */
etiqueta.style.left =  ((elInput.value * k) - (ew/2))+"px";
/* establece el estilo inicial del TRACK */
s.textContent ="input[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, HotPink "+elInput.value+"%,black "+elInput.value+"%)}"
s.textContent +="input[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, HotPink "+elInput.value+"%,black "+elInput.value+"%)}"




elInput.addEventListener('input',function(){
	
/* cambia el valor de la etiqueta (el tooltip) */
etiqueta.innerHTML =elInput.value;
/* cambia la posición de la etiqueta (el tooltip) */
etiqueta.style.left =  ((elInput.value * k) - (ew/2))+"px";
/* cambia el estilo del TRACK */
s.textContent ="input[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, HotPink "+elInput.value+"%,black "+elInput.value+"%)}"
s.textContent +="input[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, HotPink "+elInput.value+"%,black "+elInput.value+"%)}"

}, false);