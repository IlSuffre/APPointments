import React from 'react'
import { Button } from '@mui/material'


export const ActivityCard = (props) => {

    let today = new Date().getDay()
    let info_apertura;
    switch (today) {
        case 0:
            if(props.activity.time_week.Domenica.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto  " + props.activity.time_week.Domenica.from + " - " + props.activity.time_week.Domenica.to
        break
        case 1:
            if(props.activity.time_week.Lunedi.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Lunedi.from + " - " + props.activity.time_week.Lunedi.to
        break
        case 2:
            if(props.activity.time_week.Martedi.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Martedi.from + " - " + props.activity.time_week.Martedi.to
        break
        case 3:
            if(props.activity.time_week.Mercoledi.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Mercoledi.from + " - " + props.activity.time_week.Mercoledi.to
        break
        case 4:
            if(props.activity.time_week.Giovedi.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Giovedi.from + " - " + props.activity.time_week.Giovedi.to
        break
        case 5:
            if(props.activity.time_week.Venerdi.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Venerdi.from + " - " + props.activity.time_week.Venerdi.to
        break
        case 6:
            if(props.activity.time_week.Sabato.from=="") info_apertura = "Chiuso"
            else info_apertura = "aperto " + props.activity.time_week.Sabato.from + " - " + props.activity.time_week.Sabato.to
        break
    }

  return (
        <div className="card2">
            <div className="top2">
                <div className="activity2">
                    
                    {props.activity.nome_attivita} {/* deve essere cliccabile e far aprire pagina di prenotazione attività */}
                </div>
                {info_apertura=="Chiuso" ? <div className="chiuso">Oggi {info_apertura}</div> : <div className="aperto">Oggi {info_apertura}</div>}
            </div>

            <div className="indirizzo_telefono">
                Telefono: {props.activity.numero_telefono}
                <br/>
                Indirizzo: {props.activity.indirizzo} 
            <div className='button_prenota'>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={()=>{
                        props.selectActivity(props.doc_id)
                    }}
                    >Prenota
                </Button>
            </div>
            </div>
        </div>
    )

}


