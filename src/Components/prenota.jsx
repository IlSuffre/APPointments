import React, { useEffect } from 'react';
import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { get_5_activities } from '../firebase-service';
import { search_activities } from '../firebase-service';
import { ActivityCard } from './activity_card';


export const Prenota = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const activities = (async () => {
            setActivities(await get_5_activities())
        })
        if (searchTerm == "") activities()
    }, [searchTerm])


// SISTEMARE IN MODO CHE FUNZIONI ANCHE CON IL FORM


  return (
    <div>  
        <Container maxWidth="md" sx={{ mt: 15, mb: 5 }}>
            <TextField
                id="search"
                type="search"
                label="Cerca attività"
                onChange={(event)=>setSearchTerm(event.target.value)}
                onKeyDown={(event)=>{
                    if(event.key=="Enter"){
                        if(searchTerm=="") get_5_activities().then((result) => {setActivities(result)})
                        else search_activities(searchTerm).then((result) => {setActivities(result)})
                    }
                }}
                sx={{ width: "90%"}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon 
                                type="submit"
                                style={{ cursor: "pointer" }}
                                onClick={()=>{
                                    if(searchTerm=="") get_5_activities().then((result) => {setActivities(result)})
                                    else search_activities(searchTerm).then((result) => {setActivities(result)})}}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </Container>
        
        {activities.map((activity,i) => {
            let doc_id = activity.id
            let activity_data = activity.data()
            return ( 
                <div className='back' key={i}>
                    <ActivityCard
                        doc_id={doc_id}
                        activity={activity_data}
                        selectActivity={props.selectActivity}
                    />
                </div>
            )
        })}




    </div>
  )
}
