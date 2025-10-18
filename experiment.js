// PsychoJS initialization
import { PsychoJS } from './lib/core-2023.2.js';
import * as visual from './lib/visual-2023.2.js';
import * as event from './lib/event-2023.2.js';
import * as core from './lib/core-2023.2.js';

const psychoJS = new PsychoJS({ debug: true });

// Window
psychoJS.openWindow({ fullscr:false, color:[1,1,1], units:'pix', waitBlanking:true });
let win = psychoJS.window;

// Participant info
let expInfo = { 'Participant': '' };
psychoJS.schedule(psychoJS.gui.DlgFromDict({ dict: expInfo, title:'Driving Scene Study' }));

// Data collection
let results = [];

// Video files
let videos = ['scene1.mp4','scene2.mp4','scene3.mp4'];

// --- Helper functions ---
function showTitle(title, duration=2.0){
    let t = new visual.TextStim({win, text:title, color:'black', height:50});
    t.draw(); win.flip();
    return new Promise(resolve => setTimeout(resolve, duration*1000));
}

function playMovie(file, startTime=0, stopTime=null, pos=[0,0], size=[960,540], speed=1.0){
    let mov = new visual.MovieStim({win, movie:file, pos:pos, size:size});
    mov.play();
    let start = performance.now();
    return new Promise(resolve=>{
        function frameLoop(){
            let t = ((performance.now()-start)/1000)*speed + startTime;
            if(stopTime && t>=stopTime){
                mov.stop(); resolve();
            } else {
                mov.draw(); win.flip();
                requestAnimationFrame(frameLoop);
            }
        }
        requestAnimationFrame(frameLoop);
    });
}

function askChoice(question, options){
    let t = new visual.TextStim({win, text: question + '\n' + options.map((v,i)=>`${i+1}. ${v}`).join('\n'), color:'black', height:24});
    t.draw(); win.flip();
    return new Promise(resolve=>{
        function checkKeys(){
            let keys = psychoJS.eventManager.getKeys({keyList: options.map((_,i)=>''+(i+1))});
            if(keys.length>0) resolve(keys[0]);
            else requestAnimationFrame(checkKeys);
        }
        checkKeys();
    });
}

function coverArea(pos, size){
    let rect = new visual.Rect({win, width:size[0], height:size[1], fillColor:'black', lineColor:'black', pos:pos});
    for(let i=0;i<6;i++){ rect.draw(); win.flip(); }
}

// --- Main experiment ---
async function experiment(){

    // WELCOME
    let welcome = new visual.TextStim({win, text:`Welcome, ${expInfo.Participant}!\nPress any key to start`, color:'black', height:30});
    welcome.draw(); win.flip();
    await new Promise(resolve=>{ psychoJS.eventManager.waitKeys(); resolve(); });

    // SCENE 1
    await showTitle("REACT");
    await playMovie(videos[0]);
    results.push({video:'scene1', question:'Hazard detection', response:'spacePressed'});

    await showTitle("DECIDE");
    await playMovie(videos[0],0,10);
    let q6 = await askChoice("What do you think will happen next?", ["Driver changes lane","Driver brakes","Animal stops"]);
    let q7 = await askChoice("If you were driving, what would you do next?", ["Brake","Change lane","Use horn"]);
    results.push({video:'scene1', question:'Prediction', response:q6});
    results.push({video:'scene1', question:'Driving response', response:q7});
    await playMovie(videos[0],10);

    await showTitle("RECALL");
    // TODO: Add slider questions here

    // SCENE 2
    await playMovie(videos[1]);
    let c1 = await askChoice("How many vehicles were ahead?", ["None","1–2","3–4","More than 4"]);
    results.push({video:'scene2', question:"Vehicles ahead", response:c1});

    // SCENE 3
    await showTitle("REACT");
    await playMovie(videos[2]);
    results.push({video:'scene3', question:'Hazard detection', response:'spacePressed'});

    await showTitle("DECIDE");
    await playMovie(videos[2],0,7);
    let q1 = await askChoice("What do you think will happen next?", ["Pedestrian causes tuk tuk to slow","Pedestrians run to cross","Pedestrian stops and tuk tuk passes"]);
    await playMovie(videos[2],7,8);
    let q2 = await askChoice("What do you think will happen next?", ["White car passes first","Tuk tuk passes first","Motorbike passes first"]);
    let q3 = await askChoice("If you were driving, what would you do next?", ["Stop","Change to right lane","Use horn"]);
    results.push({video:'scene3', question:'Prediction7s', response:q1});
    results.push({video:'scene3', question:'Prediction8s', response:q2});
    results.push({video:'scene3', question:'Driving response', response:q3});

    await showTitle("RECALL");
    await playMovie(videos[2]);
    // TODO: Add recall questions here

    // COMPARISONS
    await showTitle("COMPARE");

    // Two-video sequential comparison 2x speed
    await playMovie(videos[0],0,null,[-500,0],[500,300],2.0);
    coverArea([-500,0],[500,300]);
    await playMovie(videos[1],0,null,[500,0],[500,300],2.0);
    coverArea([500,0],[500,300]);
    let comp2 = await askChoice("Which video was more complex?\n1=Left 2=Right", ["Left","Right"]);
    results.push({video:'scene1 vs scene2', question:'More complex', response:comp2});

    // Three-video sequential comparison 2x speed
    await playMovie(videos[0],0,null,[-400,0],[360,220],2.0);
    coverArea([-400,0],[360,220]);
    await playMovie(videos[1],0,null,[0,0],[360,220],2.0);
    coverArea([0,0],[360,220]);
    await playMovie(videos[2],0,null,[400,0],[360,220],2.0);
    coverArea([400,0],[360,220]);
    let comp3 = await askChoice("Which video was more complex?\n1=Left 2=Center 3=Right", ["Left","Center","Right"]);
    results.push({video:'all three', question:'Most complex', response:comp3});

    // END
    let thankYou = new visual.TextStim({win, text:"Thank you for participating!\nPress any key to exit", color:'black', height:28});
    thankYou.draw(); win.flip();
    await new Promise(resolve=>{ psychoJS.eventManager.waitKeys(); resolve(); });

    console.log("Results:", results);
}

// Start experiment
psychoJS.schedule(() => experiment());
psychoJS.start();
