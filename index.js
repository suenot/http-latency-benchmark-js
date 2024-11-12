const axios = require('axios');

// Function to make requests and measure the time taken
async function testRequest(url, repeats = 10) {
    let times = [];

    for (let i = 0; i < repeats; i++) {
        const start = Date.now();
        try {
            await axios.get(url);  // Using the provided URL
            const duration = Date.now() - start;
            times.push(duration);
            console.log(`Request ${i + 1} time: ${duration} ms`);
        } catch (error) {
            console.error(`Request ${i + 1} failed:`, error);
        }
    }

    // Calculate minimum, maximum, median, and mean time
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    // Sort times array to find the median
    times.sort((a, b) => a - b);
    const medianTime = times.length % 2 === 0
        ? (times[times.length / 2 - 1] + times[times.length / 2]) / 2
        : times[Math.floor(times.length / 2)];

    // Calculate mean time
    const meanTime = times.reduce((sum, time) => sum + time, 0) / times.length;

    // Output list of all times and summary results
    console.log(`\nResults over ${repeats} requests from ${await getPublicIP()} to ${url}:`);
    console.log(`List: [${times.join(', ')}]`);
    console.log(`Min time: ${minTime} ms`);
    console.log(`Max time: ${maxTime} ms`);
    console.log(`Median time: ${medianTime} ms`);
    console.log(`Mean time: ${meanTime.toFixed(2)} ms`);

    return { times, minTime, maxTime, medianTime, meanTime };  // Return data for later use
}

// Function to get public IP address
async function getPublicIP() {
    try {
        const response = await axios.get('http://checkip.amazonaws.com/');
        return response.data.trim();  // Trim to remove any extra whitespace
    } catch (error) {
        console.error("Error fetching public IP:", error);
        return null;  // Return null if there's an error
    }
}

// Function to parse command-line arguments
function parseArguments() {
    const args = process.argv.slice(2);
    let url = 'https://api.bybit.com/v2/public/time';  // Default URL
    let repeats = 10;  // Default number of repeats
    let sendTo = '';  // URL to send data to, if specified

    // Parsing command-line arguments
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-url' && args[i + 1]) {
            url = args[i + 1];
            i++; // Skip the next argument (URL value)
        } else if (args[i] === '-n' && args[i + 1]) {
            repeats = parseInt(args[i + 1], 10);
            i++; // Skip the next argument (repeat value)
        } else if (args[i] === '-send-to' && args[i + 1]) {
            sendTo = args[i + 1];
            i++; // Skip the next argument (send-to value)
        }
    }

    return { url, repeats, sendTo };
}

// Get command-line arguments
const { url, repeats, sendTo } = parseArguments();

// Run the test with the provided parameters
testRequest(url, repeats).then(result => {
    if (sendTo) {
        // If there is a 'send-to' URL, send the results to the specified endpoint
        axios.post(sendTo, {
            ip: getPublicIP(),
            language: 'js',
            results: result.times,
            minTime: result.minTime,
            maxTime: result.maxTime,
            medianTime: result.medianTime,
            meanTime: result.meanTime
        })
        .then(response => {
            console.log("Results successfully sent to:", sendTo);
        })
        .catch(error => {
            console.error("Error sending results:", error);
        });
    }
});
