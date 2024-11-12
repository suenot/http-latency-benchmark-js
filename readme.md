# http-latency-benchmark-js

**http-latency-benchmark-js** is a tool for measuring the response times of HTTP requests to a specified URL. It calculates the minimum, maximum, average, and median response times, and can optionally send the results to a specified server endpoint for further analysis.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Command-Line Arguments](#command-line-arguments)
- [Example Output](#example-output)
- [Notes](#notes)
- [Features](#features)

## Installation

To run this project, you need [Node.js](https://nodejs.org/). Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd http-latency-benchmark-js
npm install
```

## Usage

Run the program using the following command:

```bash
node index.js -url <URL> -n <number of requests> -send-to <URL to send results>
```

### Example Command:

```bash
node index.js -url https://google.com -n 10 -send-to http://localhost:3000
```

This command will perform 10 requests to `https://google.com`, measure the response time for each request, and then send the results to `http://localhost:3000`.

## Command-Line Arguments

- `-url`: (required) The URL to which HTTP requests will be sent for latency testing.
- `-n`: (optional) The number of request repetitions. Defaults to 10.
- `-send-to`: (optional) The URL to send the results to after testing. If not specified, data will not be sent.

## Example Output

After running the script, you’ll receive a detailed report of the response times for each request. Here’s an example:

```plaintext
Request 1 time: 213 ms
Request 2 time: 73 ms
Request 3 time: 77 ms
Request 4 time: 74 ms
Request 5 time: 72 ms
Request 6 time: 77 ms
Request 7 time: 73 ms
Request 8 time: 71 ms
Request 9 time: 70 ms
Request 10 time: 75 ms

Results over 10 requests from 111.111.111.111 to https://google.com:
List: [70, 71, 72, 73, 73, 74, 75, 77, 77, 213]
Min time: 70 ms
Max time: 213 ms
Median time: 73.5 ms
Mean time: 87.50 ms
```

## Notes

- **Median Time**: The median response time among all requests.
- **Mean Time**: The average response time of all requests.
- The script detects the client’s IP address and includes it in the report, providing context based on location.
- If a request fails, the error will be logged, and that request will not be included in the statistical calculations.

## Features

- Customizable number of request repetitions.
- Automatic calculation of minimum, maximum, median, and mean response times.
- Optional feature to send the results to a specified server endpoint for analysis.