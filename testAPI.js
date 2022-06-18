"use strict"

const APIrequest = require('request');
const http = require('http');

const APIkey = "";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

// An object containing the data expressing the query to the
// translate API. 
// Below, gets stringified and put into the body of an HTTP PUT request.
let requestObject = 
    {
	"source": "en",
	"target": "zh-CN",
	"q": [
	    "example phrase"
	]
    }

console.log("English phrase: ", requestObject.q[0]);
	    
// The call that makes a request to the API
// Uses the Node request module, which packs up and sends off
// an HTTP message containing the request to the API server
APIrequest(
	{ // HTTP header stuff
	    url: url,
	    method: "POST",
	    headers: {"content-type": "application/json"},
	    // will turn the given object into JSON
	    json: requestObject	},
	// callback function for API request
	APIcallback
    );

    // callback function, called when data is received from API
    function APIcallback(err, APIresHead, APIresBody) {
	// gets three objects as input
	if ((err) || (APIresHead.statusCode != 200)) {
	    // API is not working
	    console.log("Got API error");
	    console.log(APIresBody);
	} else {
	    if (APIresHead.error) {
		// API worked but is not giving you data
		console.log(APIresHead.error);
	    } else {
		console.log("In Chinese: ", 
		    APIresBody.data.translations[0].translatedText);
		console.log("\n\nJSON was:");
		console.log(JSON.stringify(APIresBody, undefined, 2));
		// print it out as a string, nicely formatted
	    }
	}
    } // end callback function

