import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/Firebase';
import "firebase/auth";

import './Login.css';

const Verify = () => {
  const [status, setStatus] = useState('Autenticando...');

  useEffect(() => {
    const email = window.localStorage.getItem('simpleMessengerEmail');
    const isSignIn = firebase.auth().isSignInWithEmailLink(window.location.href);
    const signIn = firebase.auth().signInWithEmailLink(email, window.location.href);

    if (!isSignIn || !signIn) {
      setStatus('404');
      return;
    }

    firebase.auth().onAuthStateChanged(user => {
      console.log('Verify', user);
      const url = `http://localhost:3333/level?uid=${user.uid}`;
      fetch(url)
        .then(res => {
          if (res.status === 200) {
            return res.json()
          } else {
            return null
          }
        })
        .then(data => {
          console.log(data)
          switch (data.level) {
            case "user":
              setStatus('Direcionando para mensagens...');
              window.location.href = `messages/${user.uid}`;
              break;
            case "admin":
              setStatus('Direcionando para contatos...');
              window.location.href = `contacts/${user.uid}`;
              break;
            default:
              setStatus('invalid user level');
              break;
          }
        })
        .catch(err => {
          console.error(err)
          setStatus('404');
        })
    });


  }, []);

  return (
    <div className="App">
      {status}
    </div>
  );
}

export default Verify;
