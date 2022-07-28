const fs = require("fs");
const axios = require("axios");
const config = require("./config.json");

var bio = [];
var bio = fs.readFileSync("./bio.txt", "utf8").split("\n");
var bio = bio.filter((str) => str != "");

bio.forEach((e, i) => {
    if (e.length > 999) {
        console.log(
            `The bio.txt line ${i} is longer than the limit of 999 characters. This bio will be ignored for now.`
        );
        bio.splice(i, 1);
        return;
    }

    bio[i] = e.replace(/\\n/g, "\n").replace("\\n", "\n");
});

// console.log(`${bio.length} bio's found.`);

if (bio.length == 0) {
    console.log(
        "\x1b[31mYou haven't put any bio into the bio.txt file! Aborting...\x1b[0m"
    );
    process.exit(0);
}

let result = Math.floor(Math.random() * bio.length);

changer(bio[result], result); // first changer

setInterval(() => {
    changer(bio[result], result); // interval changer
}, 864 * 100000); // 24 hours delay

/*
 TODO If the bio in the changer.dat file and the bio in the result are the same, return a new result.
*/

function changer(x, y) {
    const req = axios
        .patch(
            "https://canary.discord.com/api/v9/users/@me",
            {
                bio: `${x}`,
            },
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: config.discordtoken,
                },
            }
        )
        .then((data) => {
            if (data.data.token == config.discordtoken) {
                console.log("Patched");
                fs.writeFile("changer.dat", y.toString(), function (err, data) {
                    if (err) throw err;
                });
            }
        });
}
