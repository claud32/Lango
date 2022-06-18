// 'use strict'
//
// function Card(props) {
//     return <div className="textCard">
//     	   {props.children}
// 	</div>;
// 	}
//
//
// function Txt(props) {
// 	 if (props.phrase == undefined) {
// 	    return <p>Text missing</p>;
// 	    }
// 	 else return <p id="outputChin">{props.phrase}</p>;
// 	 }
//
// function Error(props){
//     if (props.err) == undefined
// }
//
//
// class CreateCardMain extends React.Component {
//
//   constructor(props) {
//       super(props);
//       this.state = { opinion: "Life is a bowl of cherries" }
//
//       this.checkReturn = this.checkReturn.bind(this);
//       this.saveVoca = this.saveVoca.bind(this);
//       }
//
//   render() {return (
//       <main>
//       <Card>
//  	<textarea id="inputEng" onKeyPress={this.checkReturn} />
//       </Card>
//       <Card>
//  	<Txt phrase={this.state.opinion} />
//       </Card>
//           <button type="button" onClick={this.saveVoca}>save</button>
//           <p id="errorMsg" err={}> </p>
//       </main>
//       );
//     } // end of render function
//
//     // onKeyPress function for the textarea element
//     // When the charCode is 13, the user has hit the return key
//     checkReturn(event) {
//         if (event.charCode == 13) {
//             let newPhrase = document.getElementById("inputEng").value;
//
//             let url = "translate?english=" + newPhrase;
//             let xhr = new XMLHttpRequest();
//             xhr.open('GET', url, true);
//             xhr.onload = () => {
//                 let responseStr = xhr.responseText;  // get the JSON string
//
//                 let object = JSON.parse(responseStr);  // turn it into an object
//
//                 //change  "y.textContent = responseStr; to set opinion of state
//                 this.setState({opinion: object.Chinese});
//             };
//             xhr.onerror = function () {
//                 alert('Woops, there was an error making the request.');
//             };
//             xhr.send();
//         }
//     }
//
//         saveVoca (){
//         let english = document.getElementById("inputEng").value;
//         let chinese = document.getElementById("outputChin").textContent;
//         let error = document.getElementById("errorMsg");
//         console.log(english);
//         console.log(chinese);
//             let url = "store?english=" + english +"&chinese="+chinese;
//             let xhr = new XMLHttpRequest();
//             xhr.open('GET', url, true);
//             xhr.onload = function() {
//                 let responseStr = xhr.responseText;  // get the JSON string
//                 //let object = JSON.parse(responseStr);  // turn it into an object
//                 // z.textContent = responseStr;
//             };
//             xhr.onerror = function() {
//                 alert('Woops, there was an error making the request.');
//             };
//             xhr.send();
//         }
//   }// end of class
//
//
//
// ReactDOM.render(
//     <CreateCardMain />,
//     document.getElementById('root')
// );

'use strict';

function Card(props) {
    return <div className="textCard">
        {props.children}
    </div>;
}


function Txt(props) {
    if (props.phrase == undefined) {
        return <p>Text missing</p>;
    }
    else return <p>{props.phrase}</p>;
}

function Button(props) {
    return <div className="Button">
        {props.children}
    </div>;
}

function Message(props) {
    return <div className="errorMessage">
        {props.children}
    </div>;
}

// function Foot(props) {
//     return <div className="errorMessage">
//         {props.children}
//     </div>;


class CreateCardMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {english: "Hello", chinese: "你好", error: "", userName: "UserName"};

        this.checkReturn = this.checkReturn.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.checkName = this.checkName.bind(this);
    }

    componentDidMount() {
        setTimeout(this.checkName,0);
    }

    render() {
        return (
            <main>
                <div id={"topSection"}>
                    <a href="/user/review.html">
                        <button id="reviewButton">Start Review</button>
                    </a>
                    <h1>Lango!</h1>
                </div>
                <div id="cards">
                    <Card>
                        <textarea id="inputEng" onKeyPress={this.checkReturn}/>
                    </Card>
                    <Card>
                        <Txt phrase={this.state.chinese}/>
                    </Card>
                </div>
                <Button>
                    <button id="saveButton" onClick={this.saveCard}>Save</button>
                </Button>
                <Message>
                    <Txt phrase={this.state.error}/>
                </Message>
                <div id="userName"><Txt phrase={this.state.userName} /></div>
            </main>
        );
    } // end of render function


    // onKeyPress function for the textarea element
    // When the charCode is 13, the user has hit the return key
    checkReturn(event) {
        if (event.charCode == 13) {
            let newPhrase = document.getElementById("inputEng").value;

            let url = "translate?english=" + newPhrase;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = () => {
                let responseStr = xhr.responseText;  // get the JSON string

                let object = JSON.parse(responseStr);  // turn it into an object

                //change  "y.textContent = responseStr; to set opinion of state
                this.setState({english: object.English, chinese: object.Chinese, error: ""});
            };
            xhr.onerror = () => {
                this.setState({
                    english: object.English,
                    chinese: object.Chinese,
                    error: "Woops, there was an error making the api request."
                });
            };
            xhr.send();
        }
    }

    saveCard() {
        let url = "store?english=" + this.state.english + "&chinese=" + this.state.chinese;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            this.setState({english: object.English, chinese: object.Chinese, error: "DB saved success"});
        };
        xhr.onerror = () => {
            this.setState({
                english: this.state.english,
                chinese: this.state.chinese,
                error: "Woops, there was an error making the dp request."
            });
        };
        xhr.send();
    }

    checkName() {
        console.log("Here we are! checkName");
        let url = "footer?name=" + 1;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            console.log("In checkName, object.userName is", object.userName);
            this.setState({userName: object.userName});
        };
        xhr.onerror = () => {
            this.setState({
                english: this.state.english,
                chinese: this.state.chinese,
                error: "Woops, there was an error getting the name."
            });
        };
        xhr.send();
    }
}

 // end of class
    ReactDOM.render(
<CreateCardMain />,
    document.getElementById('root')
);



	 