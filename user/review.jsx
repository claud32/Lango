'use strict';
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
class Card2 extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className='card-container' onClick={flipCard}>
                <div className='card-body'>
                    <CardBack text={this.props.english} />

                    <CardFront text={this.props.chinese} />
                </div>
            </div>
        )
    }
}

// Render Card component
// ReactDOM.render(<Card2 />, cardContainer);



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

class CreateCardMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = { english: "", chinese: "", error: "" ,userName:"UserName"};

        this.checkReturn = this.checkReturn.bind(this);
        this.checkName = this.checkName.bind(this);
        this.getState = this.getState.bind(this);
    }

    componentDidMount() {
        setTimeout(this.checkName,0);
        setTimeout(this.getState,0);
    }

    render() {return (
        <main>
            <div id={"topSection"}>
                <a href="/user/lango.html">
                    <button id="addButton">Add</button>
                </a>
                <h1>Lango!</h1>
            </div>
            <div class={"react-card"}>
                <Card2 chinese={this.state.chinese} english={this.state.english}/>
            </div>
            <Card>
                <textarea id="inputEng" onKeyPress={this.checkReturn}/>
            </Card>
            <Button>
                <button id="nextButton" onClick={this.getState}>Next</button>
            </Button>
            {/*<Message>*/}
            {/*<Txt phrase={this.state.error} />*/}
            {/*</Message>*/}
            <div id="userName"><Txt phrase={this.state.userName} /></div>
        </main>
    );
    } // end of render function


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

    getState(){
        console.log("We are getting Chinese!!");
        let url = "getState?chinese=" + 1;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            console.log("In getState, object.reviewChinese is", object.reviewChinese);
            console.log("In getState, object.reviewEnglish is", object.reviewEnglish);
            this.setState({english: object.reviewEnglish, chinese: object.reviewChinese});
        };
        xhr.onerror = () => {
            this.setState({
                error: "Woops, there was an error getting the getState."
            });
        };
        xhr.send();
    }


    checkReturn(event) {
        if (event.charCode == 13) {
            let newPhrase = document.getElementById("inputEng").value;
            if (newPhrase == this.state.english){
                this.setState({english: "correct!"});
                let url = "updateCorrect?chinese=" + this.state.chinese;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = () => {
                    console.log("check return is good update db");
                };
                xhr.onerror = () => {
                    this.setState({
                        error: "Woops, there was an error getting the checkReturn."
                    });
                };
                xhr.send();
            }
        }
    }




} // end of class



ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);

function flipCard(){
  document.querySelector(".card-container").classList.toggle("flip");
}

