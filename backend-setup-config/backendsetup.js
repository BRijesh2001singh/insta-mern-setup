const inq = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const config = require('./boiler-plate-config');
const { startSpinner, stopSpinner } = require('./clispinner');
const { askgit } = require('../gitsetup');
let db = "ADD YOUR MONGO URI";

const spinnerChars = ['░░░░░░', '▒▒▒▒▒▒', '▓▓▓▓▓▓', '██████'];
// const spinnerChars1 = ['|', '/', '-', '\\'];

let projectDir;
async function setupNode(full, title) {
    let projectname = title + '-backend';
    try {
        if (!full) {
            const { project_name } = await inq.default.prompt({
                name: "project_name",
                type: "input",
                message: "Enter your server name\n",
                default: 'backend'
            })
            projectname = project_name;
        }
        projectDir = path.join(process.cwd(), projectname);
        shell.mkdir('-p', projectDir);
        shell.cd(projectDir);

    } catch (error) {
        console.log(error);
    }

    //ask for mongo
    const { setupmongo } = await inq.default.prompt({
        name: "setupmongo",
        type: 'confirm',
        message: "do you want to setup mongoD?",
        default: false
    });
    if (setupmongo) {
        const { mongo_uri } = await inq.default.prompt({
            name: "mongo_uri",
            type: "input",
            message: "Enter your MongoDB URI ==>"
        })
        db = mongo_uri;
        const connectionsPath = path.join(projectDir, 'connections', 'connections.js');
        shell.mkdir('-p', path.dirname(connectionsPath));
        shell.mkdir('-p', path.dirname(projectDir), 'models');
        fs.writeFileSync(connectionsPath, config.mongoconnections)

    }
    else db = null;
    const routesPath = path.join(projectDir, 'routes', 'routes.js');
    shell.mkdir('-p', path.dirname(routesPath)); // Ensure 'routes' directory exists
    fs.writeFileSync(path.join(projectDir, 'index.js'), config.content);
    //creating routes.js and adding basic boiler plate
    fs.writeFileSync(routesPath, config.routesboilerplate);
    fs.writeFileSync(path.join(projectDir, '.env'), `PORT=8000\n`);
    //add gitignore
    const gitignorepath = path.join(projectDir, '.gitignore');
    fs.writeFileSync(gitignorepath, `node_modules/ \n`);
    fs.appendFileSync(gitignorepath, '.env*');
    if (setupmongo) {
        fs.appendFileSync(path.join(projectDir, '.env'), `DB=${db}`);
    }
    fs.writeFileSync(path.join(projectDir, 'package.json'), config.reqpackages);
    if (!full) await askgit();
    const spinnerInterval = startSpinner(spinnerChars);
    shell.exec('npm install', (code, stdout, stderr) => {
        stopSpinner(spinnerInterval);

        if (code !== 0) {
            console.error('Error during npm install:', stderr);
        } else {
            console.log('Dependencies installed successfully!✔️');
            if (!full)
                shell.exec('nodemon index.js');
            else {

                console.log('⚠️ Backend set up complete, now go to backend folder and run ➡️ nodemon index.js ⚠️');
                console.log('⚠️ Frontend set up complete, now go to frontend folder and run ➡️ npm run dev ⚠️');
            }
        }

    });

}
module.exports = { setupNode };