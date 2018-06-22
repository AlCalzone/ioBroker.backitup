/**
 *
 * backitup adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "backitup",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js backitup Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@backitup.com>"
 *          ]
 *          "desc":         "backitup adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "materialize":  true,                       // support of admin3
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42,
 *          "mySelect": "auto"
 *      }
 *  }
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

// you have to require the utils module and call adapter function
const utils =    require(__dirname + '/lib/utils'); // Get common adapter utils

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.backitup.0
const adapter = new utils.Adapter('backitup');

/*Variable declaration, since ES6 there are let to declare variables. Let has a more clearer definition where
it is available then var.The variable is available inside a block and it's childs, but not outside.
You can define the same variable name inside a child without produce a conflict with the variable of the parent block.*/
let variable = 1234;

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
    try {
        adapter.log.info('cleaned everything up...');
        callback();
    } catch (e) {
        callback();
    }
});

// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
    // Warning, obj can be null if it was deleted
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

// is called if a subscribed state changes
adapter.on('stateChange', function (id, state) {
    // Warning, state can be null if it was deleted
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    // you can use the ack flag to detect if it is status (true) or command (false)
    if (state && !state.ack) {
        adapter.log.info('ack is not set!');
    }
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
    if (typeof obj === 'object' && obj.message) {
        if (obj.command === 'send') {
            // e.g. send email or pushover or whatever
            console.log('send command');

            // Send response in callback if required
            if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
        }
    }
});

// is called when databases are connected and adapter received configuration.
// start here!
adapter.on('ready', function () {
    main();
});

