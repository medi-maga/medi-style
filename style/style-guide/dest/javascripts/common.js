$(function(){
  
  var current_scrollY

  //- モーダル用 ---------------------------------

  function modalPos(){

    //- 画面サイズ取得
    const w = $(window).width();
    const h = $(window).height();

    //- コンテンツサイズ取得
    const cw = $('#modal').outerWidth();
    const ch = $('#modal').outerHeight();

    //- 位置取得
    const pxleft = ((w - cw)/2);
    const pxtop = ((h - ch)/2);

    //- 位置設定
    $('#modal').css({'left': pxleft + 'px'}).css({'top': pxtop + 'px'});
  }
  
  // モーダル表示時の背景固定
  function overflowControl(){
    current_scrollY = $( window ).scrollTop();
    $('body').css({
      overflow: 'hidden',
      position: 'fixed',
      top: -1 * current_scrollY
    });
  }
  
  //- 完了表示用
  if ($(location).attr('search') === '?page=resultAfter') {

    //- 多重起動防止
    $(this).blur();
    //- オーバーレイ
    $('#overlay').show();
    //- コンテンツ表示
    $('#modal').show();
    overflowControl();
    modalPos();
    $('body').removeAttr('style');

  } else {

    //- 通常表示用
    $('#modal-open').click(
      function(){
        //- 多重起動防止
        $(this).blur();
        //- オーバーレイ
        $('#overlay').fadeIn(300);
        //- コンテンツ表示
        $('#modal').fadeIn(300);
        $("#modal").children().each(function(i) {
            if (i !== 0) {
              $(this).hide();
            } else {
              $(this).show();
            }
        });
        modalPos();
        overflowControl();
        tableResize();
      }
    );
    $('#modal-open2').click(
      function(){
        //- 多重起動防止
        $(this).blur();
        //- オーバーレイ
        $('#overlay').fadeIn(300);
        //- コンテンツ表示
        $('#modal').fadeIn(300);
        $("#modal").children().each(function(i) {
          if (i !== 1) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
        modalPos();
        overflowControl();
        tableResize();
      }
    );
    $('#modal-open3').click(
      function(){
        //- 多重起動防止
        $(this).blur();
        //- オーバーレイ
        $('#overlay').fadeIn(300);
        //- コンテンツ表示
        $('#modal').fadeIn(300);
        $("#modal").children().each(function(i) {
          if (i !== 2) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
        modalPos();
        overflowControl();
        tableResize();
      }
    );
    $('.modal-open-class').click(
      function(){
        //- 多重起動防止
        $(this).blur();
        //- オーバーレイ
        $('#overlay').fadeIn(300);
        //- コンテンツ表示
        $('#modal').fadeIn(300);
        $("#modal").children().each(function(i) {
            if (i !== 0) {
              $(this).hide();
            } else {
              $(this).show();
            }
        });
        modalPos();
        overflowControl();
        tableResize();
      }
    );
  }

  $('#modalClose, #overlay').unbind().click(function(){
    $('#modal, #overlay').fadeOut(300);
    $('body').removeAttr('style');
    $('html, body').prop({ scrollTop : current_scrollY});
  });

  // IE11対応, Array.from Array.prototype.find のponyfillを設定
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  // Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }

  // Reference: https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      var o = Object(this);
      // 2. Let len be ? ToLength(? Get(O, "length")).
      var length = o.length >>> 0;
      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = o[i];
        if (predicate.call(thisArg, value, i, o)) {
          return value;
        }
      }
      // 5. Return undefined.
      return undefined;
    };
  }

  //- リサイズ対応
  $(window).resize(modalPos);

  //- テーブルリサイズ対応
  function tableResize (){
    $(".area-table").each(function() {
      var _this = this;
    if ($(this).width()) {
        var priority = $(this).find('th[class*="priority"]');
        var priorityMax = $(this).find('th[class*="priority99"]');
        if (priority.length - priorityMax.length) {
          var sectionWidth = $(this).width();
          var list = Array.from($(this).find('th')).map(function (th, i) {
            var classList = Array.from(th.classList);
            var p = classList.find(function (name) {return (/^priority\d+$/.test(name)); }) || "priority99";
            var w = classList.find(function (name) {return (/^w\d+$/.test(name));}) || "w80";
            var tds = Array.from($(_this).find('td:nth-child(' + (i+1) + ')'));
            return {
              el: tds.concat(th),
              priority: parseInt(p.substr(8)),
              width: 20 + parseInt(w.substr(1))
            };
          });
          list = list.sort(function (a, b) {return b.priority - a.priority;});
          let total = 0;
          
          let info = Array.prototype.slice.call(list,0);
          info.forEach(function(elem, index){
            total += elem.width ;
            var display = (total > sectionWidth) ? 'none' : '';
            if (info.priority === 99) {
              display = '';
            }
            let el = elem.el;
            el.forEach(function(e, i){
              e.style.display = display;
            });
          });
        }
      }
    });
  }
  $(window).resize(tableResize);
  $(document).ready(tableResize);
  $(window).on('orientationchange',tableResize);
});

//- テーブルUI用チェックボックス連動ボタン ---------------------------------

$(function(){
  $('.cell-cb').click(function() {
    $('.form-section--option .btn').removeClass('btn--c-disabled');
    $('.form-section--option .btn').addClass('btn--c-action');
  });
});

//- チェックボックス連動非活性 -> 活性ボタン ---------------------------------

$(function(){
  $('.disabledRelease').click(function() {
    $('.btn').removeClass('btn--c-disabled');
    $('.btn').addClass('btn--c-action');
  });
});

//- ドロワー ---------------------------------

$(function(){
  var touch = false;
  $('#drawerMenu').on('click touchend',function(e){
    switch (e.type) {
      case 'touchend':
        drawerToggle();
        this.touch = true;
        return false;
      break;
      case 'click':
        if(!touch)
          drawerToggle();
        return false;
      break;
     }
    function drawerToggle(){
      $('body').toggleClass('drawer-opened');
      $('body').css('overflow','hidden');
      $('body').css('position','fixed');
      this.touch = false;
    }
  });
  $('#drawerOverlay, #drawerClose').on('click touchend',function(event){
    event.preventDefault()
    $('body').removeClass('drawer-opened');
    $('body').removeAttr('style');
  });
});

//- プロファイルドロワー ---------------------------------

$(function(){
  var touch = false;
  $('#profileMenu').on('click touchend',function(e){
    switch (e.type) {
      case 'touchend':
        drawerToggle();
        $('body').css('overflow','hidden');
        this.touch = true;
        return false;
      break;
      case 'click':
        if(!touch)
          $('body').removeAttr('style');
          drawerToggle();
        return false;
      break;
     }
    function drawerToggle(){
      $('body').toggleClass('profile-opened');
      this.touch = false;
    }
  });
  $('#drawerOverlay, #drawerClose').on('click touchend',function(event){
    event.preventDefault()
    $('body').removeClass('profile-opened');
    $('body').removeAttr('style');
  });
});

//- tap over ---------------------------------


$(function(){
  var init = function() {
    $('.tap').on('touchstart touchend', touchEventHandler);
    $('.tapTable td:not(.tapTable .cell-cb)').on('touchstart touchend', touchTableEventHandler);
    $('.tapSort').on('touchstart touchend', touchSortEventHandler);
  };
  var touchEventHandler = function(e) {
    if (e.type === 'touchstart') {
      $(this).append('<i class="tapOver"></i>');
    } else {
      $('.tapOver').remove();
    }
  };
  var touchTableEventHandler = function(e) {
    if (e.type === 'touchstart') {
      $(this).parent('tr').removeClass('tapTable').addClass('tapTableOver');
    } else {
      $(this).parent('tr').addClass('tapTable').removeClass('tapTableOver');
    }
  };
  var touchSortEventHandler = function(e) {
    if (e.type === 'touchstart') {
      $(this).addClass('tapSortOver');
    } else {
      $(this).removeClass('tapSortOver');
    }
  };
  $(init); // onload
});

//- table sort ---------------------------------
$(function(){
  $('.cell-sort').click(function() {
    var className = "selectDown";
    if ($(this).hasClass('selectDown')) {
      className = "selectUp";
    }
    setTimeout(function () {
      $('.cell-sort').removeClass('selectUp selectDown');
      $('.cell-sort').addClass('select');
      $(this).removeClass('select');
      $(this).addClass(className);
    }, 1);
  });
});

//- ボタン複数入力を無効 ---------------------------------
$(function(){
  $('.clickDisabled').click(function() {
    var self = this;
    $(self).prop('disabled', true);
  });
});