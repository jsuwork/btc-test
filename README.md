# Bitcoin Rates
This script periodically prints the current Bitcoin prices for USD, GBP and EUR. 
It refreshes according to the user-specified refresh interval and 
then terminates once the user-specified run duration has been reached.

## Getting Started
1. Install the dependencies for this project. The following command will download 
   the required dependencies and populate the `node_modules` directory.
```sh
npm install
```

2. Build the project using the TypeScript compiler. This should work out of the box as
   `npx` is used to call the bundled `tsc`; you can also install it globally
   using `npm install -g typescript`.
```sh
npm run build
```

3. Run the script, providing your desired run duration and refresh interval in seconds.
```sh
# Arguments: [runDurationSeconds] [refreshIntervalSeconds]

# Run for 30 seconds, refreshing every 5 seconds
npm run start 30 5

# Run for 120 seconds, refreshing every 60 seconds
npm run start 120 60
```

## Development
To use a file watcher to automatically restart the script as files are edited,
simply use the `dev` command in place of `start` to use the bundled `ts-node-dev`.
```sh
# Arguments: [runDurationSeconds] [refreshIntervalSeconds]

# Run for 30 seconds, refreshing every 5 seconds
npm run dev 30 5

# Run for 120 seconds, refreshing every 60 seconds
npm run dev 120 60
```

## Example Output
```
Script will run for 120 seconds, refreshing every 60 seconds.

Report for Apr 18, 2021 23:06:00 UTC:
┌──────────┬────────┬────────────────┐
│ Currency │ Symbol │ Rate           │
├──────────┼────────┼────────────────┤
│ USD      │ $      │ 56458.137      │
├──────────┼────────┼────────────────┤
│ GBP      │ £      │ 40819.176      │
├──────────┼────────┼────────────────┤
│ EUR      │ €      │ 47160.441      │
└──────────┴────────┴────────────────┘


Report for Apr 18, 2021 23:07:00 UTC:
┌──────────┬────────┬────────────────┐
│ Currency │ Symbol │ Rate           │
├──────────┼────────┼────────────────┤
│ USD      │ $      │ 56470.452      │
├──────────┼────────┼────────────────┤
│ GBP      │ £      │ 40828.080      │
├──────────┼────────┼────────────────┤
│ EUR      │ €      │ 47170.728      │
└──────────┴────────┴────────────────┘

Finished after running for 120 seconds.
```
