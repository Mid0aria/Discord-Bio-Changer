const fs = require("fs");
const axios = require("axios");
const config = require("./config.json");

var bio = [
    "lorem",
    "ipsum",
    "test",
	"test123",
	"123test",
	"pogacalara asik olunabiliyormus :/",
];
let result = Math.floor(Math.random() * bio.length);

setInterval(() => {
    changer(bio[result], result);
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
                console.log("Patch atma başarılı");
                fs.writeFile("changer.dat", y.toString(), function (err, data) {
                    if (err) throw err;

                });
            }
        });
}
