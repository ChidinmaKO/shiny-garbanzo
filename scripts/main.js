$(document).ready(function() {
    var menuItems = new Array ();

    $.getJSON("../assets/sidebar.json", function(data) {
      menuItems = data;
      console.log(JSON.stringify(menuItems));
    })
    .done(function() { console.log('getJSON request succeeded!'); })
    .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
    .always(function() { console.log('getJSON request ended!'); });

    //login modal 
    $(".mainNavigation__trigger").on('click', function(){
      $('.modal').addClass('modal__show');
      return false;
    });

    //login modal__close
    $('.modal__content--close').on('click', function(){
      $('.modal').removeClass('modal__show');
    })

    //when user clicks outside login form
    $(document).on('click', function(e){
      if ($(e.target).is('.modal')) {
        $('.modal').removeClass('modal__show');
        //console.log("see");
      }
    });

    //side navigation
    $(".header__sideMenuTrigger").on('click', function() {
      $('.sideNavigation').addClass('sideNavigation__open');
    });

    //side navigation__close
    $('.header__sideNavTrigger').on('click', function() {
      $('.sideNavigation').removeClass('sideNavigation__open');
      //console.log("ik ben werken!");
    });
});
