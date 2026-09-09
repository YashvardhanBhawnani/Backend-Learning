import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

const showMenu = () => {
  console.log("\n1.Add a Task");
  console.log("2.View All Tasks");
  console.log("3.Delete a Task");
  console.log("4.Exit");
  rl.question("\nChoose A Option : ", handleInput);
};

const handleInput = (opt) => {
  switch (opt) {
    case "1":
      rl.question("Enter The Task : ", (todo) => {
        if (tasks.includes(todo)) {
          console.log("Task Already Stored");
        } else {
          tasks.push(todo);
          console.log("Task Added : ", todo, "\n");
        }
        showMenu();
      });
      break;
    case "2":
      if (tasks.length >= 1) {
        console.log("\n Your Todo List");
        tasks.forEach((todo, index) => {
          console.log(`${index + 1}. ${todo}`);
        });
      } else {
        console.log("Add A Task First To View The List");
      }
      showMenu();
      break;
    case "3":
      if (tasks.length >= 1) {
        rl.question("Enter The Task to Delete : ", (taskToDel) => {
          if (tasks.includes(taskToDel)) {
            tasks = tasks.filter((todo) => todo !== taskToDel);
            console.log(`Task "${taskToDel}" has been removed from tasks`);
          } else {
            console.log(`Task "${taskToDel}" was not found`);
          }
          showMenu();
        });
      } else {
        console.log("You Have No Tasks In The List To Delete");
        showMenu();
      }
      break;
    case "4":
      console.log("Goodbye! 👋🏻");
      rl.close();
      break;
    default:
      console.log("Invalid Option Please Try Again!");
      showMenu();
      break;
  }
};

console.log("\nWelcome to My Todo Cli App!👋🏻");
showMenu();
