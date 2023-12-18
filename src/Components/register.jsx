import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./style.css"
import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import { createProfile } from "../firebase-service.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
 


import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cellulare, setCellulare] = useState('')

    const [email_error, setEmail_error] = useState(false)
    const [password_error, setPassword_error] = useState(false)
    const [message_error, setMessage_error] = useState('')
    const [error_phone, setErrorPhone] = useState(false)

    const navigate = useNavigate()

    const phone_regex = new RegExp("^[0-9]{10}$")

    // tutti casi da controllare per registrare passowrd complessa 
    //separati per poter aiutare utente a capire cosa manca
    const lenght_password = new RegExp(".{8,}") //lunga almeno 8 caratteri
    const uppercase_password = new RegExp("(?=.*[A-Z])") //almeno una maiuscola
    const lowercase_password = new RegExp("(?=.*[a-z])") //almeno una minuscola
    const number_password = new RegExp("(?=.*[0-9])")  //almeno un numero


    const handleSubmit = async (event) => {
        event.preventDefault() // prevent page refresh and delete the event
        let check_info = true

        if (!phone_regex.test(cellulare)) {setErrorPhone(true); check_info=false }
        if (lenght_password.test(password)){ //se password è lunga almeno 8 caratteri
            if(uppercase_password.test(password)){ // se contiene almeno una maiuscola
                if(lowercase_password.test(password)){ // se contiene almeno una minuscola
                    if(number_password.test(password)){ // se contiene almeno un numero
                    }
                    else{
                        setPassword_error(true)
                        setMessage_error("Deve contenere almeno un numero")
                        check_info=false
                    }
                }
                else{
                    setPassword_error(true)
                    setMessage_error("Deve contenere almeno una minuscola")
                    check_info=false
                }
            }else {
                setPassword_error(true)
                setMessage_error("Deve contenere almeno una maiuscola")
                check_info=false
            }
        }
        else{
            setPassword_error(true)
            setMessage_error("Deve essere lunga almeno 8 caratteri")
            check_info=false
        }

        if(check_info){
            createUserWithEmailAndPassword(auth,email,password)
                .then((user) => {
                        createProfile(nome,cognome,cellulare, user.user.uid)
                        .then(() => {
                            navigate('/');//signout()
                            signOut(auth).catch((error) => {console.log(error)})
                            
                        })
                        .catch((e) => {
                            console.error("Error adding document: ", e);
                            return //se non salvo nome registrazione non deve andare a buon fine
                        });
                })
                .catch((error)=>{
                        if (error.code === 'auth/email-already-in-use') {
                            setEmail_error(true);
                        }
                        if (error.code === 'auth/operation-not-allowed') {
                            console.log('Error during sign up.');
                            sign_in_notification(false)
                        }
                    })
        }

    }

    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>Benvenuti</h1>  
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                height: "520px",
                alignItems: "center",
                justifyContent: "center",
                border: "2.5px solid #1876d1",
                borderRadius: "10px",
                padding: "20px",
            }}>
                <TextField
                    className='input'
                    required
                    label="Nome"
                    type='text'
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    className='input'
                    required
                    label="Cognome"
                    type='text'
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => setCognome(e.target.value)}
                />
                <TextField
                    required
                    label="Cellulare"
                    type="tel"
                    error={error_phone}
                    helperText={error_phone ? "Numero di telefono non valido" : ""}
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => {setCellulare(e.target.value); setErrorPhone(false)}}
                />
                <TextField 
                    className='input'
                    required
                    label="Email"
                    type='email'
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => {setEmail_error(false)}}
                    error={email_error}
                    helperText={email_error ? "Email già in uso, Accedi" : ""}
                />
                <TextField
                    required
                    label="Password"
                    type='password'
                    sx={{marginBottom: "20px"}}
                    onChange={(e) => {setPassword(e.target.value); setPassword_error(false);setMessage_error('')}}
                    error={password_error}
                    helperText={message_error}
                />
                <Button variant="contained" type='submit' sx={{marginBottom:"20px"}}>REGISTRATI</Button>
                <Link to="/" id="switch2">Hai già un account?<br></br> Clicca qui!</Link>
            </form>
        </div>
    )
}