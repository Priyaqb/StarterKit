jQuery(document).ready(function($) {
  console.log("ffdgfdg");
  var toggleIcon = $("#toggle-icon"),
    siteNav = $("#site-nav");

  toggleMenu();

  toggleIcon.click(function() {
    if (siteNav.hasClass("hide-menu")) {
      siteNav.removeClass("hide-menu").addClass("show-menu");
    } else {
      siteNav.removeClass("show-menu").addClass("hide-menu");
    }
    $(this).toggleClass('open');
  });

  $(window).on('resize', function() {
    toggleMenu();
  });

  function toggleMenu() {
    if ($(window).width() < 768) {
      siteNav.addClass("hide-menu");
    }
    else {
      siteNav.removeClass("hide-menu");
    }
  }
});
