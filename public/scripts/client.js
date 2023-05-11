/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": new Date().getTime() - (16 * 24 * 60 * 60 * 1000) // 16 days ago
//   },
//   {
//     "user": {
//       "name": "Jerry",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@GrandLineReview"
//     },
//     "content": {
//       "text": "One Piece is the greatest Shonen manga!"
//     },
//     "created_at": new Date().getTime() - (10 * 24 * 60 * 60 * 1000) // 10 days ago
//   }
// ];

// submit tweet
const $submitButton = $('.tweet-button');
$submitButton.on('click', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Serialize data
  const formData = $('form').serialize();
  console.log(formData);

  // Send an AJAX request to the server
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
  }).then(function(response) {
    console.log(response);
  });
});

// Define a function that creates a tweet element using a tweet object
const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweets-posted">
      <header class="tweet-header">
        <img src=${tweet.user.avatars}>
          <h4 class="username">${tweet.user.name}</h4>
          <div><p class="handle">${tweet.user.handle}</p></div>
      </header>
      <p id="tweet-text">${tweet.content.text}</p>
      <footer class="tweet-footer">
        <p id="date-tweeted">${tweet.created_at} days ago</p>
        <div class="tweet-footer-icons">
          <div><i class="fa-solid fa-flag"></i></div>
          <div><i class="fa fa-retweet"></i></div>
          <div><i class="fa-solid fa-heart"></i></div>
        </div>
      </footer>
    </article>
    <br>
  `);
  
  // Return the tweet element
  return $tweet;
};

// Define a function that renders tweets by creating a tweet element for each tweet and appending it to the tweet history
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.all-tweets').append($tweet);
  }
};

// Call the renderTweets function with a data object as an argument
renderTweets(data);


const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function(response) {
        renderTweets(response);
      },
      error: function(xhr, status, error) {
        // Handle any errors 
        console.log('Error:', error);
      }
    });
    return loadTweets();
  };