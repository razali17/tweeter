/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  /* helper function to prevent cross-site scripting. It takes the user input
  and escapes unsafe characters*/
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // animation for text input after compose button is clicked
  $("button.compose").on('click', function() {
    $("section.new-tweet").slideToggle("slow");
    var textInput = document.getElementById("textarea");
    textInput.focus();
  })

/* Generates an html template for the tweets stored in the database.
It stores them in the tweets-container section in the index.html file */
  function createTweetElement(tweet) {
    const $newTweet=
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

  function renderTweets(tweetArray) {
    $('.tweets-container').empty();
    tweetArray.forEach(function(tweet) {
      $('.tweets-container').prepend(createTweetElement(tweet));
    });
  }

  function loadTweets() {
    $.ajax({
      url:"/tweets"
    })
    .done(data => {
      renderTweets(data);
    });
  }

  loadTweets();

  $('#textarea').on('input', function() {
        $("div.nullError").slideUp();
        $("div.longError").slideUp();
  });

  //decision tree after user submits a new tweet.
  $("form").on("submit", function(e) {
    e.preventDefault();
    var $tweetLen = $('#textarea').val().length;
    if ($tweetLen === 0) {//if the input is empty, display an error
      $("div.nullError").slideToggle("fast");
    } else if ($tweetLen > 140) {//if the tweet is too long, display an error
      $("div.longError").slideToggle("fast");
    } else {
      //post the new tweet and display a successul post message. Also use ajax to
      // refresh tweets displaying newly posted tweet
      $("div.successMessage").slideToggle("fast");
      $.ajax({
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: $(this).serialize()
      }).done(function() {//on successful post, clear the text field and reset the counter
        $("#textarea").val("");
        loadTweets();
        $("#count").html(140)
      });
    }
  });
});