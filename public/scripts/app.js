/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("button.compose").on('click', function() {
    $("section.new-tweet").slideToggle("slow");
    var textInput = document.getElementById("txt");
    textInput.focus();
  })


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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

  function renderTweets(arrTweets) {
    $('.tweets-container').empty();
    arrTweets.forEach(function(tweet) {
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

  $("form").on("submit", function(e) {
    e.preventDefault();
    var $tweetLen = $('#textarea').val().length;
    if ($tweetLen === 0) {
      $("div.nullError").slideToggle("slow");
    } else if ($tweetLen > 140) {
      $("div.longError").slideToggle("slow");
    } else {
      $.ajax({
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: $(this).serialize()
      }).done(function() {
        $("#textarea").val("");
        loadTweets();
      });
    }
  });

});