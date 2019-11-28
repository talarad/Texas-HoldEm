import React, { useState, useEffect, useRef } from 'react';
import { SignIn } from './SignIn';
import './App.css';
import { TemporaryDrawer } from './drawer';
import cards from './cards'
import { TopBar } from './AppBar';

let deck = shuffleArray(cards);

function shuffleArray(cardsDeck: {}[]) {
  for (let i = cardsDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]];

  }

  return cardsDeck;
}


const App: React.FC = () => {
  const [username, setUsername] = useState<string | undefined>("x");// Change back to undefined
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const [cardsInBoard, updateCardsInBoard] = useState<any[]>([])


  function renderCards() {
    return cardsInBoard.map((card, index) => {
      const cardName = `${card.number}${card.kind[0]}`
      return <div className="card" key={cardName}> <img src={require(`./images/${cardName}.jpg`)} width="100px" height="150px" /></div >
    })
  }

  function signIn() {
    let usernameSignin: string;
    let passwordSignin: string;

    if (usernameRef.current && passwordRef.current) {
      usernameSignin = usernameRef.current.value;
      passwordSignin = passwordRef.current.value;

      fetch('/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameSignin, passwordSignin })
      }).then(res => res.json()).then(res => {
        if (res.status) {
          setUsername(usernameSignin);
        }
      })
    } else {
      console.log(1111)
    }
  }

  function addRandomCard() {
    const newDeck = [...cardsInBoard]
    const randomNum = Math.floor(Math.random() * (deck.length));
    newDeck.push(deck[randomNum]);
    deck.splice(randomNum, 1)

    updateCardsInBoard(newDeck)
  }

  if (!username) {
    return <SignIn signIn={signIn} usernameRef={usernameRef} passwordRef={passwordRef} />
  } else {
    return (
      <div className="gameWrap">
        <TopBar />
        <div className="bottom-table">
          <div>
            <button onClick={addRandomCard}>ADD CARD</button>
          </div>
          {renderCards()}
        </div>
      </div>
    );
  }
}

export default App;
