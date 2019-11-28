import React, { useState, useEffect, useRef } from 'react';
import { SignIn } from './SignIn';
import './App.css';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

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
        if(res.status) {
          setUsername(usernameSignin);
        }
      })
    } else {
      console.log(1111)
    }
  }

  if (!username) {
    return <SignIn signIn={signIn} usernameRef={usernameRef} passwordRef={passwordRef} />
  } else {
    return (
      <div className="App">
        <div className="bottom-table" />
      </div>
    );
  }
}

export default App;
