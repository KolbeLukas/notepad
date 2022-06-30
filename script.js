let savedTitles = [];
let savedNotes = [];
let deletedTitles = [];
let deletedNotes = [];


loadSavedNotes();
loadDeletededNotes();

/* FUNCTIONS FOR INDEX.HTML */

/* SHOW SAVED NOTES ON NOTES-PAGE */
function renderSavedNotes() {
  let content = document.getElementById('saved-notes')
  content.innerHTML = '';
  for (let i = 0; i < savedTitles.length; i++) {
    const title = savedTitles[i];
    const note = savedNotes[i];
    if (title > '' && note > '') {
      content.innerHTML += renderTitleAndNote(i, title, note);
    }
    if (title == '' && note > '') {
      content.innerHTML += renderOnlyNote(i, title, note);
    }
  }
  removeNoteBackground();
}


/* SAVE A NEW NOTE AFTER INSERT TEXT IN THE WRITE-NOTE-SECTION IN THE ARRAY'S */
/* either a title AND a note OR only a note */
function saveNewNote() {
  let title = document.getElementById('note-title');
  let note = document.getElementById('note-text');
  if (note.innerHTML > '') {
    savedTitles.push(title.innerText);
    savedNotes.push(note.innerText);
    title.innerText = '';
    note.innerText = '';
    saveNote();
    renderSavedNotes();
  } else {
    document.getElementById('note-text').classList.add('empty-alert');
    setTimeout(vanishAlert, 2000);
  }
}


/* SAVE THE VALUES OF THE ARRAY'S AS TEXT IN THE LOCAL-STORAGE */
function saveNote() {
  let titleAsText = JSON.stringify(savedTitles);
  localStorage.setItem('titles', titleAsText);
  let noteAsText = JSON.stringify(savedNotes);
  localStorage.setItem('notes', noteAsText);
}


/* GET THE TEXT OF THE SAVED NOTES FROM LOCAL-STORAGE INTO THE ARRAY'S */
function loadSavedNotes() {
  let titleAsText = localStorage.getItem('titles');
  let noteAsText = localStorage.getItem('notes');
  if (titleAsText && noteAsText) {
    savedTitles = JSON.parse(titleAsText);
    savedNotes = JSON.parse(noteAsText);
  }
}


/* DELETE A PARTICULAR POSITION OUT OF THE ARRAY'S */
function deleteSavedNote(i) {
  let deletedTitle = savedTitles.splice(i, 1)[0];
  let deletedNote = savedNotes.splice(i, 1)[0];
  deletedTitles.push(deletedTitle);
  deletedNotes.push(deletedNote);
  saveNote();
  saveDeletedNote();
  renderSavedNotes();
}


/* DELETED NOTES GET SAVED AS TEXT WITH A NEW KEY IN THE LOCAL-STORAGE */
function saveDeletedNote() {
  let titleAsText = JSON.stringify(deletedTitles);
  localStorage.setItem('deletedTitles', titleAsText);
  let noteAsText = JSON.stringify(deletedNotes);
  localStorage.setItem('deletedNotes', noteAsText);
}


/* POPUP IF THERE IS NO TEXT IN THE NOTE-WRITING-FIELD */
/* only a note-text is necessary, a title-text not mandatory */
function vanishAlert() {
  document.getElementById('note-text').classList.remove('empty-alert');
}


/* IF THERE IS AT LEAST ONE SAVED-NOTE, THE BACKGROUNG-IMG GETS REMOVED */
function removeNoteBackground() {
  if ((savedTitles.length > 0) || (savedNotes.length > 0)) {
    document.getElementById('bg-no-note').classList.add('d-none');
    document.getElementById('pinned-headline').classList.remove('d-none');
  } else {
    document.getElementById('bg-no-note').classList.remove('d-none');
    document.getElementById('pinned-headline').classList.add('d-none');
  }
}


/* FUNCTIONS FOR TRASH.HTML */

