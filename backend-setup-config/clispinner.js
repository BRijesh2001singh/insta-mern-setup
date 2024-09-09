function startSpinner(spinnc) {
    let currentChar = 0;
    console.log('CORS setup complete✔️');
    console.log('dotEnv configured✔️');
    const interval = setInterval(() => {
        process.stdout.write(`\r${spinnc[currentChar]} Getting your dependencies ready please wait!`);
        currentChar = (currentChar + 1) % spinnc.length;
    }, 100);

    return interval;
}

function stopSpinner(interval) {
    clearInterval(interval);

}

module.exports = { startSpinner, stopSpinner }