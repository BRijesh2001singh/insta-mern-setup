const inq = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { startSpinner, stopSpinner } = require('./clispinner');
const { askgit } = require('../gitsetup');

let projectDir;
const spinnerChars1 = ['|', '/', '-', '\\'];
async function setupfrontend(full, title) {
    let project_title = title + '-frontend';
    if (!full) {
        const { projectname } = await inq.default.prompt({
            type: "input",
            name: "projectname",
            message: "Enter your frontend project name.",
            default: "frontend"
        })
        project_title = projectname;
    }
    try {
        projectDir = path.join(process.cwd(), project_title);
        shell.mkdir('-p', projectDir);
        shell.cd(projectDir);
        //add gitignore

        const spinnerInterval = startSpinner(spinnerChars1);

        shell.exec('npx create-vite@latest . --template react', async (code, stdout, stderr) => {
            stopSpinner(spinnerInterval);
            if (code !== 0) {
                console.error('Error during creating Vite app:', stderr);
            }
            else {
                const compPath = path.join(projectDir, 'src', 'components');
                shell.mkdir('-p', compPath);
                const gitignorepath = path.join(projectDir, '.gitignore');
                fs.writeFileSync(gitignorepath, `node_modules/ \n`);
                fs.appendFileSync(gitignorepath, '.env*');
                if (!full) await askgit();
                shell.exec('npm install axios');
                shell.exec('npm install');
                if (!full)
                    shell.exec('npm run dev');
            }
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = { setupfrontend };