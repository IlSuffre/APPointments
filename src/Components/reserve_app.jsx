import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect} from "react";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { auth, db } from '../firebase-config.js';
import { onSnapshot, doc } from "firebase/firestore";
import { PopupReserve } from './popup_reserve.jsx';


export const ReserveApp = (props) => {
    const [day, setDay] = useState(dayjs())
    const [activity_data, setActivityData] = useState({})
    const [button_list, setButtonList] = useState([])
    const [button_not_disabled, setButtonNotDisabled] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [selected_appointment, SelectAppointment] = useState("")

    const today = new Date()


    const toMinutes = (time) => { //time in format HH:mm
        let format_hour = time.split(":")
        let hour = parseInt(format_hour[0])
        let minutes = parseInt(format_hour[1])
        return hour*60 + minutes   
    }

    const toHour = (time) => { //time in format number minutes (int)
        let hour = Math.floor(time/60)
        let minutes = time%60
        let hour_string = hour.toString()
        if (hour_string.length==1) hour_string = "0" + hour_string
        let minutes_string = minutes.toString()
        if (minutes_string.length==1) minutes_string = "0" + minutes_string
        return hour_string + ":" + minutes_string
    }

    const partition_appointments_by_time = (day_object, durata_app) => {
        let appointments = []
        let start_time = day_object.from
        let end_time = day_object.to
        let start_minutes = toMinutes(start_time)
        let end_minutes = toMinutes(end_time)
        let durata_minutes = toMinutes(durata_app)
        let current_time = start_minutes

        while (current_time + durata_minutes <= end_minutes){
            appointments.push(toHour(current_time))
            current_time = current_time + durata_minutes
        }
        return appointments
    }

    const select_appointments_by_day = async (appointments_array, day) => { //seleziona li appuntamenti già prenotati di un giorno specifico
        let select_appointments = []
        for (let i=0; i<appointments_array.length; i++){
            let options = {day: 'numeric', month :"numeric" , year: "numeric"};
            let date = appointments_array[i].data_ora.toDate()
            
            if (date.toLocaleDateString("en-GB", options)==day.format("DD/MM/YYYY")) select_appointments.push(appointments_array[i])
        }
        return select_appointments
    }


    const get_all_appointments_of_day = async (day) => {
        let day_array;
        let day_object;
        switch(day.get('day')){
            case 0:
                day_object = activity_data.time_week.Domenica
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Domenica, day)
                break
            case 1:
                day_object = activity_data.time_week.Lunedi
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Lunedi, day)
                break
            case 2:
                day_object = activity_data.time_week.Martedi
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Martedi, day)
                break
            case 3:
                day_object = activity_data.time_week.Mercoledi
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Mercoledi, day)
                break
            case 4:
                day_object = activity_data.time_week.Giovedi
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Giovedi, day)
                break
            case 5:
                day_object = activity_data.time_week.Venerdi
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Venerdi, day)
                break
            case 6:
                day_object = activity_data.time_week.Sabato
                day_array = await select_appointments_by_day(activity_data.appuntamenti.Sabato, day)
                break
        }

        let appointments = partition_appointments_by_time(day_object, activity_data.durata_app) //primo array dei 2
        let free_appointments = []

        if (day_array.length==0) {free_appointments = appointments}
        else {
            for (let i=0; i<appointments.length; i++){
                let flag = false
                for (let j=0; j<day_array.length; j++){
                    if (appointments[i]==day_array[j].data_ora.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})){
                        flag = true
                        break
                    }
                }
                if (!flag) free_appointments.push(appointments[i])
            }
        }
        setButtonList(appointments)

        if (day.toDate().setHours(0,0,0,0) < today.setHours(0,0,0,0)) setButtonNotDisabled([]) //se il giorno è passato allora tutti i button sono disabled
        else setButtonNotDisabled(free_appointments) // altirmanti solo quelli liberi sono abilitati
    }



    useEffect(() => {
        const get_activity_data = async () => {
            onSnapshot(doc(db, "activity", props.selected_activity), (doc) => {
                setActivityData(doc.data());
            });
        }
        get_activity_data()
    }, [])


    useEffect(() => { //serve per aspettare che activity_data sia stato caricato e poi costruire le righe della tabella quando si cambia giorno
            if (activity_data.time_week!=null){
            //Funzione che area array orari con partition_appointments_by_time
            get_all_appointments_of_day(day)
            }
            //Funzione che crea copia array sopra ma senza gli orari già occupati
            //Durante la renderizzazione della grid se orario è presente solo nell'array sopra button disabled
    }, [activity_data, day])


    const compare_time = (time1, time2) => { //time1 e time2 in format HH:mm
        let format_time1 = time1.split(":")
        let format_time2 = time2.split(":")
        if (parseInt(format_time1[0]) > parseInt(format_time2[0])) return true
        else if (parseInt(format_time1[0]) < parseInt(format_time2[0])) return false
        else {
            if (parseInt(format_time1[1]) > parseInt(format_time2[1])) return true
            else return false
        }
    }


    const button_render = (value,i) => {
        //se il giorno di prenotazione è oggi stesso allora devo controllare se l'orario è già passato
        if (day.toDate().setHours(0,0,0,0) == today.setHours(0,0,0,0)) { //today globale
            let today = new Date()
            //per la condizione dell'if uso la variabile today appena creata perchè l'altra ha come orario 00:00:00
            if (button_not_disabled.includes(value) && compare_time(value, today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))) {
                return <React.Fragment key={i}>
                            <Grid item xs>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={()=>{setTrigger(true); SelectAppointment(value)}}
                                    >{value}
                                </Button>
                            </Grid>
                        </React.Fragment>}
            else {return <React.Fragment key={i}>
                <Grid item xs>
                    <Button 
                        disabled
                        variant="contained" 
                        color="primary" 
                        >{value}
                    </Button>
                </Grid>
            </React.Fragment>}
        }
        //altrimenti basta controllare se l'orario è presente nell'array button_not_disabled
        else {
            if (button_not_disabled.includes(value)) {
                return <React.Fragment key={i}>
                            <Grid item xs>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={()=>{setTrigger(true); SelectAppointment(value)}}
                                    >{value}
                                </Button>
                            </Grid>
                        </React.Fragment>}
            else {return <React.Fragment key={i}>
                <Grid item xs>
                    <Button 
                        disabled
                        variant="contained" 
                        color="primary" 
                        >{value}
                    </Button>
                </Grid>
            </React.Fragment>}
        }
    }


  return (
    <div style={{marginTop:"40px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
                <DemoItem>
                    <DateCalendar 
                        value={day} 
                        onChange={(newValue) => setDay(newValue)}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
        <Box sx={{ flexGrow: 1, maxWidth:"60%"}}>
            {button_list.length==0 ? <h1 style={{color:"red", textShadow:"0px 0px"}}>CHIUSO</h1>: <Grid container spacing={3}>{button_list.map((value,i) => button_render(value,i))}</Grid>}
        </Box>
        <Button 
            variant="outlined" 
            color="primary" 
            onClick={()=>props.selectActivity(null)}
            style={{marginTop:"70px", border:"2px solid", fontWeight:"bold"}}
            >Indietro</Button>
        <PopupReserve
            trigger={trigger}
            setTrigger={setTrigger}
            activity_name={activity_data.nome_attivita} //nome attività
            day={day} //giorno selezionato
            selected_appointment={selected_appointment}  //orario selezionato
            activity_id={props.selected_activity} //id attività
            user_data={props.user_data} //dati utente
            selectActivity={props.selectActivity} //funzione per tornare indietro
            setValue={props.setValue} //funzione per cambiare tab
        />
    </div>
  )
}
