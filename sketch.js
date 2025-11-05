// Defining variables and arrays
let assets = [];
let scenes = [];
let inp;
let newText;
let newName;

// currentScene is set to 18 because scene 18 is the title screen
let currentScene = 18;

// Button variables for mobile/web support
let buttons = [];
let nameInputSubmitted = false;

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
	// Responsive canvas sizing - scale on mobile, fixed on desktop
	let canvasWidth = 500;
	let canvasHeight = 650;

	if (windowWidth < 600) {
		// Mobile: scale to fit viewport with padding
		const scale = (windowWidth - 20) / 500;
		canvasWidth = windowWidth - 20;
		canvasHeight = 650 * scale;
	}

	createCanvas(canvasWidth, canvasHeight);
	textFont(myFont);
	fill(255, 253, 191);
	textSize(24);
	rectMode(CENTER);

	// Creating the input box
	inp = createInput("");
	inp.position(CENTER);
	inp.size(125, 25);
	inp.style("font-size", "24px");
	inp.style("text-align", "center");
	inp.input(myInputEvent);
}

function draw() {
	// Running all of my scene-drawing and conditional-checking functions. Best practice is to keep what is in the draw function to a minimum!
	sceneDraw();
	isSketchActive();
	isMusicPlaying();
	isTextBoxVisible();
	drawButtons();
}

function keyPressed() {
	// Handle name input submission on Enter
	if (currentScene === 53 && keyCode === ENTER) {
		if (newName && newName.trim() !== "") {
			nameInputSubmitted = true;
			inp.hide();
			backward.play();
			currentScene = scenes[currentScene].nextPages[0];
			return false; // Prevent default behavior
		}
	}

	// Sound for when player switches between scenes (keyboard support)
	if (currentScene !== 53 && scenes[currentScene].keys) {
		if (key == scenes[currentScene].keys[0]) {
			currentScene = scenes[currentScene].nextPages[0];
			forward.play();
		}
		if (key == scenes[currentScene].keys[1]) {
			currentScene = scenes[currentScene].nextPages[1];
			forward.play();
		}
	}

	// Handle title screen - start game with any key
	if (currentScene === 18 && key == "1") {
		currentScene = scenes[currentScene].nextPages[0];
		forward.play();
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

		// Draw text WITH the [1] and [2] markers so players see the numbers
		fill(255, 253, 191);
		textSize(20);
		textAlign(LEFT);
		text(scenes[currentScene].text, 20, 420);
	} else if (currentScene == 18) {
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
		// Focus on input for better UX
		inp.elt.focus();
	}
}

function drawButtons() {
	// Create numbered buttons at bottom of text box
	buttons = [];

	// Don't show buttons during name input or on title screen
	if (currentScene === 53 || currentScene === 18) {
		return;
	}

	if (!scenes[currentScene] || !scenes[currentScene].text) {
		return;
	}

	const numChoices = scenes[currentScene].keys ? scenes[currentScene].keys.length : 0;
	const buttonRadius = 18;
	const buttonGap = 50;
	const startX = 250 - (numChoices > 1 ? buttonGap / 2 : 0); // Center based on number of choices
	const buttonY = 595; // Bottom of text box

	for (let i = 0; i < numChoices; i++) {
		const x = startX + i * buttonGap;
		const pixelSize = 4; // Size of each pixel
		const button = {
			x: x,
			y: buttonY,
			r: buttonRadius,
			pixelSize: pixelSize,
			index: i,
			key: scenes[currentScene].keys[i],
			isHovered: false,
		};

		// Check if mouse is over button (circular hit detection)
		const distance = dist(mouseX, mouseY, button.x, button.y);
		if (distance < button.r + 2) {
			button.isHovered = true;
		}

		buttons.push(button);

		// Draw pixelated circle button (chiptune style)
		push();

		// Button color
		if (button.isHovered) {
			fill(255, 215, 100);
			cursor(HAND);
		} else {
			fill(255, 235, 150);
		}
		noStroke();
		rectMode(CENTER);

		// Draw pixelated circle using small squares
		for (let px = -button.r; px <= button.r; px += button.pixelSize) {
			for (let py = -button.r; py <= button.r; py += button.pixelSize) {
				if (dist(0, 0, px, py) < button.r) {
					rect(button.x + px, button.y + py, button.pixelSize, button.pixelSize);
				}
			}
		}

		// Draw the number
		fill(20, 7, 36);
		textAlign(CENTER, CENTER);
		textSize(26);
		textStyle(BOLD);
		text(button.key, button.x, button.y - 2);

		pop();
	}
}

function removeChoiceMarkers(fullText) {
	// Remove [1], [2], etc. markers but keep the choice text
	return fullText
		.replace(/\[\d+\]\s*/g, "")
		.trim();
}

function extractChoiceText(fullText, choiceIndex) {
	// Extract the choice text from the scene text
	const choices = fullText.split("\n").filter((line) => line.includes("["));
	if (choiceIndex < choices.length) {
		const choice = choices[choiceIndex];
		// Remove the [1] or [2] prefix and return just the text
		return choice.replace(/\[\d+\]\s*/, "").trim();
	}
	return "";
}

function mousePressed() {
	// Handle title screen click - start game
	if (currentScene === 18) {
		// Click anywhere on title screen to start
		currentScene = scenes[currentScene].nextPages[0];
		forward.play();
		return false;
	}

	// Handle pixelated button clicks
	for (let button of buttons) {
		const distance = dist(mouseX, mouseY, button.x, button.y);
		if (distance < button.r + 2) {
			currentScene = scenes[currentScene].nextPages[button.index];
			forward.play();
			return false; // Prevent default behavior
		}
	}
}

function sceneDraw() {
	scenes[0] = {
		text: "Oh, hi.\n\n[1] Hello :)",
		image: assets.smiling_waving,
		keys: ["1"],
		nextPages: [1],
		sound: song,
	};

	scenes[1] = {
		text: "Nice to meet you.\nCan I call you something?\n\n[1] Absolutely.\n\n[2] Uh...sure?",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [53, 53],
		sound: song,
	};

	scenes[3] = {
		text: "Oh yeah...my name.\nI'm Slime Tony, the snail girl.\n\n[1] Snail girl?\n\n[2] Wait, snails talk?",
		image: assets.furrowed_thinking,
		keys: ["1", "2"],
		nextPages: [4, 4],
		sound: song,
	};

	scenes[4] = {
		text: "Yep, I'm a snail person.\nThough many mistake me for a slug.\n\n[1] Why is that? \n\n[2] How? You have a shell...",
		image: assets.sad_normal,
		keys: ["1", "2"],
		nextPages: [7, 7],
		sound: song,
	};

	scenes[7] = {
		text: "Well, I began my life as a slug, but\nnow I'm a snail.\n\n[1] Oh - neat.\n\n[2] Uh-huh...",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [8, 8],
		sound: song,
	};

	scenes[8] = {
		text: "...\n\n[1] How does that even work?\n\n[2] I'm a bit lost...",
		image: assets.furrowed_normal,
		keys: ["1", "2"],
		nextPages: [9, 9],
		sound: song,
	};

	scenes[9] = {
		text: "It's a bit complicated, but I'll try\nto make it make sense.\n\n[1] No worries, take your time.\n\n[2] ...",
		image: assets.sad_normal,
		keys: ["1", "2"],
		nextPages: [10, 10],
		sound: song,
	};

	scenes[10] = {
		text: "When I was growing up, everyone\nthought I was a slug.\n\n[1] So you were a slug?\n\n[2] What do you mean?",
		image: assets.talking_waving,
		keys: ["1", "2"],
		nextPages: [11, 11],
		sound: song,
	};

	scenes[11] = {
		text: "On the outside, I was a slug.\nBut who I was on the outside didn't\nmatch who I was on the inside.\n\n[1] Oh, I see.\n\n[2] I think I'm catching on!",
		image: assets.furrowed_normal,
		keys: ["1", "2"],
		nextPages: [12, 12],
		sound: song,
	};

	scenes[12] = {
		text: "It's a bit complicated, and I appreciate\nyour patience.\n\n[1] No problem, I'm here to listen.\n\n[2] Keep going, I'm interested.",
		image: assets.sad_normal,
		keys: ["1", "2"],
		nextPages: [14, 14],
		sound: song,
	};

	scenes[14] = {
		text: "I just think it can be as simple as\ndiscovering that you're something\neveryone thought you weren't.\n\n[1] Yeah, life is full of surprises.\n\n[2] Everyone's journey is unique.",
		image: assets.smiling_normal,
		keys: ["1", "2"],
		nextPages: [17, 17],
		sound: song,
	};

	scenes[17] = {
		text: "Right on. It's all about being true to\nyourself.\n\n[1] (Keep listening...)\n\n[2] True that.",
		image: assets.smiling_normal,
		keys: ["1", "2"],
		nextPages: [20, 20],
		sound: song,
	};

	scenes[20] = {
		text: "Slug clothes, slug activities... it just\nwasn't me.\n\n[1] Sounds frustrating.\n\n[2] I understand.",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [21, 21],
		sound: song,
	};

	scenes[21] = {
		text: "Deeper than that, though... I hated\nbeing seen as a slug.\n\n[1] Must have been tough.\n\n[2] I'm sorry to hear that.",
		image: assets.talking_waving,
		keys: ["1", "2"],
		nextPages: [23, 23],
		sound: song,
	};

	scenes[23] = {
		text: "You get it. It's about finding your\nplace.\n\n[1] You've got this!\n\n[2] I believe in you.",
		image: assets.talking_waving,
		keys: ["1", "2"],
		nextPages: [26, 26],
		sound: song,
	};

	scenes[26] = {
		text: "You're an awesome listener.\n\n[1] About your shell...\n\n[2] Your shell?",
		image: assets.smiling_normal,
		keys: ["1", "2"],
		nextPages: [27, 27],
		sound: song,
	};

	scenes[27] = {
		text: "Huh...?\n\n[1] You weren't born with it...?\n\n[2] Slugs aren't born with shells,\nright?",
		image: assets.sad_normal,
		keys: ["1", "2"],
		nextPages: [28, 28],
		sound: song,
	};

	scenes[28] = {
		text: "Oh, absolutely not.\n\n[1] (Keep listening...)",
		image: assets.furrowed_thinking,
		keys: ["1"],
		nextPages: [29],
		sound: song,
	};

	scenes[29] = {
		text: "Yeah, wasn't born with this shell,\nbut it's mine, you know?\n\n[1] That's cool!\n\n[2] Right on, dude.",
		image: assets.furrowed_thinking,
		keys: ["1", "2"],
		nextPages: [30, 30],
		sound: song,
	};

	scenes[30] = {
		text: "It's all about making it yours.\n\n[1] Why the change, though?\n\n[2] Do you think you needed a shell?",
		image: assets.smiling_normal,
		keys: ["1", "2"],
		nextPages: [32, 32],
		sound: song,
	};

	scenes[32] = {
		text: "This whole shell thing... It's more than\njust wanting it.\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [33],
		sound: song,
	};

	scenes[33] = {
		text: "It's about making decisions. Decisions\nthat made me more comfortable in my\nskin.\n\n[1] (Keep listening...)",
		image: assets.talking_normal,
		keys: ["1"],
		nextPages: [34],
		sound: song,
	};

	scenes[34] = {
		text: "That made me...me.\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [42],
		sound: song,
	};

	scenes[42] = {
		text: "But sometimes when I look at myself...\n\n[1] (Keep listening...)",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [43],
		sound: song,
	};

	scenes[43] = {
		text: "I see... a slug with a snail shell.\n\n[1] It's not like that.\n\n[2] Don't beat yourself up.",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [44, 44],
		sound: song,
	};

	scenes[44] = {
		text: "You're right...\n\n[1] (Keep listening...)",
		image: assets.sad_normal,
		keys: ["1"],
		nextPages: [45],
		sound: song,
	};

	scenes[45] = {
		text: "Thank you.\n\n[1] Don't mention it.\n\n[2] Happy to help.",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [46, 46],
		sound: song,
	};

	scenes[46] = {
		text:
			"Hey " +
			newName +
			", even if you don't fully\nget me, you respect my situation.\n\n[1] I sure do!\n\n[2] It's the least I could do.",
		image: assets.smiling_waving,
		keys: ["1", "2"],
		nextPages: [48, 48],
		sound: song,
	};

	scenes[48] = {
		text: "Yeah...\n\n[1] (Keep listening...)",
		image: assets.furrowed_normal,
		keys: ["1"],
		nextPages: [50],
		sound: song,
	};

	scenes[50] = {
		text: "Oh.\nLook at the time. I should probably get\ngoing.\n\n[1] Oh, really?\n\n[2] Woops.",
		image: assets.talking_waving,
		keys: ["1", "2"],
		nextPages: [51, 51],
		sound: song,
	};

	scenes[51] = {
		text: "Yeah, sorry...\nSnails got snail things to do.\n\n[1] Fair enough!\n\n[2] Rock on, dude.",
		image: assets.talking_normal,
		keys: ["1", "2"],
		nextPages: [52, 52],
		sound: song,
	};

	// Bill and Ted moment lol.
	scenes[52] = {
		text:
			"Carry on, " +
			newName +
			"!\n\nAnd be excellent to everyone.\n\n[1] (Return to title)",
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
		text: "Awesome, let's hear it.\n\n(Type your name and hit ENTER)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [54],
		sound: song,
	};

	scenes[54] = {
		text: newName + "...\n\nCool.\n\n[1] (Keep listening...)",
		image: assets.smiling_normal,
		keys: ["1"],
		nextPages: [3],
		sound: song,
	};
}
