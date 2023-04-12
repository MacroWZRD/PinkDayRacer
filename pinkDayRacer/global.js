// ---------------------------------------------------------
// Global Constants
// ---------------------------------------------------------

// screen scize
const SCREEN_W = 1920;
const SCREEN_H = 1080;

// coordinates of the screen center
const SCREEN_CX = SCREEN_W/2;
const SCREEN_CY = SCREEN_H/2;

// game states
const STATE_INIT = 1;
const STATE_MENU = 2;
const STATE_LEADERBOARD = 3;
const STATE_RESTART = 4;
const STATE_PLAY = 5;
const STATE_GAMEOVER = 6;

// sprites
const PLAYER = 0;
//First two are depression, second two are anxiety and the last 2 are sabotager's
const SCENARIOS = [[[2,], " \
Your friend is just recovering from a break-up, now their ex\n \
is posting defamatory things on social media. Now you notice\n \
that they are worse. They're always sad, listening to \n \
depressing songs, always putting themselves down, and now \n \
you notice cuts on their arms. What do you do?", 
"Tell them to get over it,\nand ditch them!", 
"Tell them to stop being a baby!",
"Listen to them and give them advice!"],
                   [[0, 1], " \
You were rejected by your crush, your favorite University,\n \
your parents don't love you anymore. You are a failure; how\n \
do you handle your cope with your depressing situation.", 
"Try and improve yourself (Workout, study,\nmake your parents proud, etc.)",
"Go to therapy to learn to cope\nwith your emotions.",
"Blame everybody, everything, and go on\na rampage!"
],
                   [[0,], " \
Your friend has a big project coming up, he has asked you\n \
to help him with it. You are busy yourself, but you want to\n \
 help your friend. What should you do?",
"Help your friend!",
"Be selfish!",
"Ignore your friend and stop talking to them!"
],
                   [[1,]," \
It's the beginning of semester 1, you not only have Functions\n \
, Physics, Biology, and Chemistry. You thought you were ready,\n \
but now you have the hardest marker for Biology, an accent \n \
heavy and lazy teacher for Functions, and they all have a \n \
tremendous workload. You're getting more anxious by the day.\n \
1 month in, you're burnt out, and you're failed one of your\n \
 tests. What do you do?",
"Try to get through it, you don’t want\npeople to think your stupid!",
"Ask your guidance counselor about your\noptions to swap classes for something\neasier in your 2nd semester",
"Flunk all your classes and blame it on\nyour teachers"
],
                   [[0, 2], " \
You see a classmate of yours getting\n \
picked on, what do you do?",
"Stand up for your classmate!",
"Ignore it, it’ll pass.",
"Tell a teacher!",
],
                   [[0,], " \
For a while now, you have been getting bullied by a group of\n \
older kids, you’re verbally bullied, physically too. You feel\n \
anxious when you’re alone in public, not knowing if they’ll\n \
find you. What do you do?",
"Tell a trusted family member\n, friend, or teacher!",
"You’ll get through it, you don’t need\nanybody to know you’re weak, and tell\n them that you need help.",
"Pick a fight with the bullies!"
]];

// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------

var state = STATE_INIT;
