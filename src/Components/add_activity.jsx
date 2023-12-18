import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RegisterActivity } from "./register_activity.jsx"

export const AddActivity = (props) => {
    const handle_show_module = () => {props.setAddActivity(true)}

    if (!props.addActivity) {
    return (
        <div style={{marginTop:"15vh"}}>
            <h2>
                Aggiungi adesso la tua attività
            </h2>
            <AddCircleIcon color="primary" sx={{fontSize:"50px"}} onClick={handle_show_module}/>
        </div>
    )
    }
    else {
        return (
            <RegisterActivity/>
        )
    }
}