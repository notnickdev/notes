const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();

  // Checks for duplicates
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    // Adds note
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
  }

  !duplicateNote
    ? console.log(chalk.inverse.green('New note added!'))
    : console.log(chalk.inverse.red('Note title taken!'));
};

const removeNote = title => {
  const notes = loadNotes();

  // Notes to keep
  const notesToKeep = notes.filter(note => note.title !== title);
  saveNotes(notesToKeep);

  // Prints message to console
  !notes.filter(note => note.title === title).length
    ? console.log(chalk.inverse.red('This note does not exist!'))
    : console.log(chalk.inverse.green(`${title} note removed!`));
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your notes...'));
  notes.forEach(note => console.log(`Title: ${note.title}`));
};

const readNote = title => {
  const notes = loadNotes();
  const noteTitleFound = notes.find(note => note.title === title);

  if (noteTitleFound) {
    console.log(chalk.green.inverse(`Title: ${noteTitleFound.title}`));
    console.log(chalk.green.inverse(`Body: ${noteTitleFound.body}`));
  } else {
    console.log(
      chalk.red.inverse(`Could not found this notes. Note title: ${title}`)
    );
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const data = fs.readFileSync('notes.json').toString();
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