function main() {

// ############## Anfang backitup #########################

// config zum testen in Log schreiben
    adapter.log.info('config minimal_BackupState: '    + adapter.config.minimal_BackupState);
    adapter.log.info('config minimal_BackupZeit: '    + adapter.config.minimal_BackupZeit);
    adapter.log.info('config minimal_BackupTageZyklus: ' + adapter.config.minimal_BackupTageZyklus);
    adapter.log.info('config minimal_BackupState: ' + adapter.config.minimal_BackupState);
    adapter.log.info('config minimal_BackupZeit: ' + adapter.config.minimal_BackupZeit);
	adapter.log.info('config minimal_BackupTageZyklus: ' + adapter.config.minimal_BackupTageZyklus);
	adapter.log.info('config minimal_BackupLoeschenNach: ' + adapter.config.minimal_BackupLoeschenNach);
	adapter.log.info('config minimal_NamensZusatz: ' + adapter.config.minimal_NamensZusatz);
	adapter.log.info('config komplett_BackupState: ' + adapter.config.komplett_BackupState);
	adapter.log.info('config komplett_BackupZeit: ' + adapter.config.komplett_BackupZeit);
	adapter.log.info('config komplett_BackupTageZyklus: ' + adapter.config.komplett_BackupTageZyklus);
	adapter.log.info('config komplett_BackupLoeschenNach: ' + adapter.config.komplett_BackupLoeschenNach);
	adapter.log.info('config komplett_NamensZusatz: ' + adapter.config.komplett_NamensZusatz);
	adapter.log.info('config IoStopStart: ' + adapter.config.IoStopStart);
	adapter.log.info('config MysqlDbName: ' + adapter.config.MysqlDbName);
	adapter.log.info('config MysqlDbUser: ' + adapter.config.MysqlDbUser);
	adapter.log.info('config MysqlDbPw: ' + adapter.config.MysqlDbPw);
	adapter.log.info('config MysqlBackupLoeschenNach: ' + adapter.config.MysqlBackupLoeschenNach);
	adapter.log.info('config ccu_BackupState: ' + adapter.config.ccu_BackupState);
	adapter.log.info('config ccu_BackupZeit: ' + adapter.config.ccu_BackupZeit);
	adapter.log.info('config ccu_BackupTageZyklus: ' + adapter.config.ccu_BackupTageZyklus);
	adapter.log.info('config ccu_BackupLoeschenNach: ' + adapter.config.ccu_BackupLoeschenNach);
	adapter.log.info('config ccu_NamensZusatz: ' + adapter.config.ccu_NamensZusatz);
	adapter.log.info('config ccuCcuIp: ' + adapter.config.ccuCcuIp);
	adapter.log.info('config ccuCcuUser: ' + adapter.config.ccuCcuUser);
	adapter.log.info('config ccuCcuPw: ' + adapter.config.ccuCcuPw);
	adapter.log.info('config CifsMount: ' + adapter.config.CifsMount);
	adapter.log.info('config FtpHost: ' + adapter.config.FtpHost);
	adapter.log.info('config FtpDir: ' + adapter.config.FtpDir);
	adapter.log.info('config FtpUser: ' + adapter.config.FtpUser);
	adapter.log.info('config FtpPw: ' + adapter.config.FtpPw);

// -----------------------------------------------------------------------------
// allgemeine Variablen
// -----------------------------------------------------------------------------
var logging = true;                                                 // Logging on/off
var debugging = false;										        // Detailiertere Loggings
var instanz = 'adapter.config.';  // instanz = instanz + instance +'.';    //                                                            //
var pfad0 =   '.System.Iobroker.Backup.';					        // Pfad innerhalb der Instanz


var bash_script = 'bash /opt/iobroker/backitup.sh ';        // Pfad zu backup.sh Datei

var anzahl_eintraege_history = 25;                          // Anzahl der Eintr�ge in der History


//#################################################################################################
//###                                                                                           ###
//###  Ab hier nichts mehr �ndern alle Einstellungen sind in den angelegten Datenpunkten oder   ###
//###  den paar wenigen obigen Variablen zu t�tigen                                             ###
//###                                                                                           ###
//#################################################################################################


var Backup = [];                                        // Array f�r die Definition der Backuptypen und deren Details

// Konfigurationen f�r das Standard-IoBroker Backup

    Backup[0] = [];
    Backup[0][0] = 'minimal';   // Backup Typ (nicht ver�ndern!)
    Backup[0][1] = adapter.getState(adapter.config.minimal_NamensZusatz);        	// Names Zusatz, wird an den Dateinamen angeh�ngt bspw. Master/Slave (falls gew�nscht, ansonsten leer lassen)
    Backup[0][2] = adapter.getState(adapter.config.minimal_BackupLoeschenNach);  	// Alte Backups l�schen nach X Tagen (falls gew�nscht, ansonsten leer lassen)
    Backup[0][3] = adapter.getState(adapter.config.FtpHost);             	// FTP-Host
    Backup[0][4] = adapter.getState(adapter.config.FtpDir);              	// genaue Verzeichnissangabe bspw. /volume1/Backup/ auf FTP-Server (falls gew�nscht, ansonsten leer lassen)
    Backup[0][5] = adapter.getState(adapter.config.FtpUser);             	// Username f�r FTP Server - Verbindung
    Backup[0][6] = adapter.getState(adapter.config.FtpPw);               	// Passwort f�r FTP Server - Verbindung
    Backup[0][7] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[0][8] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[0][9] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[0][10] = adapter.getState(adapter.config.CifsMount);         	// Festlegen ob CIFS-Mount genutzt werden soll
    Backup[0][11] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)


// Konfigurationen f�r das Komplette-IoBroker Backup

    Backup[1] = [];
    Backup[1][0] = 'komplett';  // Backup Typ (nicht ver�ndern)
    Backup[1][1] = adapter.getState(adapter.config.komplett_NamensZusatz);       	// Names Zusatz, wird an den Dateinamen angeh�ngt bspw. Master/Slave (falls gew�nscht, ansonsten leer lassen)
    Backup[1][2] = adapter.getState(adapter.config.komplett_BackupLoeschenNach); 	// Alte Backups l�schen nach X Tagen (falls gew�nscht, ansonsten leer lassen)
    Backup[1][3] = adapter.getState(adapter.config.FtpHost);            	// FTP-Host
    Backup[1][4] = adapter.getState(adapter.config.FtpDir);             	// genaue Verzeichnissangabe bspw. /volume1/Backup/ auf FTP-Server (falls gew�nscht, ansonsten leer lassen)
    Backup[1][5] = adapter.getState(adapter.config.FtpUser);            	// Username f�r FTP Server - Verbindung
    Backup[1][6] = adapter.getState(adapter.config.FtpPw);              	// Passwort f�r FTP Server - Verbindung
    Backup[1][7] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[1][8] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[1][9] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[1][10] = adapter.getState(adapter.config.CifsMount);       		// Festlegen ob CIFS-Mount genutzt werden soll
    Backup[1][11] = adapter.getState(adapter.config.IoStopStart);         	// Festlegen ob IoBroker gestoppt/gestartet wird

