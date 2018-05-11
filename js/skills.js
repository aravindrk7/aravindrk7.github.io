$( ".html" ).hover(
  function() {
  	console.log("hello");
    $('.html img').css('display', 'block');
    $('.css img').css('display', 'none');
    $('.js img').css('display', 'none');
    $('.ps img').css('display', 'none');
  }
);
$( ".css" ).hover(
  function() {
  	console.log("hello");
    $('.html img').css('display', 'none');
    $('.css img').css('display', 'block');
    $('.js img').css('display', 'none');
    $('.ps img').css('display', 'none');
  }
);
$( ".js" ).hover(
  function() {
  	console.log("hello");
    $('.html img').css('display', 'none');
    $('.css img').css('display', 'none');
    $('.js img').css('display', 'block');
    $('.ps img').css('display', 'none');
  }
);
$( ".ps" ).hover(
  function() {
  	console.log("hello");
    $('.html img').css('display', 'none');
    $('.css img').css('display', 'none');
    $('.js img').css('display', 'none');
    $('.ps img').css('display', 'block');
  }
);
