/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

*/


const cardContainer = document.querySelector('.react-card');

// React component for form inputs
class CardInput extends React.Component {
  render() {
    return(
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return(
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}


// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the card (main component)
class Card extends React.Component {
  render() {
    return(
      <div className='card-container' onClick={this.flipCard}>
        <div className='card-body'>
          <CardBack text="Correct!" />

          <CardFront text="Volare" />
        </div>
      </div>
    )
  }
}

class CreateCardMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = { english: "Hello", chinese: "你好", error: "" }

        this.checkReturn = this.checkReturn.bind(this);
        this.saveCard = this.saveCard.bind(this);
    }

    render() {return (
        <main>
            <div id={"topSection"}>
                <a href="/user/lango.html">
                    <button id="addButton">Add</button>
                </a>
                <h1>Lango!</h1>
            </div>
            <div class="react-card">
              <Card onClick={document.querySelector(".card-container").classList.toggle("flip");}/>
            </div>
            <InputBox>
                <textarea id="inputEng" onKeyPress={this.checkReturn} />
            </InputBox>
            <Button>
                <button id="saveButton" onClick={this.saveCard} >Next</button>
            </Button>
            <Message>
                <Txt phrase={this.state.error} />
            </Message>
            <div id="userName">UserName</div>
        </main>
    );
    } // end of render function


    // 原来是 <textarea id="inputEng" onKeyPress={this.checkReturn} />
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
                this.setState({english: object.English, chinese: object.Chinese, error: ""} );
            };
            xhr.onerror = () => {
                this.setState({english: object.English, chinese: object.Chinese, error: "Woops, there was an error making the api request."});
            };
            xhr.send();
        }
    }
    saveCard(){
        let url = "store?english=" + this.state.english +"&chinese="+this.state.chinese;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            this.setState({english: object.English, chinese: object.Chinese, error: "DB saved success"});
        };
        xhr.onerror = () => {
            this.setState({english: this.state.english, chinese: this.state.chinese, error: "Woops, there was an error making the dp request."});
        };
        xhr.send();
    }


} // end of class


ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);

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

function Txt(props) {
   if (props.phrase == undefined) {
        return <p>Text missing</p>;
    }
    else return <p>{props.phrase}</p>;
}

//这里把旧的Card当作InputBox
function InputBox(props) {
    return <div className="textBox">
        {props.children}
    </div>;
}
//它有textarea


// // 把Card 放进名为 document.querySelector('.react-card'); class叫react-card 的地方
// // 这相当于用createcardmain把card放进一个div，class叫react-card。
// // Render Card component
// ReactDOM.render(<Card />, cardContainer);
