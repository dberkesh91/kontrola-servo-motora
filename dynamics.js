$(document).ready(function(){

  var expanded = false;

  $('.slide-student-info').click(function(){

    if (expanded)
    {
      // Subtract Menu
      $('.student-information').addClass('hidden');
      $('.student-info').animate({width:'48px'}, function(){
        $(this).removeClass('expanded');
        expanded = false;
      });
    } else {
      // Expand Menu
      $('.student-info').animate({width:'250px'}, function(){
        $(this).addClass('expanded');
        $('.student-information').removeClass('hidden');
        expanded = true;
      });
    }

  });

});
