"use strict";



/* this is miniserver3.js*/

const express = require('express')
const port = 51543// you need to put your port number here //52193

const APIrequest = require('request');
const http = require('http');

const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

const APIkey = "";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

const passport = require('passport'); //use passport.js in node
const cookieSession = require('cookie-session'); // use cookie-session in node

const GoogleStrategy = require('passport-google-oauth20'); // use passport-oauth20 in node
const sqlite = require('sqlite3'); // use SQLlite in node

const googleLoginData = {
    clientID: '',
    clientSecret: '',
    callbackURL: '/auth/redirect' // redirect the access code to /auth/redirect in server
};

function queryHandler(req, res, next) {
    let reqUrl = req.url;
    let qObj = req.query;

    /* this is testAPI.js*/


// An object containing the data expressing the query to the
// translate API. 
// Below, gets stringified and put into the body of an HTTP PUT request.
let requestObject = 
    {
    "source": "en",
    "target": "zh-CN",
    "q": [
        qObj.english
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
        json: requestObject },
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
        // console.log("In Chinese: ", 
        //     APIresBody.data.translations[0].translatedText);
        // console.log("\n\nJSON was:");
        // console.log(JSON.stringify(APIresBody, undefined, 2));
        // print it out as a string, nicely formatted

            console.log(qObj);
            if (qObj.english != undefined) {
            res.json( {"English" : qObj.english, "Chinese": APIresBody.data.translations[0].translatedText} );
            }
            else {
            next();
            }
        }
    }
    } // end callback function

    /*this is the end of testAPI.js*/
    

}

function queryHandler2(req, res, next) {
    let reqUrl = req.url;
    let qObj = req.query;

    //qObj.english
    //qObj.chinese

    console.log(qObj);


    if ((qObj.english != undefined) && (qObj.chinese != undefined)){
        const cmdStr = 'INSERT into Flashcards (user, english, chinese, seen, correct, score) VALUES (@0, @1, @2, 0, 0, 0)';
        let userData1 = JSON.parse(req.user.userData);
        console.log("Insert into Flashcards table:",userData1.GoogleID ,qObj.english, qObj.chinese);
        db.run(cmdStr, userData1.GoogleID,qObj.english, qObj.chinese, insertCallBack);
        function insertCallBack(err){
            if (err) { res.json({response: err});}
            else { res.json({"English" : qObj.english, "Chinese": qObj.chinese});}
        }
    }
    else {
        next();
    }
    // function insertCallBack(err){
    //     if (err) { res.json({response: err});}
    //     else { res.json({"English" : qObj.english, "Chinese": qObj.chinese});}
    // }
}

function nameQueryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    console.log("nameQueryHandler here");
    //qObj.english
    //qObj.chinese
    //
    // console.log(qObj);
    if(qObj.name!=undefined){
        const cmdStr = 'SELECT firstName FROM Users WHERE GoogleID=?';
        let userData1 = JSON.parse(req.user.userData);
        console.log("SELECT firstName FROM Users WHERE GoogleID=?",userData1.GoogleID);
        db.get(cmdStr, [userData1.GoogleID], selectCallBack);
        function selectCallBack(err,data){
            if (err) {
                res.json({response: err});
            } else if(data) {
                console.log("data from name:",data);
            res.json({userName:data.firstName});
            } else {
            next();
            }
        }
    }

}

function getStateQueryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    console.log("getStateQueryHandler here");
    //qObj.english
    //qObj.chinese
    //
    // console.log(qObj);
    if(qObj.chinese!=undefined){
        let userData1 = JSON.parse(req.user.userData);
        const cmdStr = 'SELECT * FROM Flashcards WHERE user=? ORDER BY seen ASC';
        console.log("SELECT chinese FROM Flashcards WHERE user=? ORDER BY seen ASC",userData1.GoogleID);
        db.get(cmdStr, [userData1.GoogleID], selectChineseCallBack);
        function selectChineseCallBack(err,data){
            if (err) {
                res.json({response: err});
            } else if(data) {
                console.log("data from chineseQuery:",data);
                const cmdStr2 = 'UPDATE Flashcards SET seen=seen+1 WHERE chinese=?';
                db.run(cmdStr2, data.chinese, updateCallBack);
                function updateCallBack(err){
                    if (err) {
                        console.log(err);
                    } else{
                        console.log("seen+1;")
                    }
                }
                res.json({reviewChinese:data.chinese, reviewEnglish:data.english});
            } else {
                next();
            }
        }

    }
}

function correctHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    console.log("correctHandler here");
    //qObj.english
    //qObj.chinese
    //
    // console.log(qObj);
    if(qObj.chinese!=undefined){
        let userData1 = JSON.parse(req.user.userData);
        console.log("update score and correct!");
        console.log("update score and correct!");
        console.log("update score and correct!");
        console.log("update score and correct!");
        const cmdStr = 'UPDATE Flashcards SET correct=correct+1, score=(max(1,5-correct)+max(1,5-seen)+5*((seen-correct)/seen)) WHERE chinese=?';
        db.run(cmdStr, qObj.chinese, updateCallBack);
        function updateCallBack(err){
            if (err) {
                console.log(err);
            } else{
                console.log("correct+1;")
            }
        }
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }



passport.use( new GoogleStrategy(googleLoginData, gotProfile) );


// put together the server pipeline
const app = express();
app.use('/', printURL);
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']
}));

// Initializes request object for further handling by passport
app.use(passport.initialize());

// If there is a valid cookie, will call deserializeUser()
app.use(passport.session());
app.use(express.static('public'));  // can I find a static file?
app.get('/auth/google',
    passport.authenticate('google',{ scope: ['profile'] }) );
// passport.authenticate sends off the 302 response
// with fancy redirect URL containing request for profile, and
// client ID string to identify this app.

// Google redirects here after user successfully logs in
// This route has three handler functions, one run after the other.
app.get('/auth/redirect',
    // for educational purposes
    function (req, res, next) {
        console.log("at auth/redirect");
        next();
    },
    // This will issue Server's own HTTPS request to Google
    // to access the user's profile information with the
    // temporary key we got in the request.
    passport.authenticate('google'),
    // then it will run the "gotProfile" callback function,
    // set up the cookie, call serialize, whose "done"
    // will come back here to send back the response
    // ...with a cookie in it for the Browser!
    // function(req, res) {
    //     console.log("req.user", req.user);
        // const cmdStr = 'if not exists(SELECT * FROM Flashcards WHERE user = ?)';
        // const cmdStr2 = 'if exists(SELECT 1 FROM Flashcards WHERE user = ?)';
        // db.run(cmdStr, [req.user], (err) => {
        //     if (err) {
        //         return console.error(err.message);
        //     }
        //     else {
        //         console.log("Flashcards are NOT found in DB table");
        //         res.redirect('/user/lango.html');
        //     }
        // });
        // db.get(cmdStr2, [req.user], (err,data) => {
        //     if (err) {
        //         return console.error(err.message);
        //     }
        //     else {
        //             console.log("Flashcards are found in DB table");
        //             console.log('Logged in and using cookies!');
        //             res.redirect('/user/review.html');
        //     }
        // });
        // if (data) {
        //     console.log("Flashcards are found in DB table");
        //     console.log('Logged in and using cookies!');
        //     res.redirect('/user/review.html');
        // }
        function(req, res){
            const cmdStr = 'SELECT * FROM Flashcards WHERE user = ?' ;
            db.get(cmdStr, [req.user], (err, data) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    else {
                        if (data!==undefined) {
                            console.log("Flashcards are found in DB table");
                            console.log('Logged in and using cookies!');
                            res.redirect('/user/review.html');
                        } else {
                            console.log("Flashcards are found in DB table");
                            res.redirect('/user/lango.html');}
                    }
                }
            )
});

// static files in /user are only available after login
app.get('/user/*',
    isAuthenticated, // only pass on to following function if
    // user is logged in
    // serving files that start with /user from here gets them from ./
    express.static('.')
);
app.get('/user/footer', nameQueryHandler); //check name for footer
app.get('/user/getState', getStateQueryHandler); //getChinese for review
app.get('/user/updateCorrect', correctHandler); //getChinese for review


