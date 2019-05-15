/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let $commentHeader = $('<header>').addClass('commentHeader');
  let $avatar = $('<img>').addClass('avatar').attr("src", tweet.user.avatars.small);
  let $name = $('<name>').addClass('name').text(tweet.user.name);
  let $userId = $('<userId>').addClass('userId').text(tweet.user.handle);
  let $tweetText= $('<div>').addClass('tweetText').text(tweet.content.text);
  let $timeStamp= $('<span>').addClass('timeStamp').text(tweet.created_at);
  let $commentFooter = $('<footer>').addClass('commentFooter');
  let $hiddenFlag = $('<img>').addClass('hiddenIcon').attr("src", "/images/flag.png");
  let $hiddenHeart = $('<img>').addClass('hiddenIcon').attr("src", "/images/heart.png");
  let $hiddenReblog = $('<img>').addClass('hiddenIcon').attr("src", "/images/reblog.png");

  $commentHeader.append($avatar, $name, $userId)
  $commentFooter.append($timeStamp, $hiddenReblog, $hiddenHeart, $hiddenFlag )
  $tweet.append($commentHeader, $tweetText, $commentFooter)
  return $tweet;
}

function renderTweets(tweets) {

  for (let userData in tweets) {

  let tweet = tweets[userData];
  let newComment = createTweetElement(tweet)

  $('.tweets-container').prepend(newComment)
  }
}

renderTweets(data);

$(function() {
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    let formData = $('#tweet-form').serialize();
    $.ajax('/tweets', {
        method: 'POST',
        data: formData,
      })
    return $.ajax('/tweets');
      }).then(renderTweets);
})


function loadTweets(){
  let $submit = $('.new-tweet-text');

    $.ajax('/tweets', { method: 'GET' })
       .then(function (myJson) {
         renderTweets(myJson)

      console.log('Success: ', myJson);

      $submit.replaceWith(myJson);
      renderTweets()

    });
  }
  loadTweets()