import React from 'react'
import Button from '@mui/material/Button';
import { auth } from '../firebase-config.js';
import { reserve_appointments } from '../firebase-service';


export function PopupReserve(props) {

    const reserve_notification = () => {
        if (("Notification" in window)){
            if (Notification.permission === "granted"){
                var notification = new Notification("APPointment",{
                    lang : "it-IT",
                    body : "La sua prenotazione è stata effettuata con successo"
                })   
            }
            else if (Notification.permission !== "denied"){
                Notification.requestPermission().then((permission)=>{
                    if (permission === "granted"){
                        var notification = new Notification("APPointment",{
                            lang : "it-IT",
                            body : "La sua prenotazione è stata effettuata con successo"
                        })  
                    }
                })
            }
        }
    }

    //export async function reserve_appointments(day, hour, user, activity_id, activity_name){

    return (props.trigger) ? (
        <div className='background-popup'> 
            <div className='popup-reserve'>
                <div className='popup-inner-reserve'>
                    <h4 style={{marginBottom:'0px', marginTop:'10px'}}>Sei sicuro di voler prenotare il seguente appuntamento:</h4>
                    <p style={{fontSize:'20px', marginTop:'8px'}}>{props.activity_name} il {props.day.format("DD/MM/YYYY")} alle {props.selected_appointment}</p>
                    <Button 
                        variant="outlined" 
                        onClick={() => props.setTrigger(false)}
                        sx={{marginRight:'10px', fontWeight:'bold', marginBottom:'10px'}}
                        style={{border:'2px solid'}}
                    >Annulla</Button>

                    <Button 
                        variant="contained" 
                        color="primary"  
                        onClick={()=>{
                            reserve_appointments(props.day, props.selected_appointment, auth.currentUser, props.user_data, props.activity_id, props.activity_name);
                            props.setTrigger(false);
                            props.selectActivity(null);
                            props.setValue('1')
                            localStorage.setItem("tabs_value",'1')
                            //notifica di prenotazione
                            reserve_notification();

                        }}
                        sx={{marginLeft:'10px', fontWeight:'bold', marginBottom:'10px'}}
                    >Prenota</Button>

                </div>
            </div>
        </div>
    ) : "";

}