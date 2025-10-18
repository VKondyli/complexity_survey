from psychopy import visual, core, event, gui
from psychopy.visual import MovieStim, Slider, TextStim, Rect
import csv
from datetime import datetime

# ---------- CONFIG ----------
win = visual.Window([1280, 720], color="white", units="pix")
font_name = "Arial"
text_color = "black"

video_files = ["scene1.mp4", "scene2.mp4", "scene3.mp4"]

# ---------- PARTICIPANT ----------
info = {"Participant": ""}
dlg = gui.DlgFromDict(info, title="Driving Scene Study")
if not dlg.OK:
    core.quit()
participant_id = info["Participant"]

# ---------- HELPER FUNCTIONS ----------
def show_title(title):
    """Display a section title slide."""
    t = TextStim(win, text=title, color=text_color, font=font_name, height=50)
    t.draw(); win.flip(); event.waitKeys()

def play_video_segment(file, start_time=0, end_time=None, pos=(0,0), size=(960,540), speed=1.0, stop_on_space=False, freeze_on_end=False):
    """Play a video segment. Optionally record space press time and freeze last frame."""
    mov = MovieStim(win, filename=file, size=size, pos=pos)
    mov.seek(start_time)
    mov.play()
    clock = core.Clock()
    detected = None
    dur = (end_time - start_time) if end_time else mov.duration
    frame_time = 1/30.0 / speed  # 30fps baseline, scaled by speed
    while clock.getTime() < dur and mov.status != visual.FINISHED:
        mov.draw()
        win.flip()
        keys = event.getKeys(timeStamped=clock)
        for k,t in keys:
            if k == 'escape':
                core.quit()
            if stop_on_space and not detected and k == 'space':
                detected = t
        core.wait(frame_time)
    mov.stop()
    if freeze_on_end:
        mov.draw()
        win.flip()
    return detected

def ask_slider(question, min_val=1, max_val=7):
    txt = TextStim(win, text=question, height=26, pos=(0,200), color=text_color,
                   wrapWidth=1000, font=font_name)
    slider = Slider(win, ticks=list(range(min_val, max_val+1)),
                    labels=[str(i) for i in range(min_val, max_val+1)],
                    style='rating', pos=(0,0), size=(600,60),
                    granularity=1, color=text_color,
                    lineColor=text_color, labelColor=text_color,
                    markerColor="black")
    while True:
        txt.draw(); slider.draw(); win.flip()
        keys = event.getKeys()
        if 'escape' in keys: core.quit()
        if 'space' in keys and slider.getRating() is not None:
            return slider.getRating(), core.getTime()

def ask_choice(question, options):
    q_text = question + "\n\n" + "\n".join([f"{i+1}. {opt}" for i,opt in enumerate(options)])
    txt = TextStim(win, text=q_text, height=24, wrapWidth=1000,
                   color=text_color, font=font_name)
    txt.draw(); win.flip()
    valid = [str(i+1) for i in range(len(options))]
    keys = event.waitKeys(keyList=valid+['escape'])
    for k in keys:
        if k == 'escape': core.quit()
        return options[int(k)-1], core.getTime()

def cover_area(pos, size):
    rect = Rect(win, width=size[0], height=size[1], fillColor="black", lineColor="black", pos=pos)
    for _ in range(6): rect.draw(); win.flip()
    core.wait(0.3)

# ---------- START ----------
TextStim(win, text=f"Welcome, {participant_id}!\n\nPress any key to start.",
         height=30, color=text_color, font=font_name).draw()
win.flip(); event.waitKeys()

results = []

# =====================================================
# SCENE 1
# =====================================================
show_title("REACT")
TextStim(win, text="Press the SPACE button when you first detect a hazard.",
         height=28, color=text_color, font=font_name).draw()
win.flip(); event.waitKeys()
hazard_time = play_video_segment(video_files[0], stop_on_space=True)
results.append({"video":"scene1","question":"Hazard detection time","response":hazard_time,"rt":hazard_time})

show_title("DECIDE")
# Play until 10s
play_video_segment(video_files[0], start_time=0, end_time=10, freeze_on_end=True)
q6 = ask_choice("What do you think will happen next?",
                ["Driver changes lane","Driver brakes","Animal stops"])
q7 = ask_choice("If you were driving, what would you do next?",
                ["Brake","Change lane","Use the horn"])
results += [
    {"video":"scene1","question":"Prediction","response":q6[0],"rt":q6[1]},
    {"video":"scene1","question":"Driving response","response":q7[0],"rt":q7[1]}
]
# Continue rest
play_video_segment(video_files[0], start_time=10)

show_title("RECALL")
questions_v1 = [
    ("How visually complex was this driving scene?\n1 = Very simple, 7 = Extremely complex",1,7),
    ("How organized or structured did the environment appear?\n1 = Very disorganized, 7 = Highly structured",1,7),
    ("How predictable were the movements and events?\n1 = Very unpredictable, 7 = Highly predictable",1,7),
    ("How cluttered did the scene appear?\n1 = Not cluttered, 7 = Extremely cluttered",1,7),
    ("How dynamic was the motion in this scene?\n1 = Static, 7 = Very dynamic",1,7)
]
for q,a,b in questions_v1:
    r,rt = ask_slider(q,a,b)
    results.append({"video":"scene1","question":q,"response":r,"rt":rt})


# =====================================================
# SCENE 3
# =====================================================
show_title("REACT")
TextStim(win, text="Press the SPACE button when you first detect a hazard.",
         height=28, color=text_color, font=font_name).draw()
win.flip(); event.waitKeys()
hazard_time3 = play_video_segment(video_files[2], stop_on_space=True)
results.append({"video":"scene3","question":"Hazard detection time","response":hazard_time3,"rt":hazard_time3})

show_title("DECIDE")
# 0–7s
play_video_segment(video_files[2], start_time=0, end_time=7, freeze_on_end=True)
q1 = ask_choice("What do you think will happen next?",
                ["Pedestrian causes tuk tuk to slow","Pedestrians run to cross","Pedestrian stops and tuk tuk passes"])
results.append({"video":"scene3","question":"Prediction @7s","response":q1[0],"rt":q1[1]})
# 7–8s
play_video_segment(video_files[2], start_time=7, end_time=8, freeze_on_end=True)
q2 = ask_choice("What do you think will happen next?",
                ["White car passes first","Tuk tuk passes first","Motorbike passes first"])
q3 = ask_choice("If you were driving, what would you do next?",
                ["Stop","Change to right lane","Use the horn"])
results += [
    {"video":"scene3","question":"Prediction @8s","response":q2[0],"rt":q2[1]},
    {"video":"scene3","question":"Driving response","response":q3[0],"rt":q3[1]}
]

show_title("RECALL")
play_video_segment(video_files[2])
recall_questions = [
("How many vehicles were ahead of you?",["None","1–2","3–4","More than 4"]),
("How many pedestrians were in the scene?",["None","1–2","3–4","More than 4"]),
("How many motorbikes were in the scene?",["None","1–2","3–4","More than 4"]),
("How many tuk tuks were in the scene?",["None","1–2","3–4","More than 4"]),
("How many umbrellas were in the scene?",["None","1–2","3–4","More than 4"]),
("How many food stands were in the scene?",["None","1–2","3–4","More than 4"]),
("How many buses were in the scene?",["None","1–2","3–4","More than 4"]),
("How many motorbikes entered from the left?",["None","1–2","3–4","More than 4"]),
("How many motorbikes entered from the right?",["None","1–2","3–4","More than 4"]),
("What vehicle did you overtake?",["None","Car","Van","Tuk tuk"]),
("What did the pedestrians do at the end?",["Walking slowly","Standing still","Running across","Walking on sidewalk"]),
("How many lanes did the road have?",["2","4","6"]),
("Color of car in front at end?",["Green","Black","Red","White"]),
("From which direction did the tuk tuk come?",["Left","Right","Behind"]),
("How many pedestrians crossd from left to right?",["None","1","2","3"]),
("How many pedestrians crossed from right to left?",["None","1","2","3"]),
("From where did pedestrian cross the tuk tuk?",["Front","Behind","No interaction"]),
("From where did the pedestrians cross the white car?",["Front","Behind","No interaction"])
]
for q,opts in recall_questions:
    c,rt=ask_choice(q,opts)
    results.append({"video":"scene3","question":q,"response":c,"rt":rt})

# =====================================================
# COMPARISON SECTION
# =====================================================
show_title("COMPARE")

# --- Two-video sequential, 2× speed ---
gap, vidw, vidh = 40, 500, 300
lx, rx = -(vidw/2+gap/2), (vidw/2+gap/2)
play_video_segment(video_files[0], pos=(lx,0), size=(vidw,vidh), speed=2.0)
cover_area((lx,0), (vidw,vidh))
play_video_segment(video_files[1], pos=(rx,0), size=(vidw,vidh), speed=2.0)
cover_area((rx,0), (vidw,vidh))
qc,rt = ask_choice("Which video was more complex?\n1=Left 2=Right",["Left","Right"])
results.append({"video":"scene1 vs scene2","question":"More complex","response":qc,"rt":rt})

# --- Three-video sequential, 2× speed ---
gap, vidw, vidh = 40, 360, 220
positions = [(-vidw-gap,0),(0,0),(vidw+gap,0)]
for i in range(3):
    play_video_segment(video_files[i], pos=positions[i], size=(vidw,vidh), speed=2.0)
    cover_area(positions[i], (vidw,vidh))
q3c,rt = ask_choice("Which video was more complex?\n1=Left 2=Center 3=Right",["Left","Center","Right"])
results.append({"video":"scene1 vs scene2 vs scene3","question":"Most complex","response":q3c,"rt":rt})

# ---------- END ----------
TextStim(win, text="Thank you for participating!\n\nPress any key to exit.",
         height=28, color=text_color, font=font_name).draw()
win.flip(); event.waitKeys()

# ---------- SAVE ----------
fname = f"{participant_id}_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
import csv
with open(fname, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["video","question","response","rt"])
    writer.writeheader()
    [writer.writerow(r) for r in results]
print(f"Saved → {fname}")
win.close(); core.quit()