/* SHOW DELETED NOTES ON TRASH-PAGE */
function renderDeletedNotes() {
  let content = document.getElementById('deleted-notes')
  content.innerHTML = '';
  for (let i = 0; i < deletedTitles.length; i++) {
    const title = deletedTitles[i];
    const note = deletedNotes[i];
    if (title > '' && note > '') {
      content.innerHTML += renderDeletedTitleAndNote(i, title, note);
    }
    if (title == '' && note > '') {
      content.innerHTML += renderDeletedOnlyNote(i, title, note);
    }
  }
  removeDeletedNoteBackground();
}


/* GET THE TEXT OF THE DELETED NOTES FROM LOCAL-STORAGE INTO THE ARRAY'S */
function loadDeletededNotes() {
  let titleAsText = localStorage.getItem('deletedTitles');
  let noteAsText = localStorage.getItem('deletedNotes');
  if (titleAsText && noteAsText) {
    deletedTitles = JSON.parse(titleAsText);
    deletedNotes = JSON.parse(noteAsText);
  }
}

/* OPEN THE DELET-OVERLAY ON THE TRASH-HTML */
function deleteDeletedNote(i) {
  document.getElementById('delete-overlay').innerHTML = deleteOverlay(i);
}

/* DELETS A NOTE FINALLY FROM THE WHOLE PAGE */
function deleteNoteFinally(i) {
  deletedTitles.splice(i, 1);
  deletedNotes.splice(i, 1);
  saveDeletedNote();
  renderDeletedNotes();
  document.getElementById('delete-overlay').innerHTML = '';
}

/* CLOSE THE DELET-OVERLAY ON THE TRASH.HTML */
function vanishDeleteOverlay() {
  document.getElementById('delete-overlay').innerHTML = '';
}

/* IF THERE IS AT LEAST ONE SAVED-NOTE AT THE TRASH.HTML,
 THE BACKGROUNG-IMG GETS REMOVED */
function removeDeletedNoteBackground() {
  if ((deletedTitles.length > 0) || (deletedNotes.length > 0)) {
    document.getElementById('bg-no-deleted-note').classList.add('d-none');
  } else {
    document.getElementById('bg-no-deleted-note').classList.remove('d-none');
  }
}

/* RESTORE A DELETED NOTE FROM TRASH.HTML BACK TO INDEX.HTML */
function restoreNote(i) {
  let deletedTitle = deletedTitles.splice(i, 1)[0];
  let deletedNote = deletedNotes.splice(i, 1)[0];
  savedTitles.push(deletedTitle);
  savedNotes.push(deletedNote);
  saveNote();
  saveDeletedNote();
  renderDeletedNotes();
}


/* OTHER FUNCTIONS */

/* SHOW THE TRASH-ICON WHILE HOVERING OVER THE SAVED-NOTE-BOX */
function showTrashIcon(i) {
  let id = "trash-icon" + (i);
  document.getElementById(id).classList.remove('opc-none');
}

/* VANISH THE TRASH-ICON LEAVING THE SAVED-NOTE-BOX WITH TEH CURSOR */
function removeTrashIcon(i) {
  let id = "trash-icon" + (i);
  document.getElementById(id).classList.add('opc-none');
}

/* SHOW THE RESTORE-ICON WHILE HOVERING OVER THE DELETED-NOTE-BOX */
function showRestoreIcon(i) {
  let id = "restore-icon" + (i);
  document.getElementById(id).classList.remove('opc-none');
}

/* VANISH THE RESTORE-ICON LEAVING THE DELETED-NOTE-BOX WITH TEH CURSOR */
function removeRestoreIcon(i) {
  let id = "restore-icon" + (i);
  document.getElementById(id).classList.add('opc-none');
}

/* OPEN THE NAVIGATION MENU IF MENU-BUTTON IS CLICKED */
/* this showes only at smaller screens */
function showNavMenu() {
  document.getElementById('nav-scroll-menu').classList.remove('hide-nav-scroll-menu');
  document.getElementById('nav-scroll-menu').classList.add('show-nav-scroll-menu');
}

