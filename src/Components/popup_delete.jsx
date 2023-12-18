import React from 'react'
import Button from '@mui/material/Button';
import { auth } from '../firebase-config';
import { deleteAppointment } from '../firebase-service';

export function PopupDelete(props) {

    const uid = auth.currentUser.uid
    const email = auth.currentUser.email

    const delete_notification = () => {
        if (("Notification" in window)){
            if (Notification.permission === "granted"){
                var notification = new Notification("APPointment",{
                    lang : "it-IT",
                    body : "Il suo appuntamento è stato eliminato con successo"
                })   
            }
            else if (Notification.permission !== "denied"){
                Notification.requestPermission().then((permission)=>{
                    if (permission === "granted"){
                        var notification = new Notification("APPointment",{
                            lang : "it-IT",
                            body : "Il suo appuntamento è stato eliminato con successo"
                        })  
                    }
                })
            }
        }
    }


    const delete_appointment = () => {
        props.setTrigger(false) 
        deleteAppointment(uid, props.appointment, props.nome, props.cognome, props.cellulare, email)
        delete_notification()
    }


    return (props.trigger) ? (
        <div className='background-popup'> 
            <div className='popup-delete'>
                <div className='popup-inner-delete'>
                    <h4 style={{marginBottom:'0px', marginTop:'10px'}}>Sei sicuro di voler eliminare il seguente appuntamento:</h4>
                    <p style={{fontSize:'20px', marginTop:'8px'}}>{props.appointment.activity} il {props.appointment.date.toDate().toLocaleDateString()} alle {props.appointment.date.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <Button 
                        variant="outlined" 
                        onClick={() => props.setTrigger(false)}
                        sx={{marginRight:'10px', fontWeight:'bold', marginBottom:'10px'}}
                        style={{border:'2px solid'}}
                    >Annulla</Button>

                    <Button 
                        variant="contained" 
                        color="error"  
                        onClick={delete_appointment}
                        sx={{marginLeft:'10px', fontWeight:'bold', marginBottom:'10px'}}
                    >Elimina</Button>

                </div>
            </div>
        </div>
    ) : "";
}
