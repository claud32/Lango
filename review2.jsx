 'use strict';
/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:

      https://reactjsexample.com/react-flipping-card-with-tutorial/
*/


// const cardContainer = document.querySelector('#cards');

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
    render(props) {
        return(
            <div className='card-container'>
                <div className='card-body'>
                    <CardBack text={this.props.back} />

                    <CardFront text={this.props.front} />
                </div>
            </div>
        )
    }
}

// Render Card component
// ReactDOM.render(<Card />, cardContainer);


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
        this.state = { english: "Hello", chinese: "你好", error: "" }

        // this.checkReturn = this.checkReturn.bind(this);
        // this.saveCard = this.saveCard.bind(this);
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
                <Card front={this.state.english} back={this.state.chinese} />
            </div>
            <div>
                <textarea id="inputEng"/>
            </div>
            <Button>
                <button id="nextButton" >Next</button>
            </Button>
            {/*<Message>*/}
                {/*<Txt phrase={this.state.error} />*/}
            {/*</Message>*/}
            <div id="userName">UserName</div>
        </main>
    );
    } // end of render function



} // end of class



ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);