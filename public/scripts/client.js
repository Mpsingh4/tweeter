
// const express = require('express');
// const app = express();

// const initialTweets = require('./initial-tweets.json'); // Assuming this is the correct path

// app.get('/api/initial-tweets', (req, res) => {
//   res.json(initialTweets);
// });


// submit tweet
$(document).ready(function() {

  $('#tweet-form').on('submit', function(event) {
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
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .done((data) => {
        resetForm();
        $.ajax({
          url: "/tweets",
          method: "GET"
        })
        .done((data) => {
          $('.all-tweets').prepend($(createTweetElement(data.reverse()[0])));
        })
        .fail((err) => {
          console.log('Error did not work');
        });
      });
    }
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .done((data) => {
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

$.ajax('/tweets', { method: 'POST', data: data })
    .then(function () {
      loadTweets();
    });

// const loadTweets = function() {
//   $.ajax('/tweets', { method: 'GET' })
//   .then(function (data) {
//     renderTweets(data);
//   });
// };

loadTweets();