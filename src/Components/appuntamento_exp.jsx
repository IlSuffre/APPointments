import React from 'react'
import { auth } from '../firebase-config';
import { useState } from 'react';

export const AppuntamentoExpired = (props) => {

    const date = props.appointment.date.toDate()
    const uid = auth.currentUser.uid
    return (
            <div className="card">
                <div className="top">
                    <div className="activity">
                        {props.appointment.activity}
                    </div>
                    <div className='expire_label'>
                        SCADUTO
                    </div>
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