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

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function Card(props) {
    return React.createElement("div", {
        className: "textCard"
    }, props.children);
}

function Txt(props) {
    if (props.phrase == undefined) {
        return React.createElement("p", null, "Text missing");
    } else return React.createElement("p", null, props.phrase);
}

function Button(props) {
    return React.createElement("div", {
        className: "Button"
    }, props.children);
}

function Message(props) {
    return React.createElement("div", {
        className: "errorMessage"
    }, props.children);
} // function Foot(props) {
//     return <div className="errorMessage">
//         {props.children}
//     </div>;


var CreateCardMain =
    /*#__PURE__*/
    function (_React$Component) {
        _inherits(CreateCardMain, _React$Component);

        function CreateCardMain(props) {
            var _this;

            _classCallCheck(this, CreateCardMain);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(CreateCardMain).call(this, props));
            _this.state = {
                english: "Hello",
                chinese: "你好",
                error: "",
                userName: "UserName"
            };
            _this.checkReturn = _this.checkReturn.bind(_assertThisInitialized(_this));
            _this.saveCard = _this.saveCard.bind(_assertThisInitialized(_this));
            _this.checkName = _this.checkName.bind(_assertThisInitialized(_this));
            return _this;
        }

        _createClass(CreateCardMain, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                setTimeout(this.checkName, 0);
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement("main", null, React.createElement("div", {
                    id: "topSection"
                }, React.createElement("a", {
                    href: "/user/review.html"
                }, React.createElement("button", {
                    id: "reviewButton"
                }, "Start Review")), React.createElement("h1", null, "Lango!")), React.createElement("div", {
                    id: "cards"
                }, React.createElement(Card, null, React.createElement("textarea", {
                    id: "inputEng",
                    onKeyPress: this.checkReturn
                })), React.createElement(Card, null, React.createElement(Txt, {
                    phrase: this.state.chinese
                }))), React.createElement(Button, null, React.createElement("button", {
                    id: "saveButton",
                    onClick: this.saveCard
                }, "Save")), React.createElement(Message, null, React.createElement(Txt, {
                    phrase: this.state.error
                })), React.createElement("div", {
                    id: "userName"
                }, React.createElement(Txt, {
                    phrase: this.state.userName
                })));
            } // end of render function
            // onKeyPress function for the textarea element
            // When the charCode is 13, the user has hit the return key

        }, {
            key: "checkReturn",
            value: function checkReturn(event) {
                var _this2 = this;

                if (event.charCode == 13) {
                    var newPhrase = document.getElementById("inputEng").value;
                    var url = "translate?english=" + newPhrase;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);

                    xhr.onload = function () {
                        var responseStr = xhr.responseText; // get the JSON string

                        var object = JSON.parse(responseStr); // turn it into an object
                        //change  "y.textContent = responseStr; to set opinion of state

                        _this2.setState({
                            english: object.English,
                            chinese: object.Chinese,
                            error: ""
                        });
                    };

                    xhr.onerror = function () {
                        _this2.setState({
                            english: object.English,
                            chinese: object.Chinese,
                            error: "Woops, there was an error making the api request."
                        });
                    };

                    xhr.send();
                }
            }
        }, {
            key: "saveCard",
            value: function saveCard() {
                var _this3 = this;

                var url = "store?english=" + this.state.english + "&chinese=" + this.state.chinese;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function () {
                    var responseStr = xhr.responseText; // get the JSON string

                    var object = JSON.parse(responseStr); // turn it into an object

                    _this3.setState({
                        english: object.English,
                        chinese: object.Chinese,
                        error: "DB saved success"
                    });
                };

                xhr.onerror = function () {
                    _this3.setState({
                        english: _this3.state.english,
                        chinese: _this3.state.chinese,
                        error: "Woops, there was an error making the dp request."
                    });
                };

                xhr.send();
            }
        }, {
            key: "checkName",
            value: function checkName() {
                var _this4 = this;

                console.log("Here we are! checkName");
                var url = "footer?name=" + 1;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function () {
                    var responseStr = xhr.responseText; // get the JSON string

                    var object = JSON.parse(responseStr); // turn it into an object

                    console.log("In checkName, object.userName is", object.userName);

                    _this4.setState({
                        userName: object.userName
                    });
                };

                xhr.onerror = function () {
                    _this4.setState({
                        english: _this4.state.english,
                        chinese: _this4.state.chinese,
                        error: "Woops, there was an error getting the name."
                    });
                };

                xhr.send();
            }
        }]);

        return CreateCardMain;
    }(React.Component); // end of class


ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));