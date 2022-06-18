// 'use strict'
//
// function loginAJAX() {
//     let url = 'auth/google';
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET',url,true);
//     xhr.onload = function () { console.log('logged in!'); };
//     xhr.onerror = function () { console.log('browser sees error');};
//     xhr.send();
// }
//
// class CreateLoginMain extends React.Component {
//
//     constructor(props) {
//         super(props);
//         // this.state = { english: "Hello", chinese: "你好", error: "" }
//         //
//         // this.checkReturn = this.checkReturn.bind(this);
//         // this.saveCard = this.saveCard.bind(this);
//     }
//
//     render() {return (
//         <main>
//             <div id="leftDiv">
//                 <div id="welcome">Welcome to Lango!</div>
//                 <div id="customize">Customize your vocabulary</div>
//             </div>
//             <div id="rightDiv">
//                 <a href="auth/google">
//                 <img src="google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png" />
//                 </a>
//             </div>
//         </main>
//     );
//     } // end of render function
//
//
//
// } // end of class
//
//
//
// ReactDOM.render(
// <CreateLoginMain />,
//     document.getElementById('root')
// );

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

function loginAJAX() {
    var url = 'auth/google';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        console.log('logged in!');
    };

    xhr.onerror = function () {
        console.log('browser sees error');
    };

    xhr.send();
}

var CreateLoginMain =
    /*#__PURE__*/
    function (_React$Component) {
        _inherits(CreateLoginMain, _React$Component);

        function CreateLoginMain(props) {
            _classCallCheck(this, CreateLoginMain);

            return _possibleConstructorReturn(this, _getPrototypeOf(CreateLoginMain).call(this, props)); // this.state = { english: "Hello", chinese: "你好", error: "" }
            //
            // this.checkReturn = this.checkReturn.bind(this);
            // this.saveCard = this.saveCard.bind(this);
        }

        _createClass(CreateLoginMain, [{
            key: "render",
            value: function render() {
                return React.createElement("main", null, React.createElement("div", {
                    id: "leftDiv"
                }, React.createElement("div", {
                    id: "welcome"
                }, "Welcome to Lango!"), React.createElement("div", {
                    id: "customize"
                }, "Customize your vocabulary")), React.createElement("div", {
                    id: "rightDiv"
                }, React.createElement("a", {
                    href: "auth/google"
                }, React.createElement("img", {
                    src: "google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png"
                }))));
            } // end of render function

        }]);

        return CreateLoginMain;
    }(React.Component); // end of class


ReactDOM.render(React.createElement(CreateLoginMain, null), document.getElementById('root'));



