
// const express = require('express');
// const app = express();

// const initialTweets = require('./initial-tweets.json'); // Assuming this is the correct path

// app.get('/api/initial-tweets', (req, res) => {
//   res.json(initialTweets);
// });


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
    // Redirect to /tweets
    window.location.href = '/tweets';
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

// Define a function to fetch and render the initial tweets
const loadInitialTweets = function() {
  $.ajax({
    url: '/initial-tweets', // Adjusted url as i couldnt get into root directory
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      renderTweets(response);
    },
    error: function(xhr, status, error) {
      // Handle any errors
      console.log('Error:', error);
    }
  });
};

$(document).ready(function() {
  loadInitialTweets();
});

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