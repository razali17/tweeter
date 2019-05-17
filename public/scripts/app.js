/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("button.compose").on('click', function() { //toggle for the compose slide
    $("section.new-tweet").slideToggle("slow");
    var textInput = document.getElementById("txt");
    textInput.focus(); //auto select the text field
  })


  function escape(str) { //helper function to present users putting js in the form
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) { //helper function
    const $newTweet= //creates a template for each tweet
    `<article class="tweet">
        <header>
          <img class="avatar" src="${tweet.user.avatars.small}" align="bottom">
            <span class="name">${tweet.user.name}</span>
            <h4 class="userHandle">${tweet.user.handle}</h4>
        </header>
        <div class="tweetContent">${escape(tweet.content.text)}</div>
        <footer>${jQuery.timeago(tweet.created_at)}
          <img class="hiddenIcon" src="/images/heart.png">
          <img class="hiddenIcon" src="/images/reblog.png">
          <img class="hiddenIcon" src="/images/flag.png">
        </footer>
      </article>
    `;

    return $newTweet;
  }

  function renderTweets(arrTweets) {
    $('.tweets-container').empty();
    arrTweets.forEach(function(tweet) { //calls the other function and loops it through the array of objects
      $('.tweets-container').prepend(createTweetElement(tweet));
    });
  }

  function loadTweets() {
    $.ajax({
      url:"/tweets" //the get request with AJAX
    })
    .done(data => {
      renderTweets(data); //calls the function to the data
    });
  }

  loadTweets();

  $('#textarea').on('input', function() {
        $("div.nullError").slideUp(); //the error slides up on input
        $("div.longError").slideUp();
  });

  $("form").on("submit", function(e) {
    e.preventDefault(); //stops the button from redirecting
    var $tweetLen = $('#txt').val().length;
    if ($tweetLen === 0) {
      $("div.nullError").slideToggle("slow"); //if the text is empty
    } else if ($tweetLen > 140) {
      $("div.longError").slideToggle("slow");
    } else {
      $.ajax({
        url: $(this).attr("action"), //gets the /tweet link
        type: $(this).attr("method"), //gets the method which is "POST"
        data: $(this).serialize() //converts the data into urlencoded
      }).done(function() {
        $("#textarea").val(""); //clears the textbox after submit
        loadTweets();
      });
    }
  });

});