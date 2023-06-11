$(document).ready(function() {
  $('#text-box').on('input', function() {
    const tweetLimit = 140;
    const tweetText = $(this).val();
    const countLeft = tweetLimit - tweetText.length;
    const counter = $(this).parent().find('.counter');
    
    counter.text(countLeft);
    if (countLeft <= 0) {
      counter.addClass('tweetMaxChars');
    } else {
      counter.removeClass('tweetMaxChars');
    }
  });
  
  // $('form').submit(function() {
  //   $('.counter').text(140); // Reset the counter to its initial value
  // });
});