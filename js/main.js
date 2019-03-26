(function($) {
  function subTabs(target, options) {
    
    var setting = {
      "inDelay": 300, //顯示前延遲
      "outDelay": 800, // 顯示後延遲
      "showTime": 300, // 動畫時間
      //"notOver": 1, //防止超出版面
      "inTab": function(){ subList.stop(true, true).fadeIn(this.showTime); },
      "outTab": function(){ subList.stop(true, true).fadeOut(this.showTime); },
    }
    $.extend(setting, options); //將setting與options合併

    var tin, tout;
    var tClass = $(target).attr("class").split(' ')[0]; //取得target第一個class
    var subList = $("div." + tClass); // 取得class前是加上div的.
    var targetWid = $(target).width(); // 取得target的寬度
    var posX = $(target).position().left; // 取得target的左定位
    var moveVal = (posX - (subList.width() - targetWid) / 2) - $(target).parent().position().left - 8; // 將定位在目標的正中間再-8
    if (moveVal < 0) {  //假使得到的值小於零 讓值成為零
      moveVal = moveVal * 2 + 50;
    }
    moveVal += "px"; // 得到的值後面加上px
    subList.css("left", moveVal); // 加上css左邊定位
    subList.css("top", 10); // 加上css上邊定位

    subList.hide(); //隱藏
    $("." + tClass).hover(function() { //.hover 滑入後，滑出後
      clearTimeout(tout);
      tin = setTimeout(function(){ setting.inTab();}, setting.inDelay );
    }, function(){
      clearTimeout(tin);
      tout = setTimeout(function(){ setting.outTab();}, setting.outDelay );
    }).click(function(){
      clearTimeout(tin);
      tout = setTimeout(function(){ setting.outTab();}, 100 );
    });

  }

  $.fn.extend({
    subTabs: function(options) {
      return this.each(function(){
        subTabs(this, options);
      });
    }
  });

})(jQuery);

/**
 * 文字閃爍
 * @param id   jquery selecor
 * @param arr  ['#FFFFFF','#FF0000']
 * @param s    milliseconds
 */
function toggleColor(id, arr, s) {
  var i = 0
  var timer = null;
    run = function() {
        if(arr[i]) {
            $(id).css('color', arr[i]);
        }
        i == 0 ? i++ : i = 0;
        timer = setTimeout(function() {
            run(id, arr, s);
        }, s);
    }
    run();
}

/**
 * 電子頁輪播圖
 */

//輪播按鈕
/*$(".banner-button").click(function() {
  $(".banner-active").removeClass("banner-active");
$(this).addClass("banner-active");
});




  // custom navigation/pagination links for slideshow
$(".custom-item").click(function(e){
  e.preventDefault();
  // use data-item value when triggering default pagination link
  $('a[data-slidesjs-item="' + $(this).attr("data-item") + '"]').trigger('click');
});
$('.custom-next').click(function(e) {
  e.preventDefault();
  // emulate next click
  $('.slidesjs-next').click();
});
$('.custom-prev').click(function(e) {
  e.preventDefault();
  // emulate previous click
  $('.slidesjs-previous').click();
});
*/

/**
 * 要對應html的輸入框
 */
$('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
              input.val('');
              input.removeClass('placeholder');
          }
      }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
              input.addClass('placeholder');
              input.val(input.attr('placeholder'));
          }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
              var input = $(this);
              if (input.val() == input.attr('placeholder')) {
                  input.val('');
              }
          })
      });

/**
 * 體育投注的時間
 */
function show_now() {
    var mydate=new Date();
    var year=mydate.getFullYear();
    var day=mydate.getDay();
    var month=mydate.getMonth();
    var daym=mydate.getDate();
    var Hours=mydate.getHours();
    var Minutes=mydate.getMinutes();
    var Seconds=mydate.getSeconds();
    if (daym<10){
    daym="0"+daym;}
    var dayarray=new Array("SUN","MON","TUE","WED","THU","FRI","STA")
    var montharray=new Array("1","2","3","4","5","6","7","8","9","10","11","12")
    var date_div=document.getElementById("EST_reciprocal");
    var date_str=year+"/"+montharray[month]+"/"+daym+"-"+Hours+":"+Minutes+":"+Seconds
    date_div.innerHTML=date_str;

    setTimeout("show_now()",1000);
}


