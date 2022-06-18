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
        this.state = {reviewChinese:"你好吗"};
        this.getChinese = this.getChinese.bind(this);
    }

    componentDidMount() {
        setTimeout(this.getChinese,0);
    }

    render() {
        return(
            <div className='card-container'>
                <div className='card-body'>
                    <CardBack text="Correct!" />

                    <CardFront text={this.state.reviewChinese} />
                </div>
            </div>
        )
    }
    getChinese(){
        console.log("We are getting Chinese!!");
        let url = "getChinese?chinese=" + 1;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            console.log("In getChinese, object.reviewChinese is", object.reviewChinese);
            this.setState({reviewChinese: object.reviewChinese});
        };
        xhr.onerror = () => {
            this.setState({
                error: "Woops, there was an error getting the reviewChinese."
            });
        };
        xhr.send();
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
        this.state = { english: "Hello", chinese: "你好", error: "" ,userName:"UserName", fromCard:""};

        // this.checkReturn = this.checkReturn.bind(this);
        // this.saveCard = this.saveCard.bind(this);
        this.checkName = this.checkName.bind(this);
        this.getChinese = this.getChinese.bind(this);
    }

    componentDidMount() {
        setTimeout(this.checkName,0);
    }

    render() {return (
        <main>
            <div id={"topSection"}>
                <a href="/user/lango.html">
                    <button id="addButton">Add</button>
                </a>
                <h1>Lango!</h1>
            </div>
            <div id="cards">
                <Card2 >
                    <Card>
                        <Txt phrase={this.state.chinese} />
                    </Card>
                </Card2>
            </div>
            <Card>
                <textarea id="inputEng"/>
            </Card>
            <Button>
                <button id="nextButton" onClick={this.getChinese}>Next</button>
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

    getChinese(){
        console.log("We are getting Chinese!!");
        let url = "getChinese?chinese2=" + 1;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            let responseStr = xhr.responseText;  // get the JSON string
            let object = JSON.parse(responseStr);  // turn it into an object
            console.log("In getChinese, object.reviewChinese is", object.reviewChinese);
            this.setState({reviewChinese: object.reviewChinese});
        };
        xhr.onerror = () => {
            this.setState({
                error: "Woops, there was an error getting the reviewChinese."
            });
        };
        xhr.send();
    }




} // end of class



ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);