
// const express = require('express');
// const app = express();

// const initialTweets = require('./initial-tweets.json'); // Assuming this is the correct path

// app.get('/api/initial-tweets', (req, res) => {
//   res.json(initialTweets);
// });


// XSS security
const escape2 = function (str) {// escape cause strikethrough lines in code (depracation warning and was not sure if it affected other lines of code)
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// submit tweet
$(document).ready(function() {
  $('.form-box').on('submit', function(event) {
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('.counter');
    const $textBox = $parentSection.find('#tweet-text');
    event.preventDefault();

    if ($counter.val() < 0) {
      alert('Character Limit Exceeded');
      return;
    } else if ($textBox.val() === "") {
      alert('Please submit a tweet!');
      return;
    } else {
      console.log('before ajax/post');
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .done((response) => {
        // console.log("in done");
        // const data = response; // Capture the response data
        // const tweetId = data._id;
        // // Check if the tweet has already been rendered
        // if (!$(`#${tweetId}`).length) {
          // const $tweet = createTweetElement(data);
          // $allTweets.prepend($tweet);
        // }
        console.log(response[0], "before load tweets");
        $('.all-tweets').empty();
         loadTweets(); //removed (response)
        // addNewTweet(response[0])
      });
    }
  });
});



    // Check if the tweet has already been rendered
      // if (!renderedTweets.has(data._id)) {
      //   const $tweet = createTweetElement(data);
      //   $allTweets.prepend($tweet);
      //   renderedTweets.add(data._id); // Add the tweet ID to the set
      // }
  
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .done((data) => {
      console.log(data)
      renderTweets(data);
    })
    .fail((err) => {
      console.log('Error:', error);
    });
  };

  loadTweets();


// Define a function that creates a tweet element using a tweet object
const createTweetElement = function(tweet) {
  console.log(tweet, "tweet inside create tweet element"); // Log the tweet object for debugging
  const daysAgo = Math.floor(Math.random() * 365) + 1;
  const tweetHTML = $(`
    <article class="tweets-posted">
      <header class="tweet-header">
        <img src=${escape2(tweet.user.avatars)}>
          <h4 class="username">${escape2(tweet.user.name)}</h4>
          <div><p class="handle">${escape2(tweet.user.handle)}</p></div>
      </header>
      <p id="tweet-text">${escape2(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <p id="date-tweeted">${daysAgo} days ago</p>
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
  return tweetHTML;
};

const addNewTweet = function(tweet) {
  const allTweets = $('.all-tweets');
  const tweetElement = createTweetElement(tweet);
  allTweets.prepend(tweetElement);
}
        

// Define a function that renders tweets by creating a tweet element for each tweet and appending it to the tweet history
const renderTweets = function(tweets) {
  const allTweets = $('.all-tweets');
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    allTweets.prepend($tweet);
  }
};

// renderTweets(data.reverse());

// red arrow bobbing function
$(document).ready(function() {
  const $arrowDown = $('.arrow-down');
  $arrowDown.addClass('bobbing');
});


//////
