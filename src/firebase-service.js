import { db } from "./firebase-config";
import { setDoc, doc, collection, updateDoc, getDocs, arrayRemove, arrayUnion, query, limit, where, orderBy} from "firebase/firestore"; 


export async function createProfile (nome, cognome,cellulare, uid){ 
    await setDoc(doc(db, "users", uid), {
        nome: nome,
        cognome: cognome,
        cellulare: cellulare,
        attivita: "",
    });
}

export async function deleteAppointment(uid, appointment, nome, cognome, cellulare, email){
    //Rimozione appuntamento dal database utente
    const docRef_u = doc(db, "users", uid);
    updateDoc(docRef_u, {
        appointments: arrayRemove(appointment)  
    });
    //Rimozione appuntamento dal database attività
    //Devo ricreare oggetto appuntamento per poterlo rimuovere
    const app_obj_a = {cliente: nome + " " + cognome,data_ora: appointment.date, email: email, telefono: cellulare}
    let q = query(collection(db, "activity"), where("nome_attivita", "==", appointment.activity));
    let query_snapshot = await getDocs(q);
    let activity_id = query_snapshot.docs[0].id;
    const docRef_a = doc(db, "activity", activity_id);
    switch(appointment.date.toDate().getDay()){
        case 0:
            updateDoc(docRef_a, {"appuntamenti.Domenica": arrayRemove(app_obj_a)});
            break;
        case 1:
            updateDoc(docRef_a, {"appuntamenti.Lunedi": arrayRemove(app_obj_a)});
            break;
        case 2:
            updateDoc(docRef_a, {"appuntamenti.Martedi": arrayRemove(app_obj_a)});
            break;
        case 3:
            updateDoc(docRef_a, {"appuntamenti.Mercoledi": arrayRemove(app_obj_a)});
            break;
        case 4:
            updateDoc(docRef_a, {"appuntamenti.Giovedi": arrayRemove(app_obj_a)});
            break;
        case 5:
            updateDoc(docRef_a, {"appuntamenti.Venerdi": arrayRemove(app_obj_a)});
            break;
        case 6:
            updateDoc(docRef_a, {"appuntamenti.Sabato": arrayRemove(app_obj_a)});
            break;
    }

}

export async function check_name_activity(nome_attivita){
    let q = query(collection(db, "activity"), where("nome_attivita", "==",nome_attivita));
    let query_snapshot = await getDocs(q);
    console.log("query_snapshot", query_snapshot);
    if (query_snapshot.empty){
        console.log("non esiste");
        return false; //non esiste
    }
    else{
        console.log("esiste");
        return true //esiste
    }
}

export async function registerActivity(uid, nome_attivita, indirizzo, sito_web, numero_telefono, email_aziendale, durata_app, time_week ){
  //creare il nuovo documento con lo stesso uid dell'utente per associarlo
    await setDoc(doc(db, "activity", uid), {
        nome_attivita: nome_attivita,
        indirizzo: indirizzo,
        sito_web: sito_web,
        numero_telefono: numero_telefono,
        email_aziendale: email_aziendale,
        durata_app: durata_app,
        time_week: time_week,
        appuntamenti: {
            Lunedi: [],
            Martedi: [],
            Mercoledi: [],
            Giovedi: [],
            Venerdi: [],
            Sabato: [],
            Domenica: []
        },
  });

  //modificare il documento dell'utente scrivendo nome attività nel campo activity
    const docRef = doc(db, "users", uid);
    updateDoc(docRef, {
        attivita: nome_attivita
    });
}

export async function get_5_activities(){
    let q = query(collection(db, "activity"), orderBy("nome_attivita"), limit(5));
    let query_snapshot = await getDocs(q);
    return query_snapshot.docs;
}

export async function search_activities (search_text){ //per la barra di ricerca
    let q = query(collection(db, "activity"), where("nome_attivita", ">=", search_text), where("nome_attivita", "<=", search_text + "\uf8ff"), orderBy("nome_attivita", limit(5)));
    let query_snapshot = await getDocs(q);
    return query_snapshot.docs;
}





export async function reserve_appointments(day, hour, current_user, user_data, activity_id, activity_name){
    let date_string = day.format("YYYY-MM-DD") + "T" + hour + ":00";
    let date = new Date(date_string);
    // Registra l'appuntamento nel database attività

    const app_obj_a = {cliente: user_data.nome + " " + user_data.cognome, telefono: user_data.cellulare, email: current_user.email, data_ora: date}
    const docRef_a = doc(db, "activity", activity_id);
    switch(day.get("day")){
        case 0:
            updateDoc(docRef_a, {"appuntamenti.Domenica": arrayUnion(app_obj_a)});
            break;
        case 1:
            updateDoc(docRef_a, {"appuntamenti.Lunedi": arrayUnion(app_obj_a)});
            break;
        case 2:
            updateDoc(docRef_a, {"appuntamenti.Martedi": arrayUnion(app_obj_a)});
            break;
        case 3:
            updateDoc(docRef_a, {"appuntamenti.Mercoledi": arrayUnion(app_obj_a)});
            break;
        case 4:
            updateDoc(docRef_a, {"appuntamenti.Giovedi": arrayUnion(app_obj_a)});
            break;
        case 5:
            updateDoc(docRef_a, {"appuntamenti.Venerdi": arrayUnion(app_obj_a)});
            break;
        case 6:
            updateDoc(docRef_a, {"appuntamenti.Sabato": arrayUnion(app_obj_a)});
            break;
    }
    //Registra l'appuntamento nel database utente
    const app_obj_u = {activity: activity_name, date: date}
    const docRef_u = doc(db, "users", current_user.uid);
    updateDoc(docRef_u, {appointments: arrayUnion(app_obj_u)});
}
