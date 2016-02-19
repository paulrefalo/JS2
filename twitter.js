var tweets = new Array();

window.onload = init;

function init() {
    getTweetData();					// get the twitter data feed from twitter.json
    console.log(tweets);
}

function getTweetData() {
    var request = new XMLHttpRequest();
    request.open("GET", "twitter.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                parseTweetItems(this.responseText);	// if the status is 200 parse the tweet
                addTweetsToPage();			// then add the tweet to the ul id="tweet"
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}          

function parseTweetItems(tweetJSON) {
    if (tweetJSON == null || tweetJSON.trim() == "") {		// check for no or empty tweet
      console.log("Hi");
      return;
    }
    var tweetArray = JSON.parse(tweetJSON);
    // console.log(todoArray);
    if(tweetArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    }
    for (var i = 0; i < tweetArray.length; i++) {		// if the tweetArray.length > 0
        var tweetItem = tweetArray[i];
        tweets.push(tweetItem);					// push item into global tweets array
    }
}

function addTweetsToPage() {
    var ul = document.getElementById("tweet");			// write to ul id="tweet"
    for (var i = 0; i < tweets.length; i++) {
        var tweetItem = tweets[i];
        var li = document.createElement("li");			// create an <li>
        li.innerHTML =
          tweetItem.user.name + ": " + tweetItem.text;		// append to <li>
        ul.appendChild(li);
    }
}