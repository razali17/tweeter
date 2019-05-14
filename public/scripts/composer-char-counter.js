$(document).ready(function() {
  const textMax = 140

  $('textarea').on("input", function() {
  let textLength = $(this).val().length;
  let counter = $(this).parent().find('.counter')
  let textRemaining = textMax - textLength

  if (textRemaining < 0) {
    counter.css("color", "red")
  } else {
    counter.css("color", "black")
  }
  $(counter).html(textRemaining)
});
});