    const taskInput = document.getElementById("tache");             // input
    const addButton = document.getElementById("ajouter");           // button
    const messageDisplay = document.getElementById("message");      // p
    const taskList = document.getElementById("liste");              // li
    const deleteButton = document.getElementById("supprimer");      // delButton


    //main function
    function addTask(){
        const taskText = taskInput.value.trim();

        if ( taskText === ''){
            displayMessage('Le champ ne doit pas etre vide' , 'red');
            return;
        }

        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        listItem.appendChild (checkbox);
        listItem.appendChild (taskSpan);

        taskList.appendChild (listItem);

        taskInput.value = '';

        displayMessage ('Tache Ajouter' , 'green');

        updateDeleteButtonVisibility();

        listItem.addEventListener('click', (event) => {
        if (event.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    });

    }

    //Listening click/enter
        addButton.addEventListener('click' , addTask);
        taskInput.addEventListener('keypress', function(event){
            if (event.key === 'Enter'){
                addTask();
            }
        });

    // text display/color function
    function displayMessage(message,type){
        messageDisplay.textContent = message;
        messageDisplay.className = '';
        messageDisplay.classList.add(type);
    } 

    //delete tasks
    function deleteCheckedTasks(){
        const allListItems = taskList.querySelectorAll('li');  // Get all <li> elements
        let taskDeleted = 0;
        let i;
        for ( i = allListItems.length - 1 ; i>=0 ; i-- ){
            const listItem = allListItems[i];
            const checkbox = listItem.querySelector('input[type="checkbox"]');

            if ( checkbox && checkbox.checked ){
                taskList.removeChild(listItem);
                taskDeleted++;
            }
        }
            if (taskDeleted > 0 ){
                displayMessage('Tache(s) suprimée(s)' , 'orange');
            }else {
                displayMessage('Aucune n\'est supprimé' , 'red');
            }
        updateDeleteButtonVisibility();

    }

    deleteButton.addEventListener('click', deleteCheckedTasks);


    function updateDeleteButtonVisibility(){
        const allListes = taskList.querySelectorAll('li'); 
        if ( allListes.length === 0 ){
            deleteButton.style.display = 'none' ;
        } else {
            deleteButton.style.display = 'block';
        }
    }

document.addEventListener('DOMContentLoaded', updateDeleteButtonVisibility);    