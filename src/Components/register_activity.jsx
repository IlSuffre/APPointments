import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material"
import { DaySet } from "./day_set";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { registerActivity } from "../firebase-service";
import { auth } from "../firebase-config.js";
import { check_name_activity } from "../firebase-service";



export const RegisterActivity = (props) => {
    const [error_app, setErrorApp] = useState(false)
    const [error_phone, setErrorPhone] = useState(false)
    const [error_name, setErrorName] = useState(false)
    const [nome_attivita, setNomeAttivita] = useState(null)
    const [indirizzo, setIndirizzo] = useState(null)
    const [sito_web, setSitoWeb] = useState(null)
    const [numero_telefono, setNumeroTelefono] = useState(null)
    const [email_aziendale, setEmailAziendale] = useState(null)
    const [durata_app, setDurataApp] = useState(null)
    const [time_week, setTimeWeek] = useState({
        Lunedi:{from:"",to:""},
        Martedi:{from:"",to:""},
        Mercoledi:{from:"",to:""},
        Giovedi:{from:"",to:""},
        Venerdi:{from:"",to:""},
        Sabato:{from:"",to:""},
        Domenica:{from:"",to:""}
    })
    const phone_regex = new RegExp("^[0-9]{10}$")
    const handleSubmit = async (event) => {
        event.preventDefault() // prevent page refresh and delete the event
        //funzione che controlla se nome attività è già in uso
        if (await check_name_activity(nome_attivita)) setErrorName(true)
        else if (!phone_regex.test(numero_telefono)) setErrorPhone(true)
        else if (durata_app==null) setErrorApp(true)
        else {
            registerActivity(auth.currentUser.uid, nome_attivita, indirizzo, sito_web, numero_telefono, email_aziendale, durata_app, time_week)
            .catch((error)=>{console.log("errore",error)})
        }
    }


    const update_time_app = (newValue) =>{
        let newTime
        if(newValue==null || isNaN(newValue.$y)) newTime = null
        else newTime = newValue.format("HH:mm")
        setDurataApp(newTime)
        setErrorApp(false)
    }

    return (
        <form className="reg-act" onSubmit={handleSubmit}>
            <div className="input_container">
                <div className="input_text">
                    <TextField
                        required
                        label="Nome attività"
                        type="text"
                        size="small"
                        error={error_name}
                        helperText={error_name ? "Nome attività già in uso" : ""}
                        sx={{marginTop:"35px"}} 
                        onChange={(e) => {setNomeAttivita(e.target.value);setErrorName(false)}}
                    />
                    <TextField
                        required
                        label="Indirizzo"
                        type="text"
                        size="small"
                        sx={{marginTop:"35px"}} 
                        onChange={(e) => setIndirizzo(e.target.value)}
                    />
                    <TextField
                        label="Sito Web"
                        type="url"
                        size="small"
                        sx={{marginTop:"35px"}} 
                        onChange={(e) => setSitoWeb(e.target.value)}
                    />
                    <TextField
                        required
                        label="Numero di telefono (cellulare)"
                        type="tel"
                        size="small"
                        error={error_phone}
                        helperText={error_phone ? "Numero di telefono non valido" : ""}
                        sx={{marginTop:"35px"}}
                        onChange={(e) => {setNumeroTelefono(e.target.value); setErrorPhone(false)}}
                    />
                    <TextField
                        required
                        label="Email aziendale"
                        type="email"
                        size="small"
                        sx={{marginTop:"35px"}}
                        onChange={(e) => setEmailAziendale(e.target.value)} 
                    />
                    <div className="durata_appuntamenti">
                        <div className="durata_text">
                            <Typography sx={{fontSize:"22px",color:"#636465"}}>Durata appuntamenti:</Typography>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div>
                                <TimePicker  
                                    ampm={false}
                                    onChange={update_time_app}
                                    closeOnSelect={true}
                                    slotProps={{ textField: { size: 'small', error: error_app, helperText: error_app ? "Impostare una durata" : ""} }}
                                    sx={{ "& .MuiInputBase-root": { width: "60%" }, marginTop:"35px", width:"200px" }}
                                />
                            </div>
                        </LocalizationProvider> 
                    </div>  
                </div>


                <div className="time_input">
                    <DaySet giorno="Lunedì" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Martedì" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Mercoledì" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Giovedì" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Venerdì" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Sabato" time_week={time_week} setTimeWeek={setTimeWeek}/>
                    <DaySet giorno="Domenica" time_week={time_week} setTimeWeek={setTimeWeek}/>
                </div>
            </div>
            <div className="button_reg">
                <Button variant="contained" type="submit" sx={{marginTop:"35px",height:"50px",fontSize:"17px"}}>Registra attività</Button>
            </div>
        </form>
    )
}