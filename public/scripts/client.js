
// XSS security
const escape2 = function (str) {// escape cause strikethrough lines in code (depracation warning and was not sure if it affected other lines of code)
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const showValidationError = function(err, msg) {
  err.show().text(msg).slideDown("fast").css('display', 'flex');
  console.log('showValidationError')
}

const hideValidationError = function(err) {
  err.slideUp("fast", function() {
    $(this).text('');
  });
}

$(document).ready(function() {
  $('.form-box').on('submit', function(event) {
    console.log("form box") // delete later
    const $parentSection = $(event.target).closest('section');
    const $counter = $parentSection.find('.counter');
    const $textBox = $parentSection.find('#text-box'); //changed from #tweet-text
    event.preventDefault();
    const $validationError = $('#validation-error');


    if ($textBox.val().length > 140) {
      const msg = 'Character Limit Exceeded';
      showValidationError($validationError, msg);
      $parentSection.slideDown("fast");
      return;
    } else if (String($textBox.val()).trim() === "") {
      const msg = 'Please submit a tweet!';
      showValidationError($validationError, msg);
      $parentSection.slideDown("fast");
      return;
    } else {
      hideValidationError($validationError);
      console.log('before ajax/post');

      // if ( )

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .done((response) => {
        console.log(response[0], "before load tweets");
        $('.all-tweets').empty();
        loadTweets();
        $textBox.val(""); //clear tweets in textbox after submitting
      });
    }
  });
});


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


// red arrow bobbing function
$(document).ready(function() {
  const $arrowDown = $('.arrow-down');
  $arrowDown.addClass('bobbing');
});