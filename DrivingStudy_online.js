// DrivingStudy_online.js
// PsychoJS script converted from your PsychoPy script.
// Keep the videos (scene1.mp4, scene2.mp4, scene3.mp4) in the same folder as index.html

// Expose a start function for index.html
function startExperiment() {
  // create psychoJS instance
  const psychoJS = new PsychoJS({
    debug: true
  });

  // open window
  psychoJS.openWindow({
    fullscr: true,
    color: new util.Color('white'),
    units: 'pix',
    waitBlanking: true
  });

  // experiment info
  let expName = 'DrivingStudy_online';
  let expInfo = {'Participant': ''};

  // schedule experiment initialization and flow
  psychoJS.schedule(psychoJS.gui.DlgFromDict({
    dictionary: expInfo,
    title: expName
  }));

  const flowScheduler = new Scheduler(psychoJS);
  const dialogCancelScheduler = new Scheduler(psychoJS);
  psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

  // main flow
  flowScheduler.add(function() { return updateInfo(); });
  flowScheduler.add(experimentInit);
  // Routines
  flowScheduler.add(welcomeRoutineBegin);
  flowScheduler.add(welcomeRoutineEachFrame);
  flowScheduler.add(welcomeRoutineEnd);

  // SCENE 1
  flowScheduler.add(scene1_reactRoutineBegin);
  flowScheduler.add(scene1_reactRoutineEachFrame);
  flowScheduler.add(scene1_reactRoutineEnd);

  flowScheduler.add(scene1_decideBegin);
  flowScheduler.add(scene1_decideEachFrame);
  flowScheduler.add(scene1_decideEnd);

  flowScheduler.add(scene1_recallLoopBegin);
  flowScheduler.add(scene1_recallLoopScheduler);
  flowScheduler.add(scene1_recallLoopEnd);

  // SCENE 2
  flowScheduler.add(scene2RoutineBegin);
  flowScheduler.add(scene2RoutineEachFrame);
  flowScheduler.add(scene2RoutineEnd);

  flowScheduler.add(scene2_questionsLoopBegin);
  flowScheduler.add(scene2_questionsLoopScheduler);
  flowScheduler.add(scene2_questionsLoopEnd);

  // SCENE 3
  flowScheduler.add(scene3_reactRoutineBegin);
  flowScheduler.add(scene3_reactRoutineEachFrame);
  flowScheduler.add(scene3_reactRoutineEnd);

  flowScheduler.add(scene3_decideBegin);
  flowScheduler.add(scene3_decideEachFrame);
  flowScheduler.add(scene3_decideEnd);

  flowScheduler.add(scene3_recallLoopBegin);
  flowScheduler.add(scene3_recallLoopScheduler);
  flowScheduler.add(scene3_recallLoopEnd);

  // COMPARISON
  flowScheduler.add(compareRoutineBegin);
  flowScheduler.add(compareRoutineEachFrame);
  flowScheduler.add(compareRoutineEnd);

  // THANKS
  flowScheduler.add(thanksRoutineBegin);
  flowScheduler.add(thanksRoutineEachFrame);
  flowScheduler.add(thanksRoutineEnd);

  flowScheduler.add(quitPsychoJS);

  // start
  psychoJS.start({expName, expInfo});

  // -------------------------
  // Utility & state variables
  // -------------------------
  let globalClock;
  let routineTimer;

  // Predeclare visual/stim objects variables
  let welcomeText, welcomeKey;
  let movie1, movie2, movie3;
  let spaceKeyReact, spaceClock;
  let decideMovieClock, decideKey1, decideKey2, decideText;
  let slider, sliderText, sliderKey;
  let loopConditions = [];
  let scene1_recallConditions, scene2_questionsConditions, scene3_recallConditions;
  let compareKey;
  let thanksKey, thanksText;

  // results container (also added to psychoJS.experiment)
  let results = [];

  // ---------- updateInfo ----------
  function updateInfo() {
    // start clocks
    globalClock = new util.Clock();
    routineTimer = new util.CountdownTimer();

    // add a timestamp
    psychoJS.experiment.dataFileName = `${psychoJS.gui.dialogComponent.dialog.title}_${psychoJS.gui.dialogComponent.dialog.components['Participant'].text || 'participant'}`;

    return Scheduler.Event.NEXT;
  }

  // -------------------------
  // experimentInit
  // -------------------------
  function experimentInit() {
    // Create stimuli and components

    // welcome
    welcomeText = new visual.TextStim({
      win: psychoJS.window,
      name: 'welcomeText',
      text: `Welcome, ${psychoJS.gui.dialogComponent.dialog.components['Participant'].text || ''}!\n\nPress any key to start.`,
      font: 'Arial',
      units: undefined,
      pos: [0, 0],
      height: 30,
      wrapWidth: 1200,
      color: new util.Color('black')
    });
    welcomeKey = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

    // Movies
    movie1 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'movie1',
      movie: 'scene1.mp4',
      loop: false,
      size: [960, 540],
      units: 'pix'
    });
    movie2 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'movie2',
      movie: 'scene2.mp4',
      loop: false,
      size: [960, 540],
      units: 'pix'
    });
    movie3 = new visual.MovieStim({
      win: psychoJS.window,
      name: 'movie3',
      movie: 'scene3.mp4',
      loop: false,
      size: [960, 540],
      units: 'pix'
    });

    // React (space press) for scene1
    spaceKeyReact = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
    spaceClock = new util.Clock();

    // Decide routine elements (example: prediction + driving response)
    decideText = new visual.TextStim({
      win: psychoJS.window,
      name: 'decideText',
      text: '',
      font: 'Arial',
      units: undefined,
      pos: [0, 200],
      height: 26,
      wrapWidth: 1000,
      color: new util.Color('black')
    });
    decideKey1 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
    decideKey2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

    // Slider (for recall)
    sliderText = new visual.TextStim({
      win: psychoJS.window,
      name: 'sliderText',
      text: '',
      font: 'Arial',
      units: undefined,
      pos: [0, 200],
      height: 26,
      wrapWidth: 1000,
      color: new util.Color('black')
    });
    slider = new visual.Slider({
      win: psychoJS.window, name: 'slider',
      size: [600, 60], pos: [0, 0],
      ticks: [1,2,3,4,5,6,7],
      labels: ['1','2','3','4','5','6','7'],
      granularity: 1,
      style: 'rating'
    });

    // comparison keys
    compareKey = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

    // thanks screen
    thanksText = new visual.TextStim({
      win: psychoJS.window,
      name: 'thanksText',
      text: 'Thank you for participating!\n\nPress any key to exit.',
      font: 'Arial',
      units: undefined,
      pos: [0, 0],
      height: 28,
      color: new util.Color('black')
    });
    thanksKey = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});

    // Preload movies (so they are available in browser cache)
    // Note: PsychoJS's MovieStim begins loading when first used; this ensures preloading
    movie1.load();
    movie2.load();
    movie3.load();

    return Scheduler.Event.NEXT;
  }

  // ---------- Welcome routine ----------
  let welcomeRoutineComponents;
  function welcomeRoutineBegin() {
    // initialize
    welcomeKey.keys = undefined;
    welcomeKey.rt = undefined;
    welcomeRoutineComponents = [welcomeText, welcomeKey];
    welcomeText.setText(`Welcome, ${psychoJS.gui.dialogComponent.dialog.components['Participant'].text || ''}!\n\nPress any key to start.`);
    // clear events
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function welcomeRoutineEachFrame() {
    // draw welcome text
    welcomeText.draw();
    // detect key press
    let theseKeys = welcomeKey.getKeys({keyList: undefined, waitRelease: false});
    if (theseKeys.length > 0) {
      welcomeKey.keys = theseKeys[0].name;
      welcomeKey.rt = theseKeys[0].rt;
      return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
  }

  function welcomeRoutineEnd() {
    // store any data if needed
    return Scheduler.Event.NEXT;
  }

  // ==========================
  // SCENE 1 REACT (space)
  // ==========================
  let scene1_reactComponents;
  let scene1_hazard_rt = null;
  function scene1_reactRoutineBegin() {
    // reset
    spaceKeyReact.keys = undefined;
    spaceKeyReact.rt = undefined;
    scene1_reactComponents = [movie1, spaceKeyReact];
    // Movie start at 0
    movie1.seek(0.0);
    movie1.play();
    spaceClock.reset();
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function scene1_reactRoutineEachFrame() {
    // We want to allow participants to press SPACE any time during the movie;
    // we'll also implement a safety: stop after full duration if no end_time specified.
    movie1.draw();
    // Poll for keys
    let keys = spaceKeyReact.getKeys({keyList: ['space','escape'], waitRelease: false});
    if (keys.length > 0) {
      // handle escape
      if (keys[0].name === 'escape') {
        psychoJS.experiment.save();
        psychoJS.quit({message: 'User aborted', isCompleted: false});
        return Scheduler.Event.QUIT;
      }
      // record first space
      if (!scene1_hazard_rt && keys[0].name === 'space') {
        scene1_hazard_rt = keys[0].rt;
        // save
        psychoJS.experiment.addData('scene1_hazard_rt', scene1_hazard_rt);
        // stop the movie playback when hazard is detected (match your original)
        movie1.stop();
        return Scheduler.Event.NEXT;
      }
    }
    // If movie finished naturally and freeze_on_end in original was sometimes used,
    // we still proceed to next when movie ends.
    if (movie1.status === visual.FINISHED) {
      return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
  }

  function scene1_reactRoutineEnd() {
    // ensure movie stopped
    try { movie1.stop(); } catch(e){}
    // if no hazard press, store null
    if (!scene1_hazard_rt) {
      psychoJS.experiment.addData('scene1_hazard_rt', 'NA');
    }
    return Scheduler.Event.NEXT;
  }

  // ==========================
  // SCENE 1 DECIDE (play 0-10s, freeze)
  // ==========================
  let scene1_decideComponents;
  let scene1_prediction_rt, scene1_prediction_resp, scene1_driving_rt, scene1_driving_resp;
  function scene1_decideBegin() {
    // prepare the movie segment: play 0–10s and then pause (freeze)
    movie1.seek(0.0);
    movie1.play();
    // schedule a stop after 10s from movie time (we can measure using clock)
    decideMovieClock = new util.Clock();
    decideMovieClock.reset();
    // set text for instructions, will change when presenting questions
    decideText.setText("Press SPACE when you first detect a hazard.");
    scene1_prediction_rt = undefined;
    scene1_prediction_resp = undefined;
    scene1_driving_rt = undefined;
    scene1_driving_resp = undefined;
    scene1_decideComponents = [movie1, decideText, decideKey1, decideKey2];
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function scene1_decideEachFrame() {
    // play the 0–10s segment
    if (decideMovieClock.getTime() < 10.0 && movie1.status !== visual.FINISHED) {
      movie1.draw();
      // flip continues
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      // stop movie (freeze last frame)
      movie1.stop();
      // SHOW Q1 (prediction)
      decideText.setText("What do you think will happen next?\n1. Driver changes lane\n2. Driver brakes\n3. Animal stops\n\nPress 1, 2 or 3");
      decideText.draw();
      let k = decideKey1.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
      if (k.length > 0) {
        if (k[0].name === 'escape') {
          psychoJS.experiment.save();
          psychoJS.quit({message: 'User aborted', isCompleted: false});
          return Scheduler.Event.QUIT;
        }
        scene1_prediction_resp = k[0].name;
        scene1_prediction_rt = k[0].rt;
        psychoJS.experiment.addData('scene1_prediction', scene1_prediction_resp);
        psychoJS.experiment.addData('scene1_prediction_rt', scene1_prediction_rt);
        // Move to next question after a short pause
        // Now ask driving response
        decideText.setText("If you were driving, what would you do next?\n1. Brake\n2. Change lane\n3. Use the horn\n\nPress 1,2 or 3");
        decideText.draw();
        // Wait for response
        let k2 = decideKey2.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
        if (k2.length > 0) {
          if (k2[0].name === 'escape') {
            psychoJS.experiment.save();
            psychoJS.quit({message: 'User aborted', isCompleted: false});
            return Scheduler.Event.QUIT;
          }
          scene1_driving_resp = k2[0].name;
          scene1_driving_rt = k2[0].rt;
          psychoJS.experiment.addData('scene1_driving', scene1_driving_resp);
          psychoJS.experiment.addData('scene1_driving_rt', scene1_driving_rt);
          return Scheduler.Event.NEXT;
        }
      }
      return Scheduler.Event.FLIP_REPEAT;
    }
  }

  function scene1_decideEnd() {
    // After the 10s and the two questions, play the rest of the movie (start at 10s)
    movie1.seek(10.0);
    movie1.play();
    // We will allow it to play until the end - no special waiting here (user saw remainder)
    // Let it finish naturally
    return Scheduler.Event.NEXT;
  }

  // helper to wait till movie ends (used after decide)
  function waitForMovieEnd(mov) {
    let loopClock = new util.Clock();
    loopClock.reset();
    return new Promise((resolve) => {
      function frame() {
        mov.draw();
        if (mov.status === visual.FINISHED) {
          resolve();
          return;
        }
        requestAnimationFrame(frame);
      }
      frame();
    });
  }

  // --------------------------------------
  // SCENE1 RECALL (loop of 5 slider questions)
  // --------------------------------------
  // We'll load the questions from CSV `recall_questions_scene1.csv`
  // expected columns: question,min,max
  let scene1_recallLoop;
  function scene1_recallLoopBegin() {
    // load CSV file via util from PsychoJS - but easier: we'll fetch CSV with AJAX
    return fetch('recall_questions_scene1.csv').then(response => response.text()).then(text => {
      // parse CSV into array of objects
      scene1_recallConditions = csvToObjects(text);
      // schedule each trial
      scene1_recallLoop = new Scheduler(psychoJS);
      for (let i = 0; i < scene1_recallConditions.length; i++) {
        let cond = scene1_recallConditions[i];
        scene1_recallLoop.add(function() {
          // set the question text and tick range
          sliderText.setText(cond.question);
          slider.reset();
          // run a single slider trial
          return sliderTrial(cond);
        });
      }
      // after loop, add next
      return Scheduler.Event.NEXT;
    }).catch(err => {
      console.error('Failed to load recall_questions_scene1.csv', err);
      // continue but no questions
      scene1_recallConditions = [];
      scene1_recallLoop = new Scheduler(psychoJS);
      return Scheduler.Event.NEXT;
    });
  }

  function scene1_recallLoopScheduler() {
    // just run the scheduled trial functions by repeatedly calling them
    if (scene1_recallConditions && scene1_recallConditions.length > 0) {
      // run each scheduled item synchronously (but PsychoJS uses Scheduler normally)
      // We'll implement synchronous sequential execution:
      const loop = scene1_recallLoop;
      return runSchedulerSequential(loop);
    } else {
      return Scheduler.Event.NEXT;
    }
  }

  function scene1_recallLoopEnd() {
    return Scheduler.Event.NEXT;
  }

  // sliderTrial returns a function that does the slider interaction (promise-like)
  function sliderTrial(cond) {
    return new Promise((resolve) => {
      // inner draw loop
      let finished = false;
      function frame() {
        sliderText.draw();
        slider.draw();
        psychoJS.window.flip();
        // We will use space key to confirm rating (like your original)
        let keys = psychoJS.eventManager.getKeys({keyList: ['space','escape']});
        if (keys.length > 0) {
          if (keys[0].name === 'escape') {
            psychoJS.experiment.save();
            psychoJS.quit({message: 'User aborted', isCompleted: false});
            return;
          }
          // store slider rating and RT (PsychoJS slider has getRating())
          let rating = slider.getRating();
          if (rating === undefined || rating === null) {
            // ignore pressing space if no rating made yet
          } else {
            let t = util.getTime();
            psychoJS.experiment.addData('scene1_recall_question', cond.question);
            psychoJS.experiment.addData('scene1_recall_response', rating);
            psychoJS.experiment.addData('scene1_recall_time', t);
            finished = true;
            resolve(Scheduler.Event.NEXT);
            return;
          }
        }
        if (!finished) {
          requestAnimationFrame(frame);
        }
      }
      frame();
    });
  }

  // ===========================
  // SCENE 2 (play full movie and ask multiple choice questions)
  // ===========================
  let scene2Components;
  function scene2RoutineBegin() {
    // Play the movie fully, then show questions loaded from CSV file scene2_questions.csv
    movie2.seek(0.0);
    movie2.play();
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function scene2RoutineEachFrame() {
    // draw movie until finished, then proceed
    if (movie2.status !== visual.FINISHED) {
      movie2.draw();
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      // movie finished, proceed
      return Scheduler.Event.NEXT;
    }
  }

  function scene2RoutineEnd() {
    // stop movie if necessary
    try { movie2.stop(); } catch (e) {}
    return Scheduler.Event.NEXT;
  }

  // scene2 questions loop (multiple choice via keyboard)
  let scene2_questionsLoop;
  function scene2_questionsLoopBegin() {
    return fetch('scene2_questions.csv').then(response => response.text()).then(text => {
      scene2_questionsConditions = csvToObjects(text);
      scene2_questionsLoop = new Scheduler(psychoJS);
      for (let i = 0; i < scene2_questionsConditions.length; i++) {
        let cond = scene2_questionsConditions[i];
        scene2_questionsLoop.add(function() {
          return mcqTrial(cond);
        });
      }
      return Scheduler.Event.NEXT;
    }).catch(err => {
      console.error('Failed to load scene2_questions.csv', err);
      scene2_questionsConditions = [];
      scene2_questionsLoop = new Scheduler(psychoJS);
      return Scheduler.Event.NEXT;
    });
  }

  function scene2_questionsLoopScheduler() {
    if (scene2_questionsConditions && scene2_questionsConditions.length > 0) {
      return runSchedulerSequential(scene2_questionsLoop);
    } else {
      return Scheduler.Event.NEXT;
    }
  }

  function scene2_questionsLoopEnd() {
    return Scheduler.Event.NEXT;
  }

  // ===========================
  // SCENE 3: REACT & DECIDE & RECALL
  // ===========================
  let scene3_reactComponents;
  let scene3_hazard_rt = null;
  function scene3_reactRoutineBegin() {
    spaceKeyReact.keys = undefined;
    spaceKeyReact.rt = undefined;
    movie3.seek(0.0);
    movie3.play();
    scene3_reactComponents = [movie3, spaceKeyReact];
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function scene3_reactRoutineEachFrame() {
    movie3.draw();
    let keys = spaceKeyReact.getKeys({keyList: ['space','escape'], waitRelease: false});
    if (keys.length > 0) {
      if (keys[0].name === 'escape') {
        psychoJS.experiment.save();
        psychoJS.quit({message: 'User aborted', isCompleted: false});
        return Scheduler.Event.QUIT;
      }
      if (!scene3_hazard_rt && keys[0].name === 'space') {
        scene3_hazard_rt = keys[0].rt;
        psychoJS.experiment.addData('scene3_hazard_rt', scene3_hazard_rt);
        movie3.stop();
        return Scheduler.Event.NEXT;
      }
    }
    if (movie3.status === visual.FINISHED) {
      return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
  }

  function scene3_reactRoutineEnd() {
    try { movie3.stop(); } catch(e){}
    if (!scene3_hazard_rt) psychoJS.experiment.addData('scene3_hazard_rt','NA');
    return Scheduler.Event.NEXT;
  }

  // scene3 decide (0-7s and 7-8s segments)
  let scene3_decideComponents;
  let scene3_q1_rt, scene3_q1_resp, scene3_q2_rt, scene3_q2_resp, scene3_q3_rt, scene3_q3_resp;
  function scene3_decideBegin() {
    scene3_decideComponents = [movie3, decideText, decideKey1, decideKey2];
    // First play 0-7s then freeze
    movie3.seek(0.0);
    movie3.play();
    decideMovieClock = new util.Clock();
    decideMovieClock.reset();
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function scene3_decideEachFrame() {
    // 0-7s
    if (decideMovieClock.getTime() < 7.0 && movie3.status !== visual.FINISHED) {
      movie3.draw();
      return Scheduler.Event.FLIP_REPEAT;
    } else if (decideMovieClock.getTime() >= 7.0 && decideMovieClock.getTime() < 8.0) {
      movie3.stop(); // freeze at 7s
      decideText.setText("What do you think will happen next?\n1. Pedestrian causes tuk tuk to slow\n2. Pedestrians run to cross\n3. Pedestrian stops and tuk tuk passes\n\nPress 1,2 or 3");
      decideText.draw();
      let k = decideKey1.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
      if (k.length > 0) {
        if (k[0].name === 'escape') { psychoJS.experiment.save(); psychoJS.quit({message:'User aborted', isCompleted:false}); return Scheduler.Event.QUIT; }
        scene3_q1_resp = k[0].name;
        scene3_q1_rt = k[0].rt;
        psychoJS.experiment.addData('scene3_pred_7s', scene3_q1_resp);
        psychoJS.experiment.addData('scene3_pred_7s_rt', scene3_q1_rt);
        // continue to next small segment (7-8)
      }
      return Scheduler.Event.FLIP_REPEAT;
    } else if (decideMovieClock.getTime() >= 8.0) {
      // 7-8s segment has been shown; now present the next two questions after playing 7-8s and freezing at 8
      // For simplicity, we will show the 7-8s freeze and present questions
      movie3.seek(7.0);
      movie3.play();
      // move to 7-8 playback
      let subClock = new util.Clock();
      subClock.reset();
      // Note: handle synchronous wait for 1 second
      let start = Date.now();
      while (Date.now() - start < 1000) {
        movie3.draw();
      }
      movie3.stop();
      // Now Q at 8s:
      decideText.setText("What do you think will happen next?\n1. White car passes first\n2. Tuk tuk passes first\n3. Motorbike passes first\n\nPress 1,2 or 3");
      decideText.draw();
      psychoJS.window.flip();
      let k2 = decideKey1.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
      if (k2.length > 0) {
        if (k2[0].name === 'escape') { psychoJS.experiment.save(); psychoJS.quit({message:'User aborted', isCompleted:false}); return Scheduler.Event.QUIT; }
        scene3_q2_resp = k2[0].name;
        scene3_q2_rt = k2[0].rt;
        psychoJS.experiment.addData('scene3_pred_8s', scene3_q2_resp);
        psychoJS.experiment.addData('scene3_pred_8s_rt', scene3_q2_rt);
        // driving response after
        decideText.setText("If you were driving, what would you do next?\n1. Stop\n2. Change to right lane\n3. Use the horn\n\nPress 1,2 or 3");
        decideText.draw();
        psychoJS.window.flip();
        let k3 = decideKey2.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
        if (k3.length > 0) {
          if (k3[0].name === 'escape') { psychoJS.experiment.save(); psychoJS.quit({message:'User aborted', isCompleted:false}); return Scheduler.Event.QUIT; }
          scene3_q3_resp = k3[0].name;
          scene3_q3_rt = k3[0].rt;
          psychoJS.experiment.addData('scene3_driving', scene3_q3_resp);
          psychoJS.experiment.addData('scene3_driving_rt', scene3_q3_rt);
          return Scheduler.Event.NEXT;
        }
      }
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  }

  function scene3_decideEnd() {
    // after asking decide questions, play the rest of the movie normally
    movie3.seek(8.0);
    movie3.play();
    return Scheduler.Event.NEXT;
  }

  // scene3 recall loop (multiple choice recall questions)
  function scene3_recallLoopBegin() {
    return fetch('scene3_recall_questions.csv').then(response => response.text()).then(text => {
      scene3_recallConditions = csvToObjects(text);
      scene3_recallLoop = new Scheduler(psychoJS);
      for (let i = 0; i < scene3_recallConditions.length; i++) {
        let cond = scene3_recallConditions[i];
        scene3_recallLoop.add(function() {
          return mcqTrial(cond);
        });
      }
      return Scheduler.Event.NEXT;
    }).catch(err => {
      console.error('Failed to load scene3_recall_questions.csv', err);
      scene3_recallConditions = [];
      scene3_recallLoop = new Scheduler(psychoJS);
      return Scheduler.Event.NEXT;
    });
  }

  function scene3_recallLoopScheduler() {
    if (scene3_recallConditions && scene3_recallConditions.length > 0) {
      return runSchedulerSequential(scene3_recallLoop);
    } else {
      return Scheduler.Event.NEXT;
    }
  }

  function scene3_recallLoopEnd() {
    return Scheduler.Event.NEXT;
  }

  // ===========================
  // COMPARISON section
  // ===========================
  let compareComponents;
  function compareRoutineBegin() {
    // Two-video sequential at 2x speed (we emulate speed by skipping frames via seek increments)
    // For simplicity: play at normal speed but use shortened timing; PsychoJS MovieStim doesn't support speed param
    // We'll play shortened segments to simulate 2x speed (play half of the original duration)
    compareComponents = [movie1, movie2, movie3, compareKey];
    return Scheduler.Event.NEXT;
  }

  function compareRoutineEachFrame() {
    // Play scene1 quickly (seek forward every frame) -- simpler: play from start and stop early
    movie1.seek(0.0);
    movie1.play();
    // play for ~3s (fast preview)
    let start = Date.now();
    while (Date.now() - start < 3000) {
      movie1.draw();
    }
    movie1.stop();
    // cover area effect: draw a black rectangle briefly
    let cover = new visual.Rect({win: psychoJS.window, width: movie1.size[0], height: movie1.size[1], fillColor: 'black', lineColor: 'black', pos: [-250,0]});
    cover.draw(); psychoJS.window.flip();
    // play scene2 quick
    movie2.seek(0.0); movie2.play();
    start = Date.now();
    while (Date.now() - start < 3000) {
      movie2.draw();
    }
    movie2.stop();
    cover.pos = [250,0]; cover.draw(); psychoJS.window.flip();
    // ask which video more complex (Left/Right)
    let question = new visual.TextStim({win: psychoJS.window, text: "Which video was more complex?\n1=Left 2=Right\nPress 1 or 2", height: 28, color: new util.Color('black')});
    question.draw(); psychoJS.window.flip();
    let k = compareKey.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
    if (k.length > 0) {
      if (k[0].name === 'escape') { psychoJS.experiment.save(); psychoJS.quit({message:'User aborted', isCompleted:false}); return Scheduler.Event.QUIT; }
      psychoJS.experiment.addData('compare_1_resp', k[0].name);
      psychoJS.experiment.addData('compare_1_rt', k[0].rt);
      // now three-video sequential
      // play short previews for each of the three
      let positions = [-360, 0, 360];
      for (let i=0; i<3; i++) {
        let mov = (i===0) ? movie1 : (i===1) ? movie2 : movie3;
        mov.seek(0.0); mov.play();
        start = Date.now();
        while (Date.now() - start < 2000) { mov.draw(); }
        mov.stop();
        // brief cover
        let c = new visual.Rect({win: psychoJS.window, width: 360, height:220, fillColor:'black', lineColor:'black', pos: [positions[i],0]});
        c.draw(); psychoJS.window.flip();
      }
      let qtext = new visual.TextStim({win: psychoJS.window, text: "Which video was most complex?\n1=Left 2=Center 3=Right\nPress 1,2 or 3"});
      qtext.draw(); psychoJS.window.flip();
      let k2 = compareKey.getKeys({keyList: ['1','2','3','escape'], waitRelease: false});
      if (k2.length > 0) {
        if (k2[0].name === 'escape') { psychoJS.experiment.save(); psychoJS.quit({message:'User aborted', isCompleted:false}); return Scheduler.Event.QUIT; }
        psychoJS.experiment.addData('compare_3_resp', k2[0].name);
        psychoJS.experiment.addData('compare_3_rt', k2[0].rt);
        return Scheduler.Event.NEXT;
      }
    }
    return Scheduler.Event.FLIP_REPEAT;
  }

  function compareRoutineEnd() {
    return Scheduler.Event.NEXT;
  }

  // ===========================
  // THANKS routine
  // ===========================
  function thanksRoutineBegin() {
    thanksKey.keys = undefined;
    thanksKey.rt = undefined;
    thanksText.setText('Thank you for participating!\n\nPress any key to exit.');
    psychoJS.eventManager.clearEvents();
    return Scheduler.Event.NEXT;
  }

  function thanksRoutineEachFrame() {
    thanksText.draw();
    let keys = thanksKey.getKeys({keyList: undefined, waitRelease: false});
    if (keys.length > 0) {
      return Scheduler.Event.NEXT;
    }
    return Scheduler.Event.FLIP_REPEAT;
  }

  function thanksRoutineEnd() {
    // finalize
    psychoJS.experiment.addData('finished', true);
    return Scheduler.Event.NEXT;
  }

  // -------------------------
  // Utility functions
  // -------------------------
  // Convert CSV text to array of objects (very small CSV parser)
  function csvToObjects(text) {
    let lines = text.trim().split('\n').map(l => l.trim());
    if (lines.length < 2) return [];
    let headers = lines[0].split(',').map(h => h.trim());
    let objs = [];
    for (let i = 1; i < lines.length; i++) {
      let cols = lines[i].split(',').map(c => c.trim());
      if (cols.length === 0 || cols[0] === '') continue;
      let obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = cols[j] || '';
      }
      objs.push(obj);
    }
    return objs;
  }

  // run a scheduler sequentially (simple)
  function runSchedulerSequential(sched) {
    // sched is a Scheduler-like object that stores functions in its queue
    // Our `scene*_loop` are created as Schedulers with functions added using .add(func)
    // But we didn't store those functions in an accessible queue. To keep simple, we'll just iterate
    // This is a best-effort crude runner for our conversion. For complex experiments, PsychoPy Builder export is recommended.
    let queue = sched._components || sched; // fallback
    // If scheduler has an internal list, try to run each
    if (sched._components && sched._components.length > 0) {
      let funcs = sched._components.slice();
      // execute each function synchronously (they may return promises)
      let p = Promise.resolve();
      funcs.forEach(f => { p = p.then(() => f()); });
      return p.then(() => Scheduler.Event.NEXT);
    }
    return Scheduler.Event.NEXT;
  }

  // MCQ trial (multiple choice) - uses cond.question and cond.options (or cond.options as pipe `;` separated)
  function mcqTrial(cond) {
    return new Promise((resolve) => {
      let q = cond.question || '';
      let optStr = cond.options || '';
      // options can be encoded as semicolon-separated: "None;1–2;3–4;More than 4"
      let options = optStr.split(';').map(o => o.trim()).filter(o => o !== '');
      let keysAllowed = [];
      for (let i = 0; i < options.length; i++) keysAllowed.push(String(i+1));
      // build prompt
      let prompt = q + '\n\n';
      for (let i = 0; i < options.length; i++) {
        prompt += `${i+1}. ${options[i]}\n`;
      }
      prompt += '\nPress the number key for your choice.';
      let promptText = new visual.TextStim({win: psychoJS.window, text: prompt, wrapWidth: 1200, height: 24, color: new util.Color('black')});
      promptText.draw();
      psychoJS.window.flip();
      // get keys
      function poll() {
        let ks = psychoJS.eventManager.getKeys({keyList: keysAllowed.concat(['escape']), waitRelease: false});
        if (ks.length > 0) {
          if (ks[0].name === 'escape') {
            psychoJS.experiment.save();
            psychoJS.quit({message:'User aborted', isCompleted:false});
            return;
          }
          let choiceIndex = parseInt(ks[0].name) - 1;
          psychoJS.experiment.addData(cond.question, options[choiceIndex]);
          psychoJS.experiment.addData(cond.question + '_rt', ks[0].rt);
          resolve(Scheduler.Event.NEXT);
          return;
        }
        requestAnimationFrame(poll);
      }
      poll();
    });
  }

  // Run final quit
  function quitPsychoJS() {
    // Save and quit
    psychoJS.experiment.save();
    psychoJS.quit({message: 'The experiment has finished.', isCompleted: true});
    return Scheduler.Event.NEXT;
  }

  // expose csvToObjects for debugging
  window.csvToObjects = csvToObjects;
  window.startExperiment = startExperiment; // re-expose if needed
}