/**
 * 導覽列次選單
 */
$(function() {
    $(".mainnav li>.ele-lsub-group").each(function() {  //每個匹配的元素都要運行
        $(this).prev("a").lSubTab()  // 找目標前一個a執行lSubTab
    })
});



(function(){

/* 次選單*/
$.fn.lSubTab = function() {
    var //a = $(".mainnav"),
        tSub = $(this).next(".ele-lsub-group"), // 找目標前一個.ele-lsub-group
        subStyle = "", // 空白 = 下拉式 ; fade = 淡入式 
        subAlign = "", // 空白 = 置中 ; left = 靠左 ; right = 靠右
        enterShowT = 200,  // 滑入速度
        exitShowT = 200, // 滑出速度
        outDelay = 500, // 滑出後延遲消失時間
        posY = 8, // 離目標Y軸距離
        posX= 0, // 離目標X軸距離
        self = $(this);

        $("body").prepend($("<div>").append(tSub).html());  //將目標移動至body內最上層

        var tSubID = $("#" + tSub.attr("id")); // 取得tSub的id前加# 設定成為目標
        tInner = tSubID.find(".lsub-inner-wrap"); //找名稱為lsub-inner-wrap的後代
        tInner.prepend("<span class='lsub-front-bg'></span>"); //開頭插入<span class='lsub-front-bg'></span>
        tInner.append("<span class='lsub-back-bg'></span>"); //結尾插入<span class='lsub-back-bg'></span>
        var tSubW = tSubID.width(),  
            tSubH = tSubID.height(); //取得tSubID的寬和高

        var k = 0,
          s, z = self.offset().top + self.outerHeight(),  // 目標離上的高度＋目標的外部高度
          l, f, n, t = !1,
          inTab = function(Target) { //進入區域
            if (1 == k) clearTimeout(s);
            else {
              k = 1;
              self.hasClass("current") && (t = !0);
              l = self.offset();
              var W = self.outerWidth(),
              n = "left" == subAlign ? l.left + posX : "right" == subAlign ? l.left + posX - tSubW + W : l.left +  posX + W / 2 - tSubW / 2;
              //運用條件運算式來設定 假使 subAlign == left 置左 ; == right 靠右 , 都沒有時置中。 有加入posX可設定X軸偏移。
              f = l.top + self.outerHeight() + posY;  // 總高度加上 可設定的Y軸偏移
              //$(document).width() < n + tSubW && (n = $(document).width() - tSubW);
              tSubID.css({ //設定給目標CSS
                top: f,
                position: "absolute",
                left: n,
                "z-index": 1E3
              }); 
              "fade" == subStyle ? tSubID.fadeIn(enterShowT) : tSubID.slideDown(enterShowT); 
              //運用條件運算式來設定 假使 subStyle == "fade" 使用fadeIn 淡入; 否則使用slideDown 往下滑動  
              Target.parent().attr("id")  && (Target.addClass("current"), Target.parent().addClass("current"))
              //將選中目標與選中目標的父層都 addClass "current"
            }
          },
          outTab = function(a) { //離開區域
            1 === k && (tSubID.css({
              "z-index": 999
            }), s = setTimeout(function() {
              k = 0;
              "fade" == subStyle ? tSubID.fadeOut(exitShowT) : tSubID.slideUp(exitShowT);
              //運用條件運算式來設定 假使 subStyle == "fade" 使用fadeOut 淡出; 否則使用slideUp 往上滑動  
              $("#LS-" + a + " a") && !t && $("#LS-" + a + " a, #LS-" + a).removeClass("current")
            }, outDelay)) //#LS- 加上選中目標 removeClass "current" 
          };

          $(document).resize(function() { //当调整浏览器窗口大小时，发生 resize 事件。
            tSubID.hide(); //隱藏目標
            k = 0
          });

         var u = 0;
          $(document).scroll(function() { // 捲動觸發navFix時所做的對應
            f = self.offset().top + self.outerHeight(); // 目標離上的高度＋目標的外部高度
            $("#navfixed").hasClass("fixed") ? tSubID.css({ // 條件運算式 假使#navfixed 有了.fixed
              top: f + posY  // 取得目前的總高度
            }) : tSubID.css({
              top: z + posY // 取得隨捲軸改變的總高度
            });
            setTimeout(function() { // 指定的毫秒數後運行  設定一個開關來改變 取得的總高度
              1 == u ? $("#navfixed").hasClass("fixed") || (f = self.offset().top + self.outerHeight() + posY, u = 0, tSubID.css({
                top: z + posY
              })) : $("#navfixed").hasClass("fixed") && (f = self.offset().top + self.outerHeight(), u = 1, tSubID.css({
                top: f + posY
              }))
            }, 1)
          });
          
        var p = "";
          self.on("mouseenter", function() {
            inTab($(this))
          }).on("click", function() {
            inTab($(this));
            tSubID.stop(!0, !0).show()
          }).on("mouseleave", function() {
            "" !== $(this).parent().prop("id") && (p = $(this).parent().attr("id"));
            outTab(p.substr(3))
          });
          tSubID.on("mouseenter", function() {
            clearTimeout(s)
          }).on("mouseleave", function() {
            p = $(this).attr("id");
            outTab(p.substr(4))
          })
};

/* 導覽列滑動固定*/
$.fn.navFixed = function(setting) { 
  var _o = this,
      conf = {
      fixedClass: 'fixed',
      fixedTop: 0
      };
  
  $.extend(conf, setting); 
  
  return this.each(function() {
    var $target = $(_o),
          targetTop = $target[0].offsetTop,
          fixedTop = parseInt(conf.fixedTop, 10) || 0,
          criticalTop = targetTop - fixedTop;
      $(window).scroll(function () {
          var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
              scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
          if (scrollTop > criticalTop) {
            if(!$target.hasClass(conf.fixedClass)) {
              $target.addClass(conf.fixedClass);
            }
            $target.children().css({left: -scrollLeft});
          } else if ($target.hasClass(conf.fixedClass)) {
            $target.removeClass(conf.fixedClass);
          }
      });
  });
};



})();


