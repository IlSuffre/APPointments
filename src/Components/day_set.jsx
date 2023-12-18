import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Checkbox } from "@mui/material";
import Typography from '@mui/material/Typography';

export const DaySet = (props) => {
    const [timeFrom, setTimeFrom] = useState(null)
    const [timeTo, setTimeTo] = useState(null)
    const [check, setCheck] = useState(false)
    const [inconsistent_time, setInconsistentTime] = useState(false)
    const [inconsistent_time2, setInconsistentTime2] = useState(false)

    const update_check = () => {
        if(check==true){
            switch(props.giorno){
                case "Lunedì":
                    props.setTimeWeek({...props.time_week, Lunedi:{from:"",to:""}})
                    break;
                case "Martedì":
                    props.setTimeWeek({...props.time_week, Martedi:{from:"",to:""}})
                    break;
                case "Mercoledì":
                    props.setTimeWeek({...props.time_week, Mercoledi:{from:"",to:""}})
                    break;
                case "Giovedì":
                    props.setTimeWeek({...props.time_week, Giovedi:{from:"",to:""}})
                    break;
                case "Venerdì":
                    props.setTimeWeek({...props.time_week, Venerdi:{from:"",to:""}})
                    break;
                case "Sabato":
                    props.setTimeWeek({...props.time_week, Sabato:{from:"",to:""}})
                    break;
                case "Domenica":
                    props.setTimeWeek({...props.time_week, Domenica:{from:"",to:""}})
                    break;
            }
        }
        setTimeFrom(null)
        setTimeTo(null)
        setInconsistentTime(false)
        setInconsistentTime2(false)
        setCheck(!check)
    }


    const update_time_from = (newValue) =>{
            let newTime
            if(newValue==null || isNaN(newValue.$y)) newTime = ""
            else newTime = newValue.format("HH:mm")
            setTimeFrom(newValue)
            let time_split = newTime.split(":")
            let new_hour = parseInt(time_split[0])
            let new_minute = parseInt(time_split[1])
            switch(props.giorno){
                case "Lunedì":
                    props.setTimeWeek({...props.time_week, Lunedi:{from:newTime,to:props.time_week.Lunedi.to}})
                    if (props.time_week.Lunedi.to=="" || (props.time_week.Lunedi.to.split(":")[0] > new_hour || (props.time_week.Lunedi.to.split(":")[0] == new_hour && props.time_week.Lunedi.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;

                case "Martedì":
                    props.setTimeWeek({...props.time_week, Martedi:{from:newTime,to:props.time_week.Martedi.to}})
                    if (props.time_week.Martedi.to=="" || (props.time_week.Martedi.to.split(":")[0] > new_hour || (props.time_week.Martedi.to.split(":")[0] == new_hour && props.time_week.Martedi.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
                case "Mercoledì":
                    props.setTimeWeek({...props.time_week, Mercoledi:{from:newTime,to:props.time_week.Mercoledi.to}})
                    if (props.time_week.Mercoledi.to=="" || (props.time_week.Mercoledi.to.split(":")[0] > new_hour || (props.time_week.Mercoledi.to.split(":")[0] == new_hour && props.time_week.Mercoledi.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
                case "Giovedì":
                    props.setTimeWeek({...props.time_week, Giovedi:{from:newTime,to:props.time_week.Giovedi.to}})
                    if (props.time_week.Lunedi.to=="" || (props.time_week.Lunedi.to.split(":")[0] > new_hour || (props.time_week.to.split(":")[0] == new_hour && props.time_week.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
                case "Venerdì":
                    props.setTimeWeek({...props.time_week, Venerdi:{from:newTime,to:props.time_week.Venerdi.to}})
                    if (props.time_week.Venerdi.to=="" || (props.time_week.Venerdi.to.split(":")[0] > new_hour || (props.time_week.Venerdi.to.split(":")[0] == new_hour && props.time_week.Venerdi.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
                case "Sabato":
                    props.setTimeWeek({...props.time_week, Sabato:{from:newTime,to:props.time_week.Sabato.to}})
                    if (props.time_week.Sabato.to=="" || (props.time_week.Sabato.to.split(":")[0] > new_hour || (props.time_week.Sabato.to.split(":")[0] == new_hour && props.time_week.Sabato.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
                case "Domenica":
                    props.setTimeWeek({...props.time_week, Domenica:{from:newTime,to:props.time_week.Domenica.to}})
                    if (props.time_week.Domenica.to=="" || (props.time_week.Domenica.to.split(":")[0] > new_hour || (props.time_week.Domenica.to.split(":")[0] == new_hour && props.time_week.Domenica.to.split(":")[1] > new_minute))){
                        setInconsistentTime2(false)
                        setInconsistentTime(false)
                    }
                    else {
                        setInconsistentTime2(true)
                    }
                    break;
            }
    }


    const update_time_to = (newValue) =>{
        let newTime
        if(newValue==null || isNaN(newValue.$y)) newTime = ""
        else newTime = newValue.format("HH:mm")
        setTimeTo(newValue)
        let time_split = newTime.split(":")
        let new_hour = parseInt(time_split[0])
        let new_minute = parseInt(time_split[1])
        switch(props.giorno){
            case "Lunedì":
                props.setTimeWeek({...props.time_week, Lunedi:{from:props.time_week.Lunedi.from,to:newTime}})
                if (props.time_week.Lunedi.from.split(":")[0] < new_hour || (props.time_week.Lunedi.from.split(":")[0] == new_hour && props.time_week.Lunedi.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                    }
                break;
            case "Martedì":
                props.setTimeWeek({...props.time_week, Martedi:{from:props.time_week.Martedi.from,to:newTime}})
                if (props.time_week.Martedi.from.split(":")[0] < new_hour || (props.time_week.Martedi.from.split(":")[0] == new_hour && props.time_week.Martedi.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                    }
                break;
            case "Mercoledì":
                props.setTimeWeek({...props.time_week, Mercoledi:{from:props.time_week.Mercoledi.from,to:newTime}})
                if (props.time_week.Mercoledi.from.split(":")[0] < new_hour || (props.time_week.Mercoledi.from.split(":")[0] == new_hour && props.time_week.Mercoledi.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                }
                break;
            case "Giovedì":
                props.setTimeWeek({...props.time_week, Giovedi:{from:props.time_week.Giovedi.from,to:newTime}})
                if (props.time_week.Giovedi.from.split(":")[0] < new_hour || (props.time_week.Giovedi.from.split(":")[0] == new_hour && props.time_week.Giovedi.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                }
                break;
            case "Venerdì":
                props.setTimeWeek({...props.time_week, Venerdi:{from:props.time_week.Venerdi.from,to:newTime}})
                if (props.time_week.Venerdi.from.split(":")[0] < new_hour || (props.time_week.Venerdi.from.split(":")[0] == new_hour && props.time_week.Venerdi.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                    }
                break;
            case "Sabato":
                props.setTimeWeek({...props.time_week, Sabato:{from:props.time_week.Sabato.from,to:newTime}})
                if (props.time_week.Sabato.from.split(":")[0] < new_hour || (props.time_week.Sabato.from.split(":")[0] == new_hour && props.time_week.Sabato.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                    }
                break;
            case "Domenica":
                props.setTimeWeek({...props.time_week, Domenica:{from:props.time_week.Domenica.from,to:newTime}})
                if (props.time_week.Domenica.from.split(":")[0] < new_hour || (props.time_week.Domenica.from.split(":")[0] == new_hour && props.time_week.Domenica.from.split(":")[1] < new_minute)){
                    setInconsistentTime(false)
                    setInconsistentTime2(false)
                }
                else {
                    setInconsistentTime(true)
                    }
                break;
        }
    }


    return(
        <div className="day_input">
            <div className="check_day">
                    <Checkbox 
                        size="medium" 
                        sx={{marginTop:"32px"}} 
                        checked={check}
                        onChange={() => update_check() }
                    />
                    <div className="giorno">
                        <Typography sx={{marginTop:"38px",fontSize:"22px",color:"#636465"}}>{props.giorno}</Typography>
                    </div>
            </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div>
                            <TimePicker 
                                label="Dalle" 
                                ampm={false}
                                closeOnSelect={true}
                                value={timeFrom}
                                onChange={update_time_from}
                                slotProps={{ textField: { size: 'small', error: inconsistent_time2, helperText: inconsistent_time2 ? "Orario non valido" : "", required: check } }}
                                sx={{ "& .MuiInputBase-root": { width: "60%" }, marginTop:"35px", width:"200px" }}
                                disabled={!check}

                            />
                        </div>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div>
                            <TimePicker 
                                label="Alle"
                                ampm={false}
                                closeOnSelect={true}
                                value={timeTo}
                                onChange={update_time_to}
                                slotProps={{ textField: { size: 'small', error: inconsistent_time, helperText: inconsistent_time ? "Orario non valido" : "", required: timeFrom!=null?true:false}  }}
                                sx={{ "& .MuiInputBase-root": { width: "60%" }, marginTop:"35px", width:"200px" }}
                                disabled={timeFrom!=null?false:true}
                            />
                        </div>
                    </LocalizationProvider>
                </div>
    )
}
