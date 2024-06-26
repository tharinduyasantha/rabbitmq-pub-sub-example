const { publishMessage } = require("./publisher");
const { subscribe } = require("./subscriber");

async function main() {
    subscribe();

    setTimeout(async()=>{
        await publishMessage();
    },1000);
}

main();