import React, { useState, useEffect, useRef } from 'react';
import { SignIn } from './SignIn';
import './App.css';
import { TemporaryDrawer } from './drawer';
import cards from './cards'
import Player from './Player'
import { TopBar } from './AppBar';

let deck = shuffleArray(cards);

function shuffleArray(cardsDeck) {
  for (let i = cardsDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]];

  }

  return cardsDeck;
}

export default function App() {
  const [gameDeck, updateGameDeck] = useState(deck)
  const [username, setUsername] = useState("32"); //change back to undefined
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [cardsOnBoard, updateCardsOnBoard] = useState([])
  const [numOfPlayers, addNumOfPlayers] = useState(4)
  const [playersHands, updatePlayersHands] = useState(new Array(numOfPlayers))

  useEffect(() => {
    const newDeck = [...gameDeck]
    const currentPlayersHands = [...playersHands]

    currentPlayersHands.forEach(function (hand, index) {
      let randomNumber = Math.floor(Math.random() * (newDeck.length - 1));
      const firstCard = newDeck[randomNumber]
      console.log(newDeck[randomNumber])

      newDeck.splice(randomNumber, 1)

      randomNumber = Math.floor(Math.random() * (newDeck.length - 1));
      console.log(newDeck[randomNumber])
      const secondCard = newDeck[randomNumber];

      newDeck.splice(randomNumber, 1)


      currentPlayersHands[index] = {
        0: firstCard,
        1: secondCard
      }
    })

    updateGameDeck(newDeck)
    updatePlayersHands(currentPlayersHands)
  }, []);

  function renderCards() {
    return cardsOnBoard.map((card, index) => {
      const cardName = `${card.number}${card.kind[0]}`
      return <div className="card" key={cardName}>
        <img src={require(`./images/${cardName}.jpg`)} alt={index} width="100px" height="150px" /></div >
    })
  }

  function renderPlayers() {
    return playersHands.map((hand, i) => {
      return <Player hand={hand} key={i} />
    })
  }

  function signIn() {
    let usernameSignin;
    let passwordSignin;

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
      console.log("err")
    }
  }

  function addRandomCard() {

    const currentCards = [...cardsOnBoard]
    const newDeck = [...gameDeck]

    const randomNum = Math.floor(Math.random() * (newDeck.length));
    currentCards.push(newDeck[randomNum]);

    newDeck.splice(randomNum, 1)

    updateGameDeck(newDeck)
    updateCardsOnBoard(currentCards)
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
        <div className="players">
          {renderPlayers()}
        </div>
      </div>
    );
  }
}