/*下拉選單-國旗*/
          $(function(){
              var ele_lang_group = $('<div>').append($('.lang-group')).html(),
                  $miBody = top.mem_index?$('body',top.mem_index.document):$('body'),
                  lang_group;

              $miBody.prepend(ele_lang_group);
              lang_group = top.mem_index?$('.lang-group',top.mem_index.document):$('.lang-group');


              var langAutoClose = function(){
                  langCloseTimer = setTimeout(function(){
                      lang_group.stop().slideUp('fast');
                  }, 1000);
              }

              $('.lang-wrap')
                  .on("click",function(){
                      var offset = $(this).offset();
                      var center_set = $miBody.width() - $('body').width();
                      center_set = (center_set > 0) ? center_set/2 : 0;
                      var obj_Left=offset.left + center_set;
                      var obj_Top=offset.top+$(this).height();

                      if(lang_group.is(':hidden')) {
                          lang_group.stop().slideDown('fast')
                              .css({'left':obj_Left,'top':obj_Top})
                              .on("mouseenter",function(){
                                  clearTimeout(langCloseTimer);
                                  $(this).stop(true,true).slideDown('100');
                              });
                      } else {
                          lang_group.stop().slideUp('fast');                }
                  })
                  .on("mouseleave",function(){
                      langAutoClose();
                  })
                  .on("mouseenter",function(){
                      if(typeof langCloseTimer != 'undefined'){
                          clearTimeout(langCloseTimer);
                      }
                  });
                  lang_group
                      .on('mouseleave',function(){langAutoClose();});
          });
