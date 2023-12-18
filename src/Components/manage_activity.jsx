import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect} from "react";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { auth, db } from '../firebase-config.js';
import { onSnapshot, doc } from "firebase/firestore";

export const ManageActivity = () => { 
    const [day, setDay] = useState(dayjs())
    const [activity_data, setActivityData] = useState({})
    const [rows, setRows] = useState([])
    
    const columns = [
        {   
			field: "orario",
			headerName: 'Orario',
            width: 150
        },
        {
            field: "cliente",
            headerName: 'Cliente',
            width: 180
        },
        {
            field: "telefono",
            headerName: 'Telefono',
            width: 180
        },
        {
            field: "email",
            headerName: 'Email',
            width: 240
        }
    ]

    //funzione che costruisce le righe della tabella con i dati degli appuntamenti


/*     const rows = [
        {id:1, orario: '10:00', cliente: 'Mario Rossi', telefono: '3331234567', email: 'mario.rossi@gmail.com' },
        {id:2, orario: '10:30', cliente: null, telefono: null, email: null},
        {id:3, orario: '11:00', cliente: 'Luigi Bianchi', telefono: '3337654321', email: 'luigi.b18@gmail.com' },
    ] */

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


    const select_appointments_by_day = async (appointments_array, day) => {
        let select_appointments = []
        for (let i=0; i<appointments_array.length; i++){
            let options = {day: 'numeric', month :"numeric" , year: "numeric"};
            let date = appointments_array[i].data_ora.toDate()
            
            if (date.toLocaleDateString("en-GB", options)==day.format("DD/MM/YYYY")) select_appointments.push(appointments_array[i])
        }
        return select_appointments
    }

    //funzione che costruisce le righe della tabella con i dati degli appuntamenti
    const build_rows = async (day) => {
        const rows = []
        let day_object;
        let day_array;

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


        //MANCA CONTROLLO SE L'ATTIVITA' E' APERTA IN QUEL GIORNO !!!!!!!!!!!!!
        
        
        let appointments = partition_appointments_by_time(day_object, activity_data.durata_app) 

            //CONDIZIONE SBAGLIATA POICHE VIENE SALTATA
        if (day_array.length==0){ //se non ho trovato la data selezionata nell'array
            for (let i=0; i<appointments.length; i++){ //scorro array orari
                rows.push({id:i+1, orario: appointments[i], cliente: null, telefono: null, email: null})
            }
        }
        else { //se trovo data selezionata nell'array
            for (let i=0; i<appointments.length; i++){ //scorro array orari
                let flag = false
                for (let j=0; j<day_array.length; j++){ //scorro oggetti appuntamenti
                    if (day_array[j].data_ora.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })==appointments[i]){ //se l'orario dell'oggetto è uguale all'orario dell'array 
                        flag = true
                        rows.push({id:i+1, orario: appointments[i], cliente: day_array[j].cliente, telefono: day_array[j].telefono, email: day_array[j].email})
                        break
                    }

                }
                if (!flag) rows.push({id:i+1, orario: appointments[i], cliente: null, telefono: null, email: null})
            }
        }
        
        return rows  
    }
// rows.push({id:i+1, orario: appointments[i], cliente: day_array[j].cliente, telefono: day_array[j].telefono, email: day_array[j].email})
    useEffect(() => {
        const get_activity_data = async () => {
            onSnapshot(doc(db, "activity", auth.currentUser.uid), (doc) => {
                setActivityData(doc.data());
            });
        }
        get_activity_data()
    }, [])

    useEffect(() => { //serve per aspettare che activity_data sia stato caricato e poi costruire le righe della tabella quando si cambia giorno
        if (activity_data.appuntamenti!=undefined){
            build_rows(day).then((rows) => setRows(rows))
        }
    }, [activity_data, day])


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

        <Box sx={{ height: 400, width: '65%',  }}>
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: {
                pageSize: 5,
            },
            },
        }}
        pageSizeOptions={[5]}
        localeText={{noRowsLabel: "Giorno di chiusura"}}
        checkboxSelection
        disableRowSelectionOnClick
        />
    </Box>
      </div>
    )
  
}

