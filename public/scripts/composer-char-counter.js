/* JS file that tracks the number of characters
left for a valid tweet*/
$(document).ready(function() {
  const textMax = 140

  $('textarea').on("input", function() {
  let textLength = $(this).val().length; //gets the length of current input
  let counter = $(this).parent().find('.counter')
  let textRemaining = textMax - textLength //calculates the amount of characters left for a valid tweet

  if (textRemaining < 0) {
    counter.css("color", "red")
  } else {
    counter.css("color", "black")
  }
  $(counter).html(textRemaining)
});
});