app.get('/user/translate', queryHandler );   // if not, is it a valid query?
app.get('/user/store', queryHandler2 );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )



function dumpDB() {
    db.all ( 'SELECT * FROM flashcards', dataCallback);
    function dataCallback( err, data ) {console.log(data)}
}
dumpDB();

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

// function to check whether user is logged when trying to access
// personal data
function isAuthenticated(req, res, next) {
    if (req.user) {
        console.log("Req.session:",req.session);
        console.log("Req.user:",req.user);
        console.log("Req.user:",req.user.userData);
        next();
    } else {
        res.redirect('/login.html');  // send response telling
        // Browser to go to login page
    }
}


// Some functions Passport calls, that we can use to specialize.
// This is where we get to write our own code, not just boilerplate.
// The callback "done" at the end of each one resumes Passport's
// internal process.

// function called during login, the second time passport.authenticate
// is called (in /auth/redirect/),
// once we actually have the profile data from Google.
// function gotProfile(accessToken, refreshToken, profile, done) {
//     console.log("Google profile",profile);
//
//     const cmdStr = 'SELECT * FROM Users WHERE GoogleID='+ profile.id;
//     console.log("SELECT * FROM Users WHERE GoogleID=",profile.id);
//     db.get(cmdStr, dataCallBack);
//     let dbRowID = profile.id;
//     function dataCallBack(err, data){
//         if(err){
//             console.log("Check if user exists failed");
//         } else if(data != undefined) {
//             console.log("data:", data);
//         } else{
//             const cmdStr = 'INSERT into Users (firstName, lastName, GoogleID) VALUES (@0, @1, @2)';
//             db.run(cmdStr,profile.name.givenName, profile.name.familyName, profile.id, insertCallBack);
//             console.log("insert into user", profile.name.givenName, profile.name.familyName, profile.id);
//             function insertCallBack(err){
//                 if(err) {
//                     console.log("Insert profile failed");
//                 }
//             }
//         }
//     }
//
//     // here is a good place to check if user is in DB,
//     // and to store him in DB if not already there.
//     // Second arg to "done" will be passed into serializeUser,
//     // should be key to get user out of database.
//
//     // let dbRowID = profile.id;  // temporary! Should be the real unique
//     // key for db Row for this user in DB table.
//     // Note: cannot be zero, has to be something that evaluates to
//     // True.
//
//     done(null, dbRowID);
// }
function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);


    const cmdStr = 'SELECT * FROM Users WHERE GoogleID = ?' ;
    // console.log("SELECT * FROM Users WHERE GoogleID=",profile.id);

    let last6 = profile.id % 1000000;

    // first row only
    db.get(cmdStr, [last6], (err, row) => {
        if (err) { return console.error(err.message);}
        else{
            if (row){ console.log(row.firstName, row.lastName, row.GoogleID);}
            else {
                const cmdStr2 = 'INSERT into Users (firstName, lastName, GoogleID) VALUES (@0, @1, @2)';
                db.run(cmdStr2,profile.name.givenName, profile.name.familyName, last6, (err) => {if(err){console.log("Insert profile failed");}});
            }
        }
    });

    let dbRowID = last6;

    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there.
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    // let dbRowID = profile.id;  // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.

    done(null, dbRowID);
}

// Part of Server's session set-up.
// The second operand of "done" becomes the input to deserializeUser
// on every subsequent HTTP request with this session's cookie.
passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

// Called by passport.session pipeline stage on every HTTP request with
// a current session cookie.
// Where we should lookup user database info.
// Whatever we pass in the "done" callback becomes req.user
// and can be used by subsequent middleware.
passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object.
    const cmdStr = 'SELECT * FROM Users WHERE GoogleID = ?' ;
    db.get(cmdStr, [dbRowID], (err, row) => {
        if (err) { return console.error(err.message);}
        else{
            if (row){
                console.log("user is found in DB table Users");
                let userData = {userData: JSON.stringify({firstName: row.firstName,lastName: row.lastName, GoogleID: dbRowID})};
                done(null, userData);
            }else {
                console.log("user is not found in DB table Users");
            }
        }
    });
});
