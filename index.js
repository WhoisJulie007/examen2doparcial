import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

//Learn this
async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }
  async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: '¿Cuál es la pelicula favorita de Julia?\n',
      choices: [
        'Interestellar',
        'Titanes del Pacifico 1',
        'Lala Land',
        'Kong vs Godzilla',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Interestellar');
  }
  
  async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: '¿Dónde se originaron los juegos olímpicos?\n',
      choices: [
        'Roma antigua🏛️',
        'Atenas, Grecia🏛️',
        'El Cairo, Egipto🏛️',
        'Tokio, Japón🏛️',
      ],
    });
  
    return handleAnswer(answers.question_2 === 'Atenas, Grecia🏛️');
  }
  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: '¿Cuál es el río más largo del mundo?\n',
      choices: [
        'Río Nilo🌊',
        'Río Amazonas🌊',
        'Río Mississippi🌊',
        'Río Yangtsé🌊',
      ],
    });
  
    return handleAnswer(answers.question_3 === 'Río Nilo🌊');
  }
  
  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: '¿Qué país ganó el primer mundial de fútbol?\n',
      choices: [
        'Brasil⚽',
        'Alemania⚽',
        'Uruguay⚽',
        'Italia⚽',
      ],
    });
  
    return handleAnswer(answers.question_4 === 'Uruguay⚽');
  }
  
  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message: '¿Quién escribió "Cien años de soledad"?\n',
      choices: [
        'Mario Vargas Llosa📚',
        'Gabriel García Márquez📚',
        'Julio Cortázar📚',
        'Isabel Allende📚',
      ],
    });
  
    return handleAnswer(answers.question_5 === 'Gabriel García Márquez📚');
  }

  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.blue(
          `GAMBARE GAMBARE!`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();