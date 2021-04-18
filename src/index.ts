import fetch from "node-fetch";
import Table from "cli-table";
import he from "he";

const usage = `Arguments: [runDurationSeconds] [refreshIntervalSeconds]`;
const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

async function fetchAndPrint(deadlineMs: number) {
    // Set deadline to cancel requests after the specified interval, preventing previous requests from completing
    // after the next request has already gone out (i.e. when response time exceeds the script interval)
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), deadlineMs);
    try {
        const res = await fetch(apiUrl, {
            signal: abortController.signal
        });
        if (res.ok) {
            // Parse response body JSON and create table
            const body = await res.json();
            const timestamp = body.time.updated;
            const table = new Table({
                head: ['Currency', 'Symbol', 'Rate']
                , colWidths: [10, 8, 16]
            });

            // Extract relevant data from body
            for (let key of Object.keys(body.bpi)) {
                const item = body.bpi[key];
                const symbol = he.decode(item.symbol);
                const rate = item.rate_float.toFixed(3);
                table.push([item.code, symbol, rate])
            }

            console.log(`\nReport for ${timestamp}:\n${table.toString()}\n`);
        } else {
            console.error(`Response Code ${res.status}`)
            // Try to print error as JSON, but fallback to text if it cannot be parsed
            const body = await res.text();
            try {
                console.error(JSON.parse(body));
            } catch {
                console.error(body);
            }
        }
    } catch (e) {
        console.error(e);
    }
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
