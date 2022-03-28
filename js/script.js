
$(document).ready(function(){
 //menu-page--------------------------------------------------------------------------------------------------
//  window.addEventListener("scroll",function(){
//    var header = document.querySelector("header");
//    header.classList.toggle("sticky",this.window.scroll)
//  })
var $menu = $('.header-bar');
var $section = $('.section');
var $top = $('.top');
var idx = 0;
var sectionTop = '';

$menu.eq(0).addClass('active');
$menu.on('click', function () {

  idx = $(this).index(); //0,1,2
  sectionTop = ($section.eq(idx).offset().top - 102);
  $('html,body').animate({
    scrollTop: sectionTop
  });
});

//if scroll it will change the header menu
  $(window).on('scroll',function(){
    $section.each(function(){
       sectionTop = $(this).offset().top-102;
       if(sectionTop <= $(window).scrollTop()){
         idx = $(this).index();
         $menu.eq(idx).addClass('active').siblings().removeClass('active');
       }
    });
  });

//  top button---------------------------------------------------
$top.on('click', function () {
  $('html,body').animate({
    scrollTop: 0
  });
});
  // navigation---------------------------------------------------
      var $navBg = $('.nav-bg');
      var $navigation = $('.navigation');
  
      $navigation.each(function(){
          var $container = $(this);
          var $main = $container.children('.main');
          var $mainMenu = $main.children('li');   // $(.main > li)
          var $sub = $mainMenu.children('.sub');
  
          var subHeight = 210;
          var navHeight = 70;
          var navBgHeight = navHeight + subHeight;
          var duration = 300;
  
          $mainMenu
          .on('mouseenter',function(){
              $navBg.stop().animate({height: navBgHeight}, duration);
              $(this).children('.title').addClass('active');
              $(this).siblings().children('.title').removeClass('active');
              $(this).children('.sub').addClass('active');
              $(this).siblings().children('.sub').removeClass('active');
          })
         .on('mouseleave',function(){
              $navBg.stop().animate({height: navHeight}, duration);
              $(this).children('.title').removeClass('active');
              $(this).children('.sub').removeClass('active');
          });
  
      });
      
  // menu-story-title
  $('.thumb li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.thumb li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

//a-lis banner bg
var $visual = $('.a-list-banner-bg');

// slick-fade
$visual.each(function(){
  var $container = $(this);
  var $slideGroup = $container.find('.banner-bg-group');

  $slideGroup.slick({
    arrows : false,
    infinite : true,
    autoplay : true,
    autoplaySpeed : 2500,
    speed : 1000,
    fade : true,
    cssEase : 'linear',
    puaseOnHover : false,
    puaserOnFocus : false,
  })

}); // slick-fade

// slick-fade

var $visualPackage = $('.package');

$visualPackage.each(function(){
  var $container = $(this);
  var $pakageGroup = $container.find('.package-group');

  $pakageGroup.slick({
    arrows : false,
    infinite : true,
    autoplay : true,
    autoplaySpeed : 2500,
    speed : 1000,
    fade : true,
    cssEase : 'linear',
    puaseOnHover : false,
    puaserOnFocus : false,
  });
}); 

// a-list product
$('.carousel').slick({
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  variableWidth: true, 
  dots:true,
  centerMode: true,
});

// visual mibile
function init(item) {
  var items = item.querySelectorAll('li'),
      current = 0,
      autoUpdate = true,
      timeTrans = 4000;
      
  //create nav
  var nav = document.createElement('nav');
  nav.className = 'nav_arrows';

  //create button prev
  var prevbtn = document.createElement('button');
  prevbtn.className = 'prev';
  prevbtn.setAttribute('aria-label', 'Prev');

  //create button next
  var nextbtn = document.createElement('button');
  nextbtn.className = 'next';
  nextbtn.setAttribute('aria-label', 'Next');

  //create counter
  var counter = document.createElement('div');
  counter.className = 'counter';
  counter.innerHTML = "<span>1</span><span>"+items.length+"</span>";

  if (items.length > 1) {
    nav.appendChild(prevbtn);
    nav.appendChild(counter);
    nav.appendChild(nextbtn);
    item.appendChild(nav);
  }

  items[current].className = "current";
  if (items.length > 1) items[items.length-1].className = "prev_slide";

  var navigate = function(dir) {
    items[current].className = "";

    if (dir === 'right') {
      current = current < items.length-1 ? current + 1 : 0;
    } else {
      current = current > 0 ? current - 1 : items.length-1;
    }

    var	nextCurrent = current < items.length-1 ? current + 1 : 0,
      prevCurrent = current > 0 ? current - 1 : items.length-1;

    items[current].className = "current";
    items[prevCurrent].className = "prev_slide";
    items[nextCurrent].className = "";

    //update counter
    counter.firstChild.textContent = current + 1;
  }
  
  item.addEventListener('mouseenter', function() {
    autoUpdate = false;
  });

  item.addEventListener('mouseleave', function() {
    autoUpdate = true;
  });

  setInterval(function() {
    if (autoUpdate) navigate('right');
  },timeTrans);
  
  prevbtn.addEventListener('click', function() {
    navigate('left');
  });

  nextbtn.addEventListener('click', function() {
    navigate('right');
  });

  //keyboard navigation
  document.addEventListener('keydown', function(ev) {
    var keyCode = ev.keyCode || ev.which;
    switch (keyCode) {
      case 37:
        navigate('left');
        break;
      case 39:
        navigate('right');
        break;
    }
  });

  // swipe navigation
  // from http://stackoverflow.com/a/23230280
  item.addEventListener('touchstart', handleTouchStart, false);        
  item.addEventListener('touchmove', handleTouchMove, false);
  var xDown = null;
  var yDown = null;
  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };
  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
        /* left swipe */
        navigate('right');
      } else {
        navigate('left');
      }
    } 
    /* reset values */
    xDown = null;
    yDown = null;
  };


}

[].slice.call(document.querySelectorAll('.cd-slider')).forEach( function(item) {
  init(item);

})();





});