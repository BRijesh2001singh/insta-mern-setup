const shell = require('shelljs');
const inq = require('inquirer');
function connectmygit(githubssh) {
    //connect github
    if (shell.exec('git init').code !== 0) {
        console.error('Error during git initialization.');
    } else if (shell.exec('git add .').code !== 0) {
        console.error('Error during git add.');
    } else if (shell.exec('git commit -m "first commit"').code !== 0) {
        console.error('Error during git commit.');
    } else if (shell.exec('git branch -M main').code !== 0) {
        console.error('Error during git branch rename.');
    } else if (shell.exec(`git remote add origin ${githubssh}`).code !== 0) {
        console.error('Error adding remote origin.');
    } else if (shell.exec('git push -u origin main').code !== 0) {
        console.error('Error pushing to GitHub.');
    } else {
        console.log('GitHub repository connected successfully! ✔️');
    }
}


async function askgit() {
    //ask for github connection req
    const { checkgithubRepo } = await inq.default.prompt({
        name: "checkgithubRepo",
        type: 'confirm',
        message: "do you want to connect your github reposirtory?",
        default: false
    });
    if (checkgithubRepo) {
        const { githubssh } = await inq.default.prompt({
            name: "githubssh",
            type: "input",
            message: "Enter your github repository ssh link ==>"
        })

        // Initialize Git and push to remote repository step by step
        connectmygit(githubssh);
    }
    else console.log("Please wait!");
}
module.exports = { askgit };