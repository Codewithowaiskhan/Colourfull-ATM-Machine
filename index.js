#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 412112;
console.log(chalk.green(`\n \tWelcome to Code With Owais Khan - ATM Machine\n`));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter Your Pin Code"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green(`\nPin is Correct, Successfully Login!\n`));
    // console.log(`Your Current Account Balance is ${myBalance}`)
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an Operation",
            choices: ["Withdraw Ammount", "Check Balance"],
        }
    ]);
    if (operationAnswer.operation === "Withdraw Ammount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a Withdrawal Method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000,]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red(`Insufficient Balance`));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} Withdraw Sucessfully`));
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the Amount to Withdraw",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red(`Insufficient Balance`));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Withdraw Sucessfully`));
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAnswer.operation === "Check Balance") {
        console.log(chalk.green(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red(`Pin is Incorrect, Try Again`));
}
