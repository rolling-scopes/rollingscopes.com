var exec = require('child_process').exec;
var async = require('async');

var account = "rolling_scopes";
var password = "";

var students = ["Yauhen_Chaika",
    "Aliaksandr_Zankevich",
    "Ivan_Hil",
    "Mikhail_Yermalayeu",
    "Alena_Bushyla",
    "Raman_Savaryn",
    "aliaksandr_kokurin",
    "yuliya_karenik",
    "Mikita_Khodulev",
    "dzmitry_bahachuk",
    "Denis_Nevar",
    "Aliona_Kastsevich",
    "andrey_lukashenko",
    "viktar_hameza",
    "Anna_Loiko",
    "Raman_Kozar",
    "Uladzislau_Charneny",
    "Maksim_Ashchepkau",
    "Siarhei_Patronchyk",
    "Ulyana_Nikalayenko",
    "Raman_Nerad",
    "Siarhei_Saroka",
    "Aliaksandra_Dauliash",
    "Aleksey_Kasteuk",
    "Uladzislau_Sipaila",
    "Aliaksandra_Havarkova",
    "Katsiaryna_Maskaleva",
    "Alena_Marhayova",
    "dzmitry_kalinin",
    "Dzmitry_Dauhaliavets",
    "Aliaksandr_Sakalou",
    "Hanna_Pratasevich",
    "Kiryl_Mitskevich",
    "alexey-ulashchick",
    "Dzianis_Buividovich",
    "Darya_Ivanovich",
    "Ilya_Iuyeu",
    "Volha_Borys",
    "viktar_akulenka",
    "Siarhei_Andryieuski",
    "Constantine_Shkel",
    "Heorhi_Sidorin",
    "nataljakaranevich",
    "Egor_Volozhanin",
    "Semiankou_Viachaslau",
    "inna_r",
    "Pulsha_Andrei",
    "Siarhei_Puzatka",
    "Denis_Minich"];

async.map(students, gitClone, function (e, r) {
    //console.log(r);
});

function gitClone(student, callback){
    var gitCommand = 'git clone https://' + account + ':' + password + '@bitbucket.org/' + student + '/front-end-course.git ' + student;

    exec(gitCommand, function (error, stdout, stderr) {
        console.log("stdout" + JSON.stringify(stdout));
        console.log("error" + JSON.stringify(error));
        console.log("stderr" + JSON.stringify(stderr));
        callback();
    });
}