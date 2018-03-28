var backup = localStorage.getItem('allNotes');
if (backup) {
	var allNotes = JSON.parse(backup);
} else {
	var allNotes = [
		{
			noteContent: 'Do the notes project.',
			dateAndTime: '02/02/2018 18:00'
		}, {
			noteContent: 'To enable Rotarians to advance world understanding, goodwill, and peace through the improvement of health, the support of education, and the alleviation of poverty.',
			dateAndTime: '02/04/2018 18:00'
		}, {
			noteContent: 'Develops, supports, and stewards legal and technical infrastructure that maximizes digital creativity, sharing, and innovation.',
			dateAndTime: '02/03/2018 17:10'
		}
	];
}

createNotesfromArray(allNotes);

function createNotesfromArray (notes) {
	for (var i = 0; i < notes.length; i++) {
		createNote(notes[i]);
	}
}

function createNote (notesObject) {
	var addNoteContainer = document.createElement('div');
	var addCloseBtn = document.createElement('button');
	var addNoteContent = document.createElement('p');
	var addADate = document.createElement('span');

	addNoteContainer.classList.add('note');
	addCloseBtn.classList.add('close');

	addCloseBtn.textContent = '×';
	addNoteContent.textContent = notesObject.noteContent;
	addADate.textContent = notesObject.dateAndTime;

	document.querySelector('#all_notes').appendChild(addNoteContainer);
	addNoteContainer.appendChild(addCloseBtn);
	addNoteContainer.appendChild(addNoteContent);
	addNoteContainer.appendChild(addADate);

	addCloseBtn.addEventListener('click', function (event) {
		var containerArray = document.querySelectorAll('.note');
		var deletedNote = event.target.parentNode;
		for (var i = 0; i < containerArray.length; i++) {
			if (containerArray[i] == deletedNote) {
				break;
			}
		}
		allNotes.splice(i, 1);
		updateBackup(allNotes);

		event.target.parentNode.remove();
	});
}

var noteForm = document.querySelector('form');
noteForm.addEventListener('submit', function (event) {
	event.preventDefault();
	var newNoteContent = noteForm.querySelector('textarea').value;
	var date = noteForm.querySelector('#dueTime').value;
	var dateContent = date.slice(8,10) + "/" + date.slice(5,7) + "/" + date.slice(0,4) + " " + date.slice(-5);

	var newNoteObject = {
		noteContent: newNoteContent,
		dateAndTime: dateContent 
	}

	createNote(newNoteObject);

	allNotes.push(newNoteObject);
	updateBackup(allNotes);

	noteForm.reset();
});

updateDateAndTime ("min");

updateDateAndTime ("value");

function updateDateAndTime (attribute) {
	var todayInTime = new Date().getTime() + 2*60*60*1000;
	var today = new Date(todayInTime);
	var nowDateFormat = today.toISOString().slice(0, 16);
	document.querySelector('#dueTime').setAttribute(attribute, nowDateFormat);
}

function updateBackup (array) {
	localStorage.setItem('allNotes', JSON.stringify(array));
}