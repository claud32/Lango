'use strict';

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CardInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardInput, _React$Component);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardInput).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: "render",
    value: function render() {
      return React.createElement("fieldset", null, React.createElement("input", {
        name: this.props.name,
        id: this.props.id,
        type: this.props.type || 'text',
        placeholder: this.props.placeholder,
        required: true
      }));
    }
  }]);

  return CardInput;
}(React.Component); // React component for textarea


var CardTextarea =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(CardTextarea, _React$Component2);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardTextarea).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: "render",
    value: function render() {
      return React.createElement("fieldset", null, React.createElement("textarea", {
        name: this.props.name,
        id: this.props.id,
        placeholder: this.props.placeholder,
        required: true
      }));
    }
  }]);

  return CardTextarea;
}(React.Component); // React component for the front side of the card


var CardFront =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(CardFront, _React$Component3);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardFront).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        className: "card-side side-front"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("h2", {
        id: "trans"
      }, this.props.text)));
    }
  }]);

  return CardFront;
}(React.Component); // React component for the back side of the card


var CardBack =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(CardBack, _React$Component4);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardBack).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement("div", {
        className: "card-side side-back"
      }, React.createElement("div", {
        className: "card-side-container"
      }, React.createElement("h2", {
        id: "congrats"
      }, this.props.text)));
    }
  }]);

  return CardBack;
}(React.Component); // React component for the card (main component)


var Card2 =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(Card2, _React$Component5);

  function Card2(props) {
    _classCallCheck(this, Card2);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card2).call(this, props));
  }

  _createClass(Card2, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "card-container",
        onClick: flipCard
      }, React.createElement("div", {
        className: "card-body"
      }, React.createElement(CardBack, {
        text: this.props.english
      }), React.createElement(CardFront, {
        text: this.props.chinese
      })));
    }
  }]);

  return Card2;
}(React.Component); // Render Card component
// ReactDOM.render(<Card2 />, cardContainer);


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
}

var CreateCardMain =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(CreateCardMain, _React$Component6);

  function CreateCardMain(props) {
    var _this;

    _classCallCheck(this, CreateCardMain);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CreateCardMain).call(this, props));
    _this.state = {
      english: "",
      chinese: "",
      error: "",
      userName: "UserName"
    };
    _this.checkReturn = _this.checkReturn.bind(_assertThisInitialized(_this));
    _this.checkName = _this.checkName.bind(_assertThisInitialized(_this));
    _this.getState = _this.getState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CreateCardMain, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      setTimeout(this.checkName, 0);
      setTimeout(this.getState, 0);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("main", null, React.createElement("div", {
        id: "topSection"
      }, React.createElement("a", {
        href: "/user/lango.html"
      }, React.createElement("button", {
        id: "addButton"
      }, "Add")), React.createElement("h1", null, "Lango!")), React.createElement("div", {
        class: "react-card"
      }, React.createElement(Card2, {
        chinese: this.state.chinese,
        english: this.state.english
      })), React.createElement(Card, null, React.createElement("textarea", {
        id: "inputEng",
        onKeyPress: this.checkReturn
      })), React.createElement(Button, null, React.createElement("button", {
        id: "nextButton",
        onClick: this.getState
      }, "Next")), React.createElement("div", {
        id: "userName"
      }, React.createElement(Txt, {
        phrase: this.state.userName
      })));
    } // end of render function

  }, {
    key: "checkName",
    value: function checkName() {
      var _this2 = this;

      console.log("Here we are! checkName");
      var url = "footer?name=" + 1;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function () {
        var responseStr = xhr.responseText; // get the JSON string

        var object = JSON.parse(responseStr); // turn it into an object

        console.log("In checkName, object.userName is", object.userName);

        _this2.setState({
          userName: object.userName
        });
      };

      xhr.onerror = function () {
        _this2.setState({
          english: _this2.state.english,
          chinese: _this2.state.chinese,
          error: "Woops, there was an error getting the name."
        });
      };

      xhr.send();
    }
  }, {
    key: "getState",
    value: function getState() {
      var _this3 = this;

      console.log("We are getting Chinese!!");
      var url = "getState?chinese=" + 1;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function () {
        var responseStr = xhr.responseText; // get the JSON string

        var object = JSON.parse(responseStr); // turn it into an object

        console.log("In getState, object.reviewChinese is", object.reviewChinese);
        console.log("In getState, object.reviewEnglish is", object.reviewEnglish);

        _this3.setState({
          english: object.reviewEnglish,
          chinese: object.reviewChinese
        });
      };

      xhr.onerror = function () {
        _this3.setState({
          error: "Woops, there was an error getting the getState."
        });
      };

      xhr.send();
    }
  }, {
    key: "checkReturn",
    value: function checkReturn(event) {
      var _this4 = this;

      if (event.charCode == 13) {
        var newPhrase = document.getElementById("inputEng").value;

        if (newPhrase == this.state.english) {
          this.setState({
            english: "correct!"
          });
          var url = "updateCorrect?chinese=" + this.state.chinese;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);

          xhr.onload = function () {
            console.log("check return is good update db");
          };

          xhr.onerror = function () {
            _this4.setState({
              error: "Woops, there was an error getting the checkReturn."
            });
          };

          xhr.send();
        }
      }
    }
  }]);

  return CreateCardMain;
}(React.Component); // end of class


ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));

function flipCard() {
  document.querySelector(".card-container").classList.toggle("flip");
}