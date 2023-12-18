import React from 'react'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export const Menu = (props) => {
  return (
    <div className="responsive-menu">
    <ul>
        <li>
            <Button 
                variant="text" 
                color="primary" 
                onClick={()=>{props.setValue('1');localStorage.setItem("tabs_value",'1');props.setMenu(false);props.selectActivity(null)}}
                style={{fontSize:"23px", fontWeight:"bold"}}
            >I MIEI APPUNTAMENTI</Button>
        </li>
        <li>
            <Button 
                variant="text" 
                color="primary" 
                onClick={()=>{props.setValue('2');localStorage.setItem("tabs_value",'2');props.setMenu(false);props.selectActivity(null)}}
                style={{fontSize:"23px", fontWeight:"bold"}}
            >PRENOTA</Button>
        </li>
        <li>
            <Button 
                variant="text" 
                color="primary" 
                onClick={()=>{props.setValue('3');localStorage.setItem("tabs_value",'3');props.setMenu(false);props.selectActivity(null)}}
                style={{fontSize:"23px", fontWeight:"bold"}}
            >LA MIA ATTIVITÀ</Button>
        </li>
        <li>
            <Button 
                variant="text" 
                color="primary" 
                onClick={props.logout}
                style={{fontSize:"23px", fontWeight:"bold"}}
            >LOGOUT</Button>
        </li>
        <div className="close-menu">
            <CloseIcon 
                color="primary"
                style={{fontSize:"30px", fontWeight:"bold"}}
                onClick={()=>props.setMenu(false)}
            />
        </div>
    </ul>
</div>
  )
}
