import { useState, useEffect } from "react"
import { AppBar, Tab,IconButton, Toolbar, Box} from "@mui/material"
import { TabContext, TabList } from "@mui/lab"
import LogoutIcon from '@mui/icons-material/Logout';
import  LogoNav from "../img/logo_nav.png"; //import logo
import { Prenota } from "./prenota";
import { AddActivity } from "./add_activity";
import { ManageActivity } from "./manage_activity";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from "./menu_responsive";



import {MyAppuntamenti} from "./myappuntamenti.jsx"
import { Loading } from "./loading";
import { ReserveApp } from "./reserve_app";

export const NavBar = (props) => {
    const [value,setValue] = useState(localStorage.getItem("tabs_value"))
    const [menu, setMenu] = useState(false) //variabile ch egestisce apertura e chiusura menu panino
    const [selected_activity, selectActivity] = useState(null)
    const [addActivity, setAddActivity] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        localStorage.setItem("tabs_value",newValue)
        selectActivity(null)
    }

    return (
        <div>
            <AppBar sx={{bgcolor: "white", height:"80px"}}>
                <Toolbar sx={{height:"80px"}}>
                    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                        <img src={LogoNav} alt="logo" style={{height:"110px",marginTop:"8px"}}/>
                    </Box>
                    <Box sx={{ flexGrow: 0.85 }}/>
                    <Box 	
                        sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <TabContext value={value} >
                            <TabList onChange={handleChange} >
                                <Tab label="I MIEI APPUNTAMENTI" value='1' sx={{fontSize:"18px"}} ></Tab>
                                <Tab label="PRENOTA" value='2' sx={{fontSize:"18px"}}></Tab>
                                <Tab label="LA MIA ATTIVITÀ" value='3' sx={{fontSize:"18px"}}></Tab> 
                            </TabList>
                        </TabContext> 
                    </Box>
                    <Box sx={{ flexGrow: 2 }}/>
                    <Box 
                        sx={{ display: { xs: 'none', sm: 'none', md: 'block'} }}> {/* mostrato solo da 900px a crescere */}
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={props.logout}
                            >
                            <LogoutIcon color="primary" />
                        </IconButton> 
                    </Box>
                    {/* Menu panino responsive */}
                    <Box 
                        sx={{ display: { xs: 'block', sm: 'block', md: 'none'} }}> {/* mostrato solo da 899px a scendere */}
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={()=>setMenu(true)}
                            >
                            <MenuIcon color="primary" />
                        </IconButton> 
                    </Box>
                </Toolbar>  
            </AppBar>




            {/* Cosa appare quando si clicca sul menu panino */}

            { value == "1" && <MyAppuntamenti user_data={props.user_data}/>}

            { (value == "2" && selected_activity==null) && <Prenota selectActivity={selectActivity}/> }

            { (value == "2" && selected_activity!=null) && <ReserveApp selected_activity={selected_activity} selectActivity={selectActivity} user_data={props.user_data} setValue={setValue}/> }

            { (value == "3" && props.user_data.attivita==undefined ) && <Loading/>}

            { (value == "3" && props.user_data.attivita=="" ) && <AddActivity addActivity={addActivity} setAddActivity={setAddActivity} />}

            { (value == "3" && props.user_data.attivita!=null && props.user_data.attivita!="" ) && <ManageActivity />}

            { menu == true && <Menu logout={props.logout} setValue={setValue} setMenu={setMenu} selectActivity={selectActivity}/> }

        </div>
    )
    
}