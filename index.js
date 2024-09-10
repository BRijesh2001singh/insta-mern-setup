#!/usr/bin/env node
const inq = require('inquirer');
const shell = require('shelljs');
const { setupNode } = require("./backend-setup-config/backendsetup");
const { setupfrontend } = require('./frontend-setup-config/frontendsetup');
const main = async () => {
    const ans = await inq.default.prompt({
        type: 'list',
        name: 'choices',
        message: 'What do you want to setup?',
        choices: ["Frontend", "Backend", "Frontend+Backend"]
    });

    if (ans.choices === "Frontend") {
        setupfrontend();
    }
    else if (ans.choices === "Backend") {
        setupNode();
    }
    else if (ans.choices === "Frontend+Backend") {
        const res = await inq.default.prompt({
            type: 'input',
            default: 'my-project',
            message: 'Enter your project name.',
            name: 'project_title'
        });
        try {
            shell.mkdir(res.project_title);
            shell.cd(res.project_title);
            await setupNode(true, res.project_title);
            shell.cd('..');//server folder se bahar nikal
            await setupfrontend(true, res.project_title);
            shell.cd('..');
        } catch (error) {
            console.log(error);
        }
    }

}
main();