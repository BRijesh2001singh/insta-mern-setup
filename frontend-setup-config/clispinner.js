function startSpinner(spinnc) {
    let currentChar = 0;
    const interval = setInterval(() => {
        process.stdout.write(`\r${spinnc[currentChar]} Starting up your frontend please wait!`);
        currentChar = (currentChar + 1) % spinnc.length;
    }, 100);

    return interval;
}

function stopSpinner(interval) {
    clearInterval(interval);

}

module.exports = { startSpinner, stopSpinner }