//start accordion
class Accordion {
  constructor(options) {
    this.options = Object.assign({
      accordion: '.s-acc',
      duration: 400,
      initial: 0,
      activated: true,
      toggle: true
    }, options)
    
    this.init()
  }
  
  initPanel() {
    $(this.options.accordion).each((i, item) => {
      const panels = $(item).children()
      
      panels.find('.s-acc__body').hide()
      
      panels.removeClass('active')
      panels.find('.s-acc__body').hide()
      
      if (this.options.activated) {
        panels.eq(this.options.initial).addClass('active')
        panels.eq(this.options.initial).find('.s-acc__body').show()
      }
    })
  }
  
  togglePanel(panels, panel) {
    if (!this.options.toggle) {
      panel.toggleClass('active').find('.s-acc__body').slideToggle(this.options.duration)
    } else if (!panel.hasClass('active')) {
      panels.removeClass('active').find('.s-acc__body').slideUp(this.options.duration)
      panel.addClass('active').find('.s-acc__body').slideDown(this.options.duration)
    } else {
      panels.removeClass('active').find('.s-acc__body').slideUp(this.options.duration)
    }
  }
  
  handler(event) {
    event.preventDefault()
    const panels = $(event.currentTarget).closest(this.options.accordion).children()
    const panel = $(event.currentTarget).closest('.s-acc__panel')
    
    this.togglePanel(panels, panel)
  }
  
  init() {
    this.initPanel()
    
    $(this.options.accordion).find('.s-acc__header').off('click').on('click', ((event) => this.handler(event)))
  }
}

//end accordion
//start ticker
class Ticker {
  constructor(options) {
    this.ticker = document.querySelectorAll('.s-'+'ticker')
    this.speed = options.speed
    this.paused = false || options.paused
    
    this.init()
  }
  
  cloneSlider() {
    Array.prototype.forEach.call(this.ticker, item => {
      const parent = item
      const slide = item.children
      Array.prototype.forEach.call(slide, item => {
        parent.appendChild(item.cloneNode(true))
      })
    })
  }
  
  wrapSlides() {
    Array.prototype.forEach.call(this.ticker, item => {
      item.innerHTML = `<div>${item.innerHTML}</div>`
    })
  }
  
  setAnimationOptions() {
    Array.prototype.forEach.call(this.ticker, item => {
      const speed = +item.dataset.speed || this.speed
      const tickerList = item.children[0]
      const slidesAmount = tickerList.children.length / 2
      tickerList.style.animationDuration = `${speed * slidesAmount / 1000}s`
      tickerList.style.WebkitAnimationDuration = `${speed * slidesAmount / 1000}s`
      
      if (this.paused) {
        tickerList.onmouseenter = (event) => {
          event.target.style.animationPlayState = 'paused'
          event.target.style.WebkitAnimationPlayState = 'paused'
        }
        tickerList.onmouseleave = (event) => {
          event.target.style.animationPlayState = ''
          event.target.style.WebkitAnimationPlayState = ''
        }
      }
    })
  }
  
  init() {
    this.cloneSlider()
    this.wrapSlides()
    this.setAnimationOptions()
  }
}
//end ticker

$(function () {
  
  //start accordion menu
  
  new Accordion({
    initial: 0,
    activated: false,
    toggle: true
  });
  
  //end accordion menu
  
  //start side-menu
  
  var menuBtn = $('.menu__burger');
  var closeMenuBtn = $('.side-menu__close-btn');
  var sideMenu = $('.side-menu');
  var menuLink = $('.side-menu__link:not(.s-acc__header)');
  var pageBody = $('body');
  var activeClass = 'active';
  
  function hideBodyScroll(){   
    pageBody.addClass('menu-open');
  }
  
  function showBodyScroll(){  
    pageBody.removeClass('menu-open');
  }
  
  function setActiveMenu(element){
    element.on('click', function(){
      sideMenu.addClass(activeClass);
      hideBodyScroll();
    });
  }
  
  function setDisactiveMenu(element){
    element.on('click', function(){
      sideMenu.removeClass(activeClass);
      showBodyScroll();
    });
  }
  
  setActiveMenu(menuBtn);
  setDisactiveMenu(closeMenuBtn);
  setDisactiveMenu(menuLink);
  
  //end side-menu
  
  //start cookies
  
  var objCookies = $('.cookies');
  var cookiesAcceptBtn = $('.cookies__btn-item--accept');
  
  cookiesAcceptBtn.on('click', function(){
    objCookies.addClass('accepted-cookies');
    objCookies.hide();
  });
  
  //end cookies
  //start ticker
  new Ticker({
    speed: 6000
  });
  //end ticker
  
  //start menu scroll
  var anchorElement = $("[data-scroll]");
  anchorElement.on("click", function (event) {
    event.preventDefault();
    
    
    let elementId = $(this).data("scroll");
    let elementOffset = $(elementId).offset().top;
    console.log($(elementId).offset().top)
    
    $("html, body").animate({
      scrollTop: elementOffset,
    }, 500);
  });
  //end menu scroll
  
  //start horizontal img scroll
  const scrollContainer = document.querySelector(".modules__img");
  if(!scrollContainer){
    return(false)
  }else{
    scrollContainer.addEventListener("wheel", (evt) => {
      
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }

  //end horizontal img scroll
});