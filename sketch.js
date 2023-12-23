// Defining variables and arrays
let assets = [];
let scenes = [];
let inp;
let newText;
let newName;

// currentScene is set to 18 because scene 18 is the title screen
let currentScene = 18;

function preload() {
	// Preloading all my assets

	assets.furrowed_normal = loadImage("./assets/furrowed_normal.gif");

	assets.furrowed_thinking = loadImage("./assets/furrowed_thinking.gif");

	assets.sad_normal = loadImage("./assets/sad_normal.gif");

	assets.smiling_normal = loadImage("./assets/smiling_normal.gif");

	assets.smiling_waving = loadImage("./assets/smiling_waving.gif");

	assets.talking_waving = loadImage("./assets/talking_waving.gif");

	assets.talking_normal = loadImage("./assets/talking_normal.gif");

	assets.talking_thinking = loadImage("./assets/talking_thinking.gif");

	assets.titlescreen = loadImage("./assets/titlescreen.gif");

	assets.noImage = loadImage("./assets/noImage.jpg");

	bg = loadImage("./assets/pattern.jpg");

	// Font by Toby Fox. (Safe to use with credit.)
	myFont = loadFont("./DeterminationMonoWeb.ttf");

	// Song by jhaeka on itch.io. (Safe to use with credit.)
	song = loadSound("./Warmth.ogg");

	// Sounds by noahkuehne on itch.io (Safe to use with credit.)
	forward = loadSound("./Backwards.mp3");
	backward = loadSound("./Forward.mp3");
}

function setup() {
	createCanvas(500, 600);
	textFont(myFont);
	fill(255, 253, 191);
	textSize(24);
	rectMode(CENTER);

	// Creating the input box
	inp = createInput("");
	inp.position(CENTER);
	inp.size(125, 25);
	inp.style("font-size", "24px");
	inp.input(myInputEvent);
}

function draw() {
	// Running all of my scene-drawing and conditional-checking functions. Best practice is to keep what is in the draw function to a minimum!
	sceneDraw();
	isSketchActive();
	isMusicPlaying();
	isTextBoxVisible();
}

function keyPressed() {
	// Sound for when player switches between scenes.
	if (key == scenes[currentScene].keys[0]) {
		currentScene = scenes[currentScene].nextPages[0];
		forward.play();
	}
	if (key == scenes[currentScene].keys[1]) {
		currentScene = scenes[currentScene].nextPages[1];
		forward.play();
	}

	// Sound for when player enters their name. Hides the input box afterwards and logs the name to the console.
	if (keyCode === ENTER) {
		console.log(inp);
		console.log(newName);
		inp.hide();
		backward.play();
	}
}

function isSketchActive() {
	// If it isn't the title screen...then don't display the title screen. If it is...display the title screen and have no text box.
	if (currentScene != 18) {
		background(bg);
		image(scenes[currentScene].image, 100, 30, 330, 411.5);

		push();
		strokeWeight(8);
		stroke(224, 160, 80);
		fill(20, 7, 36);
		rect(250, 500, 500, 250, 20);
		pop();

		text(scenes[currentScene].text, 10, 405);
	} else if (currentScene != 53) {
		push();
		background(bg);
		image(scenes[currentScene].image, 0, 30, 500, 500);
		fill(0);
		text(scenes[currentScene].text, 150, 525);
		pop();
	}
}

function isMusicPlaying() {
	// Added music to make things way less boring.
	if (scenes[currentScene].sound && !scenes[currentScene].sound.isPlaying()) {
		scenes[currentScene].sound.play();
	}
}

function myInputEvent() {
	newName = this.value();
}

function isTextBoxVisible() {
	// Hides the text box when the user isn't inputting their name.

	if (currentScene != 53) {
		inp.hide();
	} else {
		inp.show();
	}
}

function sceneDraw() {
	scenes[0] = {
		text: "Shell-om!\n\n[1] Shalom...?",
		image: assets.smiling_waving,
		keys: ["1"],
		nextPages: [1],
		sound: song,
	};

	scenes[1] = {
		text: "Haha, nice to meet you.\nIf you're cool with it, could I get\na name for you?\n\n[1] Heck yeah.",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [53],
		sound: song,
	};

	scenes[3] = {
		text: "We snail people don't really use names \nmuch, but I'll try.\n\n[1] Snail people?\n\n[2] Wait, snails can talk?",
		image: assets.furrowed_thinking,
		keys: ["1", "2"],
		nextPages: [4, 5],
		sound: song,
	};

	scenes[4] = {
		text: "Yeah, I'm a snail person!\nTo be honest, a lot of people\nthink I'm a slug person, though.\n\n[1] There are slug people too?",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [6],
		sound: song,
	};

	scenes[5] = {
		text: "Yup!\nBoth snail and slug people communicate\nthe same as you humans.\n\n[1] There are slug people too?",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [6],
		sound: song,
	};

	scenes[6] = {
		text: "Heck yeah there are. What a wonderful\nworld we live in, right?\n\n[1] Are slugs and snails different?",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [7],
		sound: song,
	};

	scenes[7] = {
		text: "Kind of...but not really?\nYou see, I was born a slug...but I'm\nactually a snail!\n\n[1] Wowie!",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [8],
		sound: song,
	};

	scenes[8] = {
		text: "...!\n\n[1] How does...that work?",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [9],
		sound: song,
	};

	scenes[9] = {
		text: "Ahah, um...\nThat's a bit complicated!\n\n[1] Sorry!",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [10],
		sound: song,
	};

	scenes[10] = {
		text: "No no!\nI'm happy to explain, if you're willing\nto listen.\n\n[1] Sure thing, dude.",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [11],
		sound: song,
	};

	scenes[11] = {
		text: "Lets see...\n\n[1] (Keep listening...)",
		image: assets.furrowed_thinking,
		keys: ["1"],
		nextPages: [12],
		sound: song,
	};

	scenes[12] = {
		text: "I guess that when I was growing up,\neveryone including myself thought that\nI was a slug.\n\n[1] So you were a slug?",
		image: assets.talking_thinking,
		keys: ["1"],
		nextPages: [13],
		sound: song,
	};

	scenes[13] = {
		text: "No, no.\nI was never a slug, it just...took me a\nwhile.\n\n[1] What do you mean?",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [14],
		sound: song,
	};

	scenes[14] = {
		text: "Sorry, I know this is complicated. You\nreally don't need to feel pressured to\ntry to understand me.\n\n[1] (Keep listening...)",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [15],
		sound: song,
	};

	scenes[15] = {
		text: "I just think...\nIt can be as simple as discovering\nthat you're something everybody thought\nthat you weren't.\n\n[1] (Keep listening...)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [16],
		sound: song,
	};

	scenes[16] = {
		text: "Maybe even back then, I thought I\nwasn't this way either.\n\n[1] Like...you were okay with it?",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [17],
		sound: song,
	};

	scenes[17] = {
		text: "Not really...\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [19],
		sound: song,
	};

	scenes[19] = {
		text: "I wasn't interested in the same things\nthat other slugs were.\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [20],
		sound: song,
	};

	// "I'm not like other girls" moment.
	scenes[20] = {
		text: "Wearing slug clothes, doing slug things!\nI hated that so much but...\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [21],
		sound: song,
	};

	scenes[21] = {
		text: "But its deeper than that...\nMost importantly, I hated being seen as \na slug.\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [22],
		sound: song,
	};

	scenes[22] = {
		text: "You can be honest.\nIs this making any sense to you?\n\n[1] I think so.\n\n[2] You kind of lost me...",
		image: assets.sad_normal,
		keys: ["1", "2"],
		nextPages: [24, 25],
		sound: song,
	};

	scenes[24] = {
		text: "Really...!\n\n[1] Yeah, I'm catching on!",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [26],
		sound: song,
	};

	scenes[25] = {
		text: "That's all good, dude.\n\nSeriously, thanks for bearing with me\nanyways.\n\n[1] No problemo.",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [26],
		sound: song,
	};

	scenes[26] = {
		text: "Thanks so much, really!\nYou're a good listener.\n\n[1] About your shell...",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [27],
		sound: song,
	};

	scenes[27] = {
		text: "Huh...?\n\n[1] You weren't born with it...?",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [28],
		sound: song,
	};

	scenes[28] = {
		text: "Oh!!\nYeah. Definitely not.\n\n[1] (Keep listening...)",
		image: assets.furrowed_thinking,
		keys: ["1"],
		nextPages: [29],
		sound: song,
	};

	scenes[29] = {
		text: "But just because I wasn't born\nwith this shell doesn't make it any\nless mine.\n\nYou know?\n\n[1] I know.",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [30],
		sound: song,
	};

	scenes[30] = {
		text: "Haha...\nYeah, you know.\n\n[1] Does it make it easier?",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [31],
		sound: song,
	};

	scenes[31] = {
		text: "YES. Dude.\nSo much easier.\n\n[1] (Keep listening...)",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [32],
		sound: song,
	};

	scenes[32] = {
		text: "This whole thing...\nIt's so much more than me WANTING a\nshell!\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [33],
		sound: song,
	};

	scenes[33] = {
		text: "I never necessarily wanted a shell...\nBut...\nPeople calling me a snail...\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [34],
		sound: song,
	};

	scenes[34] = {
		text: "If I didn't look the part...\n\n[1] (Keep listening...)",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [35],
		sound: song,
	};

	scenes[35] = {
		text: "It makes me feel...\n\n[1] (Keep listening...)",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [36],
		sound: song,
	};

	// Gender dysphoria moment.
	scenes[36] = {
		text: "Wrong...\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [37],
		sound: song,
	};

	scenes[37] = {
		text: "Don't get me wrong.\nThis is who I am.\n\n[1] (Keep listening...)",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [38],
		sound: song,
	};

	scenes[38] = {
		text: "I just wish I didn't have to make the\ncut to be given the treatment I deserve.\n\n[1] Would it help if people asked?",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [39],
		sound: song,
	};

	scenes[39] = {
		text: "What?\n\n[1] Like, if they're unsure!",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [40],
		sound: song,
	};

	scenes[40] = {
		text: "Honestly...\nNot really.\n\n[1] How so?",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [41],
		sound: song,
	};

	scenes[41] = {
		text: "I think I would just feel singled out.\nAlmost as if they could tell, you know!\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [42],
		sound: song,
	};

	scenes[42] = {
		text: "And, and sometimes when I look at\nmyself...\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [43],
		sound: song,
	};

	scenes[43] = {
		text: "I see...\n\nA slug with a snail shell.\n\n[1] It's not like that.",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [44],
		sound: song,
	};

	scenes[44] = {
		text: "Yeah.\n\n[1] (Keep listening...)",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [45],
		sound: song,
	};

	scenes[45] = {
		text: "You're right...\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [46],
		sound: song,
	};

	scenes[46] = {
		text: "Thanks for snapping me out of that.\n\n[1] Don't mention it.",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [47],
		sound: song,
	};

	scenes[47] = {
		text: "Hey.\nEven if you don't understand me, you\nobviously have grown to respect my \nsituation.\n\n[1] (Keep listening...)",
		image: assets.smiling_waving,
		keys: ["1"],
		nextPages: [48],
		sound: song,
	};

	scenes[48] = {
		text: "I think...\nThat's all people need to do.\n\n[1] Right on!",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [49],
		sound: song,
	};

	scenes[49] = {
		text: "Yeah...\n\n[1] (Keep listening...)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [50],
		sound: song,
	};

	scenes[50] = {
		text: "Oh!\nLook at the time! I should probably get\ngoing.\n\n[1] Oh, really?",
		image: assets.talking_waving,
		keys: ["1"],
		nextPages: [51],
		sound: song,
	};

	scenes[51] = {
		text: "Yeah, sorry...\nSnails got snail things to do.\n\n[1] Fair enough!",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [52],
		sound: song,
	};

	// Bill and Ted moment lol.
	scenes[52] = {
		text:
			"Haha!\nCarry on, " +
			newName +
			"!\n\nAnd be excellent to everyone!\n\n[1] (Return to title)",
		image: assets.smiling_waving,
		keys: ["1"],
		nextPages: [18],
		sound: song,
	};

	scenes[18] = {
		text: "",
		image: assets.titlescreen,
		keys: ["1"],
		nextPages: [0],
		sound: song,
	};

	scenes[53] = {
		text: "Awesome, lay it on me!\n\n(Hit ENTER, and then [1] to submit your\nname.)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [54],
		sound: song,
	};

	scenes[54] = {
		text: newName + "...\n\nHow cool!\n\n[1] (Keep listening...)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [3],
		sound: song,
	};
}
