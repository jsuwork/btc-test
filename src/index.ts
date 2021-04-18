import fetch from "node-fetch";
import Table from "cli-table";
import he from "he";

const usage = `Arguments: [runDurationSeconds] [refreshIntervalSeconds]`;
const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

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
