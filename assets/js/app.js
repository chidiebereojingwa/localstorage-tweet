// variables
const tweetList = document.getElementById('tweet-list')


// Event Listeners
evenListeners();
function evenListeners() {
    // Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //Remove Tweet
    tweetList.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);

}

// Functions

function newTweet(e) {
    e.preventDefault();
    console.log('Form Submitted');

    // Read the textarea value
    const tweet = document.getElementById('tweet').value;

    //Create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //Create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

    //Add the remove button
    li.appendChild(removeBtn);

    //Add to the list
    tweetList.appendChild(li);

    // Add to local storage
    addTweetLocalStorage(tweet);

    // Print an Alert
    alert("Tweet added")

    // To clear the form
    this.reset()

}


//Remove the Tweets from the Dom
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
    }

   // Remove from Stroge
    removeTweetLocalStorage( e.target.parentElement.textContent);
}

// Adds the tweets into local storage

function addTweetLocalStorage(tweet){
    let tweets = getTweetsFromStorage();

    // Add the tweet into the array
    tweets.push(tweet);

    // Convert tweet array into String
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLs = localStorage.getItem('tweets');

    //Get the values, if null is returned then we create an empty array
    if(tweetsLs === null){
        tweets = [];
    } else {
        tweets = JSON.parse( tweetsLs);
    }
    return tweets
}

// Prints Local Storage Tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();


    // Loop through storage and then print the values
    tweets.forEach(function (tweet) {
        //Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //Create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;

        //Add the remove button
        li.appendChild(removeBtn);

        //Add to the list
        tweetList.appendChild(li);

    })

}

// Remove the tweet from local storage

function removeTweetLocalStorage(tweet) {
    // get tweets from storage
    let tweets = getTweetsFromStorage();


    // Remove the X from the tweet

    const tweetDelete = tweet.substring(0, tweet.length -1 );

    // Loop through the tweets and remove the tweet that's equal
    tweets.forEach(function (tweetLS, index) {
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1)
        }
    })

    // Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets))

}