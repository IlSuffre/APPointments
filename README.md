# APPointments


BREVE DESCRIZIONE:

APPointments è una PWA che mira a renderere più smart le piccole attività rendendo possibile la prenotazione degli appuntamenti da parte dei clienti direttamente da un computer o uno smartphone.
APPointments prevede una sola tipologia di utenti che possono sia prenotare degli appuntamenti sia all'occorrenza gestire gli appuntamenti della propria attività.
La PWA è realizzata in React (javascript) con l'utlizzo del tool Vite, che gestisce la creazione del service worker e manifest durante la build del progetto, come backend invece sfrutta i servizi di Firebase.

FUNZIONAMENTO:

L'applicazione dopo che un utente ha effettuato l'acceso dispone di 3 sezioni:

APPUNTAMENTI(che si apre in automatico dopo il login) mostra gli appuntamenti prenotati dall'utente passati e futuri; i 2 si differenziano nella possibilità di annulare quelli futuri cliccando sull'icona del cestino mentre quelli passati non possono essere rimossi anzi restano salvati nel profilo come una sorta di cronologia.

PRENOTA permette di visualizzare 5 attività e selezionare quella desiderata per prenotare un appuntamento; dopo aver scelto l'attività verrà mostrato un calendario, per selezionare il giorno in cui l'utente vuole fare una prenotazioni, e dei bottoni, da cliccare per selezionare l'oraio. I bottoni grigi evidenziano appuntamentti che sono già stati prenotati o comunque non disponibili. Se l'attività di cui l'utente ha bisogno non è presente in quelle 5 può usare la barra di ricerca per cercarla tramite il suo nome ma deve fare attenzione a inserirlo correttamente (Maiuscole e minuscole al giusto posto sono fondamnetali per la ricerca), non serve completare il nome ma le lettere inserite devono effettivamente essere corrette.

LA MIA ATTIVIÀ permette agli utenti che possiedono un attività di registrarla tramite l'apposito form nel quale oltre alle informazioni basilari è richiesto di specificare i giorni e orari di apertura e la durata di tempo di un singolo appuntamento; con questi dati l'app genera automaticamento un calendario con gli orari degli appuntamenti prenotabili congruo a quelli di apertura. Dopo aver registrato l'attività questa sezione diventa di gestione nella quale è possibile visualizzare per ogni giorno gli appuntamenti prenotati con i nomi dei clienti e quelli liberi

APPointments è gia hostata tramite firebase all'indirizzo https://appointments-ms.web.app/

NOTA*
I processi di registrazione di un utente e di una attività possono richiedere qualche secondo in quanto si effettua il salvataggio di dati sui server Firebase
