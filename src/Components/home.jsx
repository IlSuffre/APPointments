import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase-config.js';
import { NavBar } from './nav_bar.jsx';
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

export const Home = () => {
  const navigate = useNavigate()
  const [uid, setUid] = useState(null);
  const [user_data, setUserData] = useState({});

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {return}; //serve per evitare che venga eseguito il codice sotto quando loading è true
    if(user==null || user==undefined) navigate('/');
    else{setUid(user.uid);}
  }, [loading, user]);


  useEffect(() => {
    if (uid){
    const getUserData = async () => {
      onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
        setUserData(doc.data());
      });
    }
      getUserData();
    }
  }, [uid]);

  useEffect(() => {
    if (!("Notification" in window)) alert ("Questo browser non supporta le notifiche desktop")
 },[])

  const logout = () => {
    try {
      signOut(auth).catch((error) => {console.log("Signout erroe: "+ error)})
      localStorage.clear()
      navigate('/')
    }
    catch (error) {
      console.log(error.message)
    } 
  }
  return (
      <div>
          <NavBar 
            user_data= {user_data}
            logout={logout}
          >
          </NavBar>
          
      </div>
  )
}