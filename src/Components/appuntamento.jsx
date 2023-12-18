import React from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { PopupDelete } from './popup_delete';
import { useState } from 'react';

export const Appuntamento = (props) => {
    const date = props.appointment.date.toDate()
    const [trigger, setTrigger] = useState(false)
    return (
            <div className="card">
                <div className="top">
                    <div className="activity">
                        {props.appointment.activity}
                    </div>
                    <div className='cestino'>
                        <DeleteTwoToneIcon 
                        className="delete"
                        style={{ cursor: "pointer" }}
                        sx={{ color: "red" }}
                        fontSize='large'
                        onClick={() => setTrigger(true)}
                        //onClick={() => deleteAppointment(uid, props.appointment)}
                        />
                    </div>
                    <PopupDelete 
                        trigger={trigger}
                        setTrigger={setTrigger}
                        appointment={props.appointment}
                        nome={props.nome}
                        cognome={props.cognome}
                        cellulare={props.cellulare}
                     />
                </div>
                <div className="timedate">
                    <div className="data">
                        il {date.toLocaleDateString()}
                    </div>
                    <div className="ora">
                        alle {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                </div>
            </div>
    )
}