// Konfiguration f�r das CCU / pivCCU / Raspberrymatic Backup

    Backup[2] = [];
    Backup[2][0] = 'ccu'; // Backup Typ (nicht ver�ndern)
    Backup[2][1] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)
    Backup[2][2] = adapter.getState(adapter.config.ccu_BackupLoeschenNach); // Alte Backups l�schen nach X Tagen (falls gew�nscht, ansonsten leer lassen)
    Backup[2][3] = adapter.getState(adapter.config.FtpHost);            	// FTP-Host
    Backup[2][4] = adapter.getState(adapter.config.FtpDir);             	// genaue Verzeichnissangabe bspw. /volume1/Backup/ auf FTP-Server (falls gew�nscht, ansonsten leer lassen)
    Backup[2][5] = adapter.getState(adapter.config.FtpUser);            	// Username f�r FTP Server - Verbindung
    Backup[2][6] = adapter.getState(adapter.config.FtpPw);              	// Passwort f�r FTP Server - Verbindung
    Backup[2][7] = adapter.getState(adapter.config.ccuCcuIp);              // IP-Adresse der CCU
    Backup[2][8] = adapter.getState(adapter.config.ccuCcuUser);            // Username der CCU
    Backup[2][9] = adapter.getState(adapter.config.ccuCcuPw);              // Passwort der CCU
    Backup[2][10] = adapter.getState(adapter.config.CifsMount);         	// Festlegen ob CIFS-Mount genutzt werden soll
    Backup[2][11] = ''; // Nicht ben�tigt bei diesem BKP-Typ (nicht ver�ndern!)

var Mysql_DBname = adapter.getState(adapter.config.MysqlDbName);           // Name der Datenbank (wenn nicht verwendet leer lassen!)
var Mysql_User = adapter.getState(adapter.config.MysqlDbUser);           	// Benutzername f�r Datenbank (wenn nicht verwendet leer lassen!)
var Mysql_PW = adapter.getState(adapter.config.MysqlDbPw);           		// Passwort f�r Datenbank (wenn nicht verwendet leer lassen!)
var Mysql_LN = adapter.getState(adapter.config.MysqlBackupLoeschenNach); 	// DB-Backup l�schen nach (wenn nicht verwendet leer lassen!)

var BkpZeit_Schedule = [];                              // Array f�r die Backup Zeiten

var Enum_ids =[];                                       // Array f�r die ID's die sp�ter in der enum.function erstellt werden

var history_array = [];                                // Array f�r das anlegen der Backup-Historie
// =============================================================================
// Objekte
// =============================================================================
// Objekt zur Pr�fung ob Auto_Backup aktiv ist.
adapter.setObject('System.Iobroker.Backup.Auto_Backup', {type: 'state', common: {name: 'Automatisches Backup', type: 'boolean', state: 'false', role: 'indicator'}, native: {}});

// Neu seit V2 Objekt zur Erstellung der enum.functions Eintr�ge
adapter.setObject('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen', {type: 'state', common: {name: 'Alle benoetigten Objekte erstellt', type: 'boolean', def: 'false', role: 'indicator'}, native: {}});

// Neu seit V2 Objekt zum Pr�fen ob IoBroker wegen einem kompletten Backup neu gestartet ist.
adapter.setObject('System.Iobroker.Backup.Konfiguration.IoRestart_komp_Bkp', {type: 'state', common: {name: 'Restart IoBroker wegen komplett Backup', type: 'boolean', def: 'false', role: 'indicator'}, native: {}});

//Neu seit V2 HistoryLog f�r die ausgef�hren Backups
adapter.setObject('System.Iobroker.Backup.History.' + 'Backup_history', {type: 'state', common: {name: 'History der Backups', type: 'string', def: '<span class="bkptyp_komplett">Noch kein Backup</span>', role: 'indicator'}, native: {}});

//Neu seit V2 einen separaten Zeitstempel f�r jeden Backuptyp
adapter.setObject('System.Iobroker.Backup.History.letztes_minimal_Backup', {type: 'state', common: {name: 'Letztes minimal Backup', type: 'string', def: 'Noch kein Backup', role: 'indicator'}, native: {}});
adapter.setObject('System.Iobroker.Backup.History.letztes_komplett_Backup', {type: 'state', common: {name: 'Letztes komplett Backup', type: 'string', def: 'Noch kein Backup', role: 'indicator'}, native: {}});
adapter.setObject('System.Iobroker.Backup.History.letztes_ccu_Backup', {type: 'state', common: {name: 'Letztes CCU Backup', type: 'string', def: 'Noch kein Backup', role: 'indicator'}, native: {}});

//Neu seit V2 ein jetzt Backup durchf�hren f�r jeden Backuptyp
adapter.setObject('System.Iobroker.Backup.OneClick.start_minimal_Backup', {type: 'state', common: {name: 'Minimal Backup ausfuehren', type: 'boolean', def: 'false', role: 'indicator'}, native: {}});
adapter.setObject('System.Iobroker.Backup.OneClick.start_komplett_Backup', {type: 'state', common: {name: 'Komplett Backup ausfuehren', type: 'boolean', def: 'false', role: 'indicator'}, native: {}});
adapter.setObject('System.Iobroker.Backup.OneClick.start_ccu_Backup', {type: 'state', common: {name: 'CCU Backup ausfuehren', type: 'boolean', def: 'false', role: 'indicator'}, native: {}});


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// #############################################################################
// #                                                                           #
// #  Funktion zum anlegen eines Schedules f�r Backupzeit                      #
// #                                                                           #
// #############################################################################

function BackupStellen() {
    adapter.setState('System.Iobroker.Backup.Auto_Backup', false);
    Backup.forEach(function(Bkp) {
		// ######################### Anfang wird nicht mehr ben�tigt #####################################
        // -----------------------------------------------------------------------------
        //  Erstellen der Backupdatenpunkte
        // -----------------------------------------------------------------------------

        /*
        createState(instanz + pfad0 + 'Einstellungen.' + Bkp[0] +'.BackupState',  {def: 'false',type: 'boolean',name: Bkp[0] +' Backup Status'});
        createState(instanz + pfad0 + 'Einstellungen.' + Bkp[0] +'.BackupZeit',  {def: '02:00',type: 'string',name: Bkp[0] +' Backup Zeit'});
        createState(instanz + pfad0 + 'Einstellungen.' + Bkp[0] +'.BackupTageZyklus',  {def: '3',type: 'number',name: Bkp[0] +' Backup Tages-Zyklus'});

        if(Bkp[0] !== 'ccu') {
            createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.NamensZusatz',  {def: '',type: 'string',name: Bkp[0] +' NamensZusatz'});
        }
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.BackupLoeschenNach',  {def: '5',type: 'number',name: Bkp[0] +' Loeschen nach'});
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.FtpHost',  {def: '',type: 'string',name: Bkp[0] +' FTP Host'});
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.FtpDir',  {def: '',type: 'string',name: Bkp[0] +' FTP Dir'});
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.FtpUser',  {def: '',type: 'string',name: Bkp[0] +' FTP User'});
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.FtpPw',  {def: '',type: 'string',name: Bkp[0] +' FTP Passwort'});
        createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.CifsMount',  {def: 'false',type: 'boolean',name: Bkp[0] +' CIFS Mount'});
        if(Bkp[0] == 'ccu') {
            createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.CcuIp',  {def: '',type: 'string',name: Bkp[0] +' CCU IP'});
            createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.CcuUser',  {def: '',type: 'string',name: Bkp[0] +' CCU User'});
            createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.CcuPw',  {def: '',type: 'string',name: Bkp[0] +' CCU PW'});
        }
        if(Bkp[0] == 'komplett') {
            createState(instanz + pfad0 + 'Konfiguration.' + Bkp[0] +'.IoStopStart',  {def: 'true',type: 'boolean',name: Bkp[0] +' IoStopStart'});
            createState(instanz + pfad0 + 'Konfiguration.Mysql.DbName',  {def: '',type: 'string',name:' Datenbank Name'});
            createState(instanz + pfad0 + 'Konfiguration.Mysql.DbUser',  {def: '',type: 'string',name:' Datenbank User'});
            createState(instanz + pfad0 + 'Konfiguration.Mysql.DbPw',  {def: '',type: 'string',name:' Datenbank Passwort'});
            createState(instanz + pfad0 + 'Konfiguration.Mysql.BackupLoeschenNach',  {def: '5',type: 'number',name:' Datenbank Loeschen nach'});
        }
        */
        // ######################### Ende wird nicht mehr ben�tigt #####################################

// ###################################### Ab hier m�ssen noch Fehler gesucht werden und Anpssungen gemacht werden (deshalb auskommentiert) ###############################################
//           if(adapter.getState(instanz + Bkp[0] +'_BackupState'), true) {
//               var BkpUhrZeit = adapter.getState(instanz + Bkp[0] + '_BackupZeit'), sid.split(':');
//               if(logging) log('Ein '+Bkp[0]+' Backup wurde um '+adapter.getState(instanz + Bkp[0] +'_BackupZeit').val+' Uhr jeden '+adapter.getState(instanz + Bkp[0] +'_BackupTageZyklus').val+' Tag  aktiviert');
//                if(BkpZeit_Schedule[Bkp[0]]) clearSchedule(BkpZeit_Schedule[Bkp[0]]);
//
//                BkpZeit_Schedule[Bkp[0]] = schedule('10 '+BkpUhrZeit[1] + ' ' + BkpUhrZeit[0] + ' */'+adapter.getState(instanz + Bkp[0] +'_BackupTageZyklus').val+' * * ', function (){backup_erstellen(Bkp[0], Bkp[1], Bkp[2], Bkp[3], Bkp[4], Bkp[5], Bkp[6], Bkp[7], Bkp[8], Bkp[9], Bkp[10], Bkp[11], Mysql_DBname, Mysql_User, Mysql_PW, Mysql_LN)});
//
//                if(debugging) log('10 '+BkpUhrZeit[1] + ' ' + BkpUhrZeit[0] + ' */'+adapter.getState(instanz + Bkp[0] +'_BackupTageZyklus').val+' * * ');
//            }
//            else{
//                if(logging) log ('Das '+Bkp[0]+' Backup wurde deaktiviert');
//                if(BkpZeit_Schedule[Bkp[0]]) clearSchedule(BkpZeit_Schedule[Bkp[0]]);
//            }

            // -----------------------------------------------------------------------------
            //  Erstellen der Aufz�hlungen f�r die Backupdatenpunkte
            // -----------------------------------------------------------------------------
            if(!adapter.getState('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen')) {

                Enum_ids.push(instanz + Bkp[0] +'_BackupState');
                Enum_ids.push(instanz + Bkp[0] +'_BackupZeit');
                Enum_ids.push(instanz + Bkp[0] +'_BackupTageZyklus');

                Enum_ids.push(instanz + Bkp[0] +'_NamensZusatz');
                Enum_ids.push(instanz + Bkp[0] +'_BackupLoeschenNach');
                Enum_ids.push(adapter.config.FtpHost);
                Enum_ids.push(adapter.config.FtpDir);
                Enum_ids.push(adapter.config.FtpUser);
                Enum_ids.push(adapter.config.FtpPw);
                Enum_ids.push(adapter.config.CifsMount);

                if(Bkp[0] == 'ccu') {
                    Enum_ids.push(adapter.config.CcuIp);
                    Enum_ids.push(adapter.config.CcuUser);
                    Enum_ids.push(adapter.config.CcuPw);
                }
                if(Bkp[0] == 'komplett') {
                    Enum_ids.push(adapter.config.IoStopStart);
                    Enum_ids.push(adapter.config.MysqlDbName);
                    Enum_ids.push(adapter.config.MysqlDbUser);
                    Enum_ids.push(adapter.config.MysqlDbPasswort);
                    Enum_ids.push(adapter.config.MysqlLoeschenNach);
                }
            }

    });

    if(!adapter.getState('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen')) {
        var Enum_obj = {};
        Enum_obj.type = 'enum';
        Enum_obj.common = {};
        Enum_obj.common.name = 'BackItUp';
        Enum_obj.common.members = Enum_ids;
        adapter.setObject('enum.functions.BackItUp', Enum_obj);
    }
adapter.setState('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen', true);
}

// #############################################################################
// #                                                                           #
// #  Funktion zum Ausf�hren des Backups mit obigen Einstellungen              #
// #                                                                           #
// #############################################################################


function backup_erstellen(typ, name, zeit, host, pfad, user, passwd, ccuip, ccuusr, ccupw, cifsmnt, bkpiors, mysqldb, mysqlusr, mysqlpw, mysqlln) {

    if(debugging) log(bash_script+'"'+typ+'|'+name+'|'+zeit+'|'+host+'|'+pfad+'|'+user+'|'+passwd+'|'+ccuip+'|'+ccuusr+'|'+ccupw+'|'+cifsmnt+'|'+bkpiors+'|'+mysqldb+'|'+mysqlusr+'|'+mysqlpw+'|'+mysqlln+'"');

    if(typ == 'komplett' && bkpiors === true){
        adapter.setState(instanz + pfad0 + 'IoRestart_komp_Bkp', true);
    }
    adapter.setState('System.Iobroker.BackupHistory.letztes_'+typ+'_Backup', formatDate(new Date(), 'DD.MM.YYYY') +' um '+ formatDate(new Date(), 'hh:mm:ss')+' Uhr');

    var ftp_bkp_u;
    if(host === '') ftp_bkp_u = 'NEIN'; else ftp_bkp_u = 'JA';
    backup_history_anlegen(formatDate(new Date(), 'DD.MM.YYYY') +' um '+ formatDate(new Date(), 'hh:mm:ss')+' Uhr',typ,ftp_bkp_u);


    exec((bash_script+' "'+typ+'|'+name+'|'+zeit+'|'+host+'|'+pfad+'|'+user+'|'+passwd+'|'+ccuip+'|'+ccuusr+'|'+ccupw+'|'+cifsmnt+'|'+bkpiors+'|'+mysqldb+'|'+mysqlusr+'|'+mysqlpw+'|'+mysqlln+'"'), function(err, stdout, stderr) {
        if(logging){
            if(err) log(stderr, 'error');
            else log('exec: ' + stdout);
        }
    });

}

// #############################################################################
// #                                                                           #
// #  Backupdurchf�hrung in History eintragen                                  #
// #                                                                           #
// #############################################################################

function backup_history_anlegen(zeitstempel,typ,ftp_bkp_u) {
     var history_liste = System.Iobroker.Backup.History.Backup_history;
         history_array = history_liste.split('&nbsp;');


     if(history_array.length >= anzahl_eintraege_history){
        history_array.splice((anzahl_eintraege_history - 1),1);
     }
     history_array.unshift('<span class="bkptyp_'+ typ +'">' + zeitstempel + ' - Typ:' + typ + ' - Ftp-Sicherung:' + ftp_bkp_u + '</span>');
     adapter.setState('System.Iobroker.Backup.History.Backup_history', history_array.join('&nbsp;'));
}

// #############################################################################
// #                                                                           #
// #  Abl�ufe nach Neustart des Backupscripts                                  #
// #                                                                           #
// #############################################################################

function ScriptStart() {
    if(adapter.getState('System.Iobroker.Backup.Konfiguration.IoRestart_komp_Bkp').val === true){
        adapter.setStateDelayed('System.Iobroker.Backup.Konfiguration.IoRestart_komp_Bkp', false, 5000);
    }

    BackupStellen();

}

function WerteAktualisieren() {
    runScript(name);
    log('Werte wurden aktualisiert');
}

// #############################################################################
// #                                                                           #
// #  Beim ersten Start alle ben�tigten Datenpunkte / Enum.funcitons erstellen #
// #                                                                           #
// #############################################################################

if(!adapter.getObject('enum.functions.BackItUp') || !adapter.getObject('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen') || adapter.getState('System.Iobroker.Backup.Konfiguration.Konfig_abgeschlossen').val === false) {
    BackupStellen();
}

// #############################################################################
// #                                                                           #
// #  Beobachten der drei One-Click-Backup Datenpunkte                         #
// #  - Bei Aktivierung start des jeweiligen Backups                           #
// #                                                                           #
// #############################################################################
adapter.on({id: 'System.Iobroker.Backup.OneClick.start_minimal_Backup', change: "ne"}, function (dp) {
    if(dp.state.val === true){
        log('OneClick Minimal Backup gestartet');
        backup_erstellen(Backup[0][0], Backup[0][1], Backup[0][2], Backup[0][3], Backup[0][4], Backup[0][5], Backup[0][6], Backup[0][7], Backup[0][8], Backup[0][9], Backup[0][10], Backup[0][11], Mysql_DBname, Mysql_User, Mysql_PW, Mysql_LN);
        if(debugging)log('backup_erstellen('+Backup[0][0]+','+Backup[0][1]+','+Backup[0][2]+','+Backup[0][3]+','+Backup[0][4]+','+Backup[0][5]+','+Backup[0][6]+','+Backup[0][7]+','+Backup[0][8]+','+Backup[0][9]+','+Backup[0][10]+','+Backup[0][11]+','+Mysql_DBname+','+Mysql_User+','+Mysql_PW+','+Mysql_LN+')');
        adapter.setStateDelayed('System.Iobroker.Backup.OneClick.start_minimal_Backup', false, 20000);
    }
});
adapter.on({id: 'System.Iobroker.Backup.OneClick.start_komplett_Backup', change: "ne"}, function (dp) {
    if(dp.state.val === true){
        log('OneClick Komplett Backup gestartet');
        backup_erstellen(Backup[1][0], Backup[1][1], Backup[1][2], Backup[1][3], Backup[1][4], Backup[1][5], Backup[1][6], Backup[1][7], Backup[1][8], Backup[1][9], Backup[1][10], Backup[1][11], Mysql_DBname, Mysql_User, Mysql_PW, Mysql_LN);
        if(debugging)log('backup_erstellen('+Backup[1][0]+','+Backup[1][1]+','+Backup[1][2]+','+Backup[1][3]+','+Backup[1][4]+','+Backup[1][5]+','+Backup[1][6]+','+Backup[1][7]+','+Backup[1][8]+','+Backup[1][9]+','+Backup[1][10]+','+Backup[1][11]+','+Mysql_DBname+','+Mysql_User+','+Mysql_PW+','+Mysql_LN+')');
        adapter.setStateDelayed('System.Iobroker.Backup.OneClick.start_komplett_Backup', false, 5000);
    }
});
adapter.on({id: 'System.Iobroker.Backup.OneClick.start_ccu_Backup', change: "ne"}, function (dp) {
    if(dp.state.val === true){
        log('OneClick CCU Backup gestartet');
        backup_erstellen(Backup[2][0], Backup[2][1], Backup[2][2], Backup[2][3], Backup[2][4], Backup[2][5], Backup[2][6], Backup[2][7], Backup[2][8], Backup[2][9], Backup[2][10], Backup[2][11], Mysql_DBname, Mysql_User, Mysql_PW, Mysql_LN);
        if(debugging)log('backup_erstellen('+Backup[2][0]+','+Backup[2][1]+','+Backup[2][2]+','+Backup[2][3]+','+Backup[2][4]+','+Backup[2][5]+','+Backup[2][6]+','+Backup[2][7]+','+Backup[2][8]+','+Backup[2][9]+','+Backup[2][10]+','+Backup[2][11]+','+Mysql_DBname+','+Mysql_User+','+Mysql_PW+','+Mysql_LN+')');
        adapter.setStateDelayed('System.Iobroker.Backup.OneClick.start_ccu_Backup', false, 20000);
    }
});
// #############################################################################
// #                                                                           #
// #  Beobachten aller Backupdatenpunkte                                       #
// #                                                                           #
// #############################################################################
/*
$('state(functions=BackItUp)').on(function(obj) {

    WerteAktualisieren();

});

// #############################################################################
// #                                                                           #
// #  Bei Scriptstart Schedules setzen                                         #
// #                                                                           #
// #############################################################################

ScriptStart();

*/
// ############## Ende backitup #########################

    // The adapters config (in the instance object everything under the attribute "native") is accessible via
    // adapter.config:

/*


    /**
     *
     *      For every state in the system there has to be also an object of type state
     *
     *      Here a simple backitup for a boolean variable named "testVariable"
     *
     *      Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
     *
     */
/*
    adapter.setObject('testVariable', {
        type: 'state',
        common: {
            name: 'testVariable',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });

    // in this backitup all states changes inside the adapters namespace are subscribed
    adapter.subscribeStates('*');


    /**
     *   setState examples
     *
     *   you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
     *
     */
/*
    // the variable testVariable is set to true as command (ack=false)
    adapter.setState('testVariable', true);

    // same thing, but the value is flagged "ack"
    // ack should be always set to true if the value is received from or acknowledged from the target system
    adapter.setState('testVariable', {val: true, ack: true});

    // same thing, but the state is deleted after 30s (getState will return null afterwards)
    adapter.setState('testVariable', {val: true, ack: true, expire: 30});



    // examples for the checkPassword/checkGroup functions
    adapter.checkPassword('admin', 'iobroker', function (res) {
        console.log('check user admin pw ioboker: ' + res);
    });
*/
    adapter.checkGroup('admin', 'admin', function (res) {
        console.log('check group user admin group admin: ' + res);
    });



}