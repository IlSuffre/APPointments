import React from 'react'
import { Appuntamento } from './appuntamento'
import { AppuntamentoExpired } from './appuntamento_exp'
import { Loading } from './loading'
import Box from '@mui/material/Box';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MenuIcon from '@mui/icons-material/Menu';

export const MyAppuntamenti = (props) => {
    //nuove variabili per passare come props poiche user_data è sceso in fondo al massimo dell'albero di componenti


    {/*order_appointments = appointments.sort((obja,objb) => Number(obja.date) - Number(objb.date))*/}

    if (props.user_data.nome == undefined) {
        return (<Loading/>)
    }

    {/* CASO UTENTE NON HA NESSUN APPUNTAMENTO */}
    if(props.user_data.appointments == undefined || props.user_data.appointments.length == 0 ){
        return (
            <div>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                    <h2 style={{marginTop: "15vh"}}>Ciao {props.user_data.nome} non hai nessun appuntamento in programma</h2>
                    <KeyboardDoubleArrowUpIcon style={{fontSize:"80px", color:"#1876d1", marginTop:"100px"}}/>
                    <h2 style={{color:"#1876d1"}}>Clicca in alto su prenota <br></br>per prenotare il tuo primo appuntamento</h2>
                </Box>

                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }} >
                    <h2 style={{marginTop: "15vh"}}>Ciao {props.user_data.nome} non hai nessun appuntamento in programma</h2>
                    <h2 style={{color:"#1876d1", marginTop:"100px"}}>Clicca in alto a destra su </h2>
                    <MenuIcon style={{fontSize:"50px", color:"#1876d1"}}/>
                    <h2 style={{color:"#1876d1"}}>e poi su PRENOTA per prenotare il tuo primo appuntamento</h2>
                </Box>
            </div>
        )
    }

    {/* CASO UTENTE CHE HA SOLO APPUNTAMENTI PROGRAMMATI */}
    if(props.user_data.appointments.some( (obj)=> {var today = new Date();return obj.date.toDate() > today}) && !props.user_data.appointments.some( (obj)=> {var today = new Date();return obj.date.toDate() < today})){
        return (
            <div style={{marginTop:"100px"}}> 

                <h2>Ciao {props.user_data.nome} ecco i tuoi appuntamenti:</h2>
                {/* prima di usare la map devo ordinare l'array props.appointments per data */}
                
                {props.user_data.appointments.sort((obja,objb) => Number(obja.date) - Number(objb.date)).map((appointment,i) => {
                    var today = new Date()
                    if (appointment.date.toDate() > today) {
                    return <div className="back" key={i}> 
                                <Appuntamento 
                                    appointment={appointment}
                                    nome={props.user_data.nome}
                                    cognome={props.user_data.cognome}
                                    cellulare={props.user_data.cellulare}
                                />
                            </div> 
                    } 
                    })
                }
            </div>
        )
    }

    {/* CASO UTENTE CHE HA SOLO APPUNTAMENTI SCADUTI */}
    if(!props.user_data.appointments.some( (obj)=> {var today = new Date();return obj.date.toDate() > today}) && props.user_data.appointments.some( (obj)=> {var today = new Date();return obj.date.toDate() < today})){
        return (
            <div style={{marginTop:"100px"}}> 

                <h2>Ciao {props.user_data.nome} non hai nessun appuntamento in programma</h2>
                {/* prima di usare la map devo ordinare l'array props.appointments per data */}
                <hr style={{marginTop:"50px"}}/>
                <h2 style={{marginTop:"30px"}}>I tuoi appuntamenti passati:</h2>
                {props.user_data.appointments.sort((obja,objb) => Number(objb.date) - Number(obja.date)).map((appointment,i) => {
                    const today = new Date()
                    if (appointment.date.toDate() < today) {
                    return <div className="back" key={i}> 
                                <AppuntamentoExpired 
                                    appointment={appointment}
                                />
                            </div> 
                    } 
                    })
                }
            </div>
        )
    }




    else {
        {/* CASO UTENTE CHE HA SIA APPUNTMANETI PROGRAMMATI CHE APPUNTAMENTI SCADUTI*/}
        return (
            <div style={{marginTop:"100px"}}> 

                <h2>Ciao {props.user_data.nome} ecco i tuoi appuntamenti:</h2>
                {/* prima di usare la map devo ordinare l'array props.appointments per data */}
                
                {props.user_data.appointments.sort((obja,objb) => Number(obja.date) - Number(objb.date)).map((appointment,i) => {
                    var today = new Date()
                    if (appointment.date.toDate() > today) {
                    return <div className="back" key={i}> 
                                <Appuntamento 
                                    appointment={appointment}
                                    nome={props.user_data.nome}
                                    cognome={props.user_data.cognome}
                                    cellulare={props.user_data.cellulare}
                                />
                            </div> 
                    } 
                    })
                }
                <hr style={{marginTop:"50px"}}/>
                <h2 style={{marginTop:"30px"}}>I tuoi appuntamenti passati:</h2>
                
                {props.user_data.appointments.sort((obja,objb) => Number(objb.date) - Number(obja.date)).map((appointment,i) => {
                    const today = new Date()
                    if (appointment.date.toDate() < today) {
                    return <div className="back" key={i}> 
                                <AppuntamentoExpired 
                                    appointment={appointment}
                                />
                            </div> 
                    } 
                    })
                }
            </div>
        )
    }



}

//appointment.activity} {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}