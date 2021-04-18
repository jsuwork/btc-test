import fetch from "node-fetch";
import Table from "cli-table";
import he from "he";

const usage = `Arguments: [runDurationSeconds] [refreshIntervalSeconds]`;
const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

async function fetchAndPrint(deadlineMs: number) {
    // TODO: Implementation
}

async function runScript(durationMs: number, intervalMs: number) {
    const durationS = Math.round(durationMs/1000);
    const intervalS = Math.round(intervalMs/1000);

    console.log(`Script will run for ${durationS} seconds, refreshing every ${intervalS} seconds.`);

    await fetchAndPrint(intervalMs);
    const runner = setInterval(async () => await fetchAndPrint(intervalMs), intervalMs);

    setTimeout(() => {
        clearInterval(runner);
        console.log(`Finished after running for ${durationS} seconds.`);
        process.exit(0);
    }, durationMs);
}

function parseArgs(args: string[]): { durationMs: number, intervalMs: number } {
    const argRegex = /^\d+$/; // Only accepting positive integer strings
    if (args.length !== 2 || !argRegex.test(args[0]) || !argRegex.test(args[1])) {
        console.error("Syntax Error: argument count mismatch or invalid argument types")
        console.log(usage);
        process.exit(-1);
    }
    return {
        durationMs: Number(args[0]) * 1000,
        intervalMs: Number(args[1]) * 1000,
    }
}


const args = parseArgs(process.argv.slice(2));
const _ = runScript(args.durationMs, args.intervalMs);
