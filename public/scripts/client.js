
// const express = require('express');
// const app = express();

// const initialTweets = require('./initial-tweets.json'); // Assuming this is the correct path

// app.get('/api/initial-tweets', (req, res) => {
//   res.json(initialTweets);
// });


// submit tweet
$(document).ready(function() {

  $('.form-box').on('submit', function(event) {
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('.counter');
    const $textBox = $parentSection.find('#tweet-text')
    event.preventDefault();

    if ($counter.val() < 0) {
      alert('Character Limit Exceeded');
      return;
    } else if ($textBox.val() === "") {
      alert('Please submit a tweet!');
      return;
    } else {
      console.log('before ajax/post')
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .done((data) => {
        console.log("in done");
        loadTweets();
      });
    }
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .done((data) => {
      console.log(data)
      renderTweets(data.reverse());
    })
    .fail((err) => {
      console.log('Error:', error);
    });
  };

  loadTweets();

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
    $('.all-tweets').prepend($tweet);
  }
};


// red arrow bobbing function
$(document).ready(function() {
  const $arrowDown = $('.arrow-down');
  $arrowDown.addClass('bobbing');
});