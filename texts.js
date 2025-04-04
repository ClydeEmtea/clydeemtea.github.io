const not = "bash: ";
const found = ": command not found...";

const invalid = ": invalid parameters: ";
const params = " parameters not allowed...";

const delay = 100;

const help = {
    banner: "Displays the banner.",
    help: "Lists all available commands.",
    whoami: "Displays information about you.",
    username: "Takes parameter: username. Sets your username.",
    whois: "Displays information about the creator of this page.",
    contact: "Displays contact information.",
    github: "Displays GitHub profile link.",
    clear: "Clears the terminal screen.",
};

const whois = [
    "My name is Milan Tuček, and I am a young developer from the Czech Republic.",
    "I am currently studying at the Gymnázium, Praha 6, Arabská 14.",
    "I have experience in web development: HTML, CSS, JavaScript, TypeScript, PHP and various front-end and back-end frameworks.",
    "I also have experience with Java, Python, C++ or Golang.",
    "I enjoy learning new technologies and improving my skills.",
    "Feel free to reach out if you have any questions or would like to connect!",
]

const contact = [
    "Email: emtea@clyde.cz",
]

const github = [
    "https://github.com/clydeemtea",
]

const banner = [
    " ____       ___                   __              ____                    __                        ",
    "/\\  _`\\    /\\_ \\                 /\\ \\            /\\  _`\\                 /\\ \\__                     ",
    "\\ \\ \\/\\_\\  \\\\/\\ \\     __  __     \\_\\ \\      __   \\ \\ \\L\\_\\    ___ ___    \\ \\ ,_\\     __      __     ",
    " \\ \\ \\/_/_   \\ \\ \\   /\\ \\/\\ \\    /'_` \\   /'__`\\  \\ \\  _\\L  /' __` __`\\   \\ \\ \\/   /'__`\\  /'__`\\   ",
    "  \\ \\ \\L\\ \\   \\_\\ \\_ \\ \\ \\_\\ \\  /\\ \\L\\ \\ /\\  __/   \\ \\ \\L\\ \\/\\ \\/\\ \\/\\ \\   \\ \\ \\_ /\\  __/ /\\ \\L\\.\\_ ",
    "   \\ \\____/   /\\____\\ \\/`____ \\ \\ \\___,_\\\\ \\____\\   \\ \\____/\\ \\_\\ \\_\\ \\_\\   \\ \\__\\\\ \\____\\\\ \\__/\\.\\_\\",
    "    \\/___/    \\/____/  `/___/> \\ \\/__,_ / \\/____/    \\/___/  \\/_/\\/_/\\/_/    \\/__/ \\/____/ \\/__/\\/_/",
    "                          /\\___/                                                                 ",
    "                          \\/__/                                                                  ",
    "",
    "Welcome to my personal website!",
    "Use 'help' to see available commands.",
];
