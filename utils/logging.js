const chalk = require("chalk");

const Log = type => text => {
  console.log(type(text));
  if (typeof text === "object") {
    console.log(chalk.red("LOGGER ERROR: "));
    console.log(text);
  }
};