/* CLOSE THE NAVIGATION MENU IF MENU-BUTTON IS CLICKED */
function hideNavMenu() {
  document.getElementById('nav-scroll-menu').classList.add('hide-nav-scroll-menu');
  document.getElementById('nav-scroll-menu').classList.remove('show-nav-scroll-menu');
}


/* HTML-RENDERING */

function renderTitleAndNote(i, title, note) {
  return /*html*/ `
      <div onmouseenter="showTrashIcon(${[i]})" onmouseleave="removeTrashIcon(${[i]})" class="saved-note-box">
        <h3 class="saved-note-title">${title}</h3>
        <span class="saved-note-text">${note}</span>
        <div class="notes-icon-section">
          <div class="trash-icon-blur"></div>
          <div onclick="deleteSavedNote(${i})" id="trash-icon${[i]}" class="trash-icon opc-none">
            <span class="tooltiptext">Löschen</span>
          </div>
        </div>
      </div>`
}


function renderOnlyNote(i, title, note) {
  return /*html*/ `
      <div onmouseenter="showTrashIcon(${[i]})" onmouseleave="removeTrashIcon(${[i]})" class="saved-note-box">
      <h3 class="saved-note-title opc-none">${title}</h3>  
      <span class="saved-note-text">${note}</span>
        <div class="notes-icon-section">
          <div class="trash-icon-blur"></div>
          <div onclick="deleteSavedNote(${i})" id="trash-icon${[i]}" class="trash-icon opc-none">
            <span class="tooltiptext">Löschen</span>
          </div>
        </div>
      </div>`;
}


function renderDeletedTitleAndNote(i, title, note) {
  return /*html*/ `
      <div onmouseenter="showRestoreIcon(${[i]}); showTrashIcon(${[i]})" onmouseleave="removeTrashIcon(${[i]}); removeRestoreIcon(${[i]})" class="deleted-note-box">
        <h3 class="saved-note-title">${title}</h3>
        <span class="saved-note-text">${note}</span>
        <div class="notes-icon-section">
          <div class="restore-icon-blur"></div>
          <div onclick="restoreNote(${i})" id="restore-icon${[i]}" class="restore-icon opc-none">
            <span class="tooltiptext2">Wiederherstellen</span>  
          </div>
          <div class="trash-icon-blur"></div>
          <div onclick="deleteDeletedNote(${i})" id="trash-icon${[i]}" class="trash-icon opc-none">
            <span class="tooltiptext">Löschen</span>  
          </div>
        </div>
      </div>`
}


function renderDeletedOnlyNote(i, title, note) {
  return /*html*/ `
      <div onmouseenter="showRestoreIcon(${[i]}); showTrashIcon(${[i]})" onmouseleave="removeTrashIcon(${[i]}); removeRestoreIcon(${[i]})" class="deleted-note-box">
      <h3 class="saved-note-title opc-none">${title}</h3>  
      <span class="saved-note-text">${note}</span>
        <div class="notes-icon-section">
          <div class="restore-icon-blur"></div>
          <div onclick="restoreNote(${i})" id="restore-icon${[i]}" class="restore-icon opc-none">
            <span class="tooltiptext2">Wiederherstellen</span>  
          </div>
          <div class="trash-icon-blur"></div>
          <div onclick="deleteDeletedNote(${i})" id="trash-icon${[i]}" class="trash-icon opc-none">
            <span class="tooltiptext">Löschen</span>  
          </div>
        </div>
      </div>`;
}


function deleteOverlay(i) {
  return /*html*/ `
      <div class="delete-overlay">
        <div class="delete-overlay-message">
          <span>Notiz endgültig löschen?</span>
          <div class="delete-overlay-button">
            <button onclick="vanishDeleteOverlay()">Abbrechen</button>
            <button onclick="deleteNoteFinally(${i})" class="no-return-button">Löschen</button>
          </div>
        </div>
      </div>`;
}