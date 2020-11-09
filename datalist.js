function setDatalist(element, list = null, onChooseCallback = null)
{
	var element = document.querySelector(element);
	if(element === null){ return false; }

	var datalist = element.querySelector('.sfDatalist');
	if(datalist === null){ return false; }

	var inputForm = element.querySelector('.sfInput');
	if(inputForm === null){ return false; }

	var inputIco = element.querySelector('.sfInputIco');

	var defaultList = getList();
	//Si une liste est fournis via le paramètre 'list' :
	if(list !== null){ defaultList = list; setList(list); }

	//Vérification que la liste ne soit pas vide :
	if(defaultList.length === 0){ inputForm.disabled = true; console.log("Datalist error : Nothing in the list"); return false; }

	inputForm.addEventListener("input", getInput, false);
	inputForm.addEventListener("focus", showList, false);
	inputForm.addEventListener("focusout", focusOut, false);

	datalist.addEventListener("click", datalistClick, false);

	function getInput(e)
	{
		showList();
		datalistSearch(inputForm.value);
	}

	function datalistClick(e)
	{
		var selectedMaque = e.target.innerText;
		
		inputForm.value = selectedMaque;
		hideList();
		
		//Appel du callback si il y a lieu :
		if(onChooseCallback !== null){ onChooseCallback(selectedMaque); }
	}

	function datalistSearch(search)
	{
		var list = defaultList;
		var newList = [];

		//Retourne la liste complète si le champ est vide :
		if(search === ''){ setList(defaultList); removeError(); return false; }

		for(var i = 0; i <= list.length-1; i++)
		{
			if(list[i].toLowerCase().search(search.toLowerCase()) !== -1)
			{
				newList.push(list[i]);
			}
		}

		setList(newList);

		//Retourne une erreur si aucune correspondance n'est trouvée :
		if(newList.length === 0){ setError(); }
		else{ removeError(); }
	}

	function setError()
	{
		if(!inputForm.classList.contains('error')){ inputForm.classList.add('error'); }
	}

	function removeError()
	{
		if(inputForm.classList.contains('error')){ inputForm.classList.remove('error'); }
	}

	function hasError()
	{
		if(inputForm.classList.contains('error')){ return true; }

		return false;
	}

	//Retourne un tableau avec la liste des élements de la datalist HTML
	function getList()
	{
		var listeElement = datalist.querySelectorAll('li');
		var liste = [];

		for(var i = 0; i <= listeElement.length-1; i++)
		{
			liste.push(listeElement[i].innerText);
		}

		return liste;
	}

	//Remplace la liste datalist HTML par une nouvelle fournis par le tableau 'list'
	function setList(list)
	{
		var res = list.map((o) => '<li>'+o+'</li>').join('');

		datalist.innerHTML = res;
	}

	function focusOut(e)
	{
		//Cache la liste après 100ms pour laisser le temps à l'event click de fonctionner si l'on clique sur un élément de la datalist
		setTimeout(hideList, 100);

		//Efface le champ input si sa valeur ne correspond à aucun élément de la datalist :
		if(hasError()){ inputForm.value = ''; removeError(); setList(defaultList); }
	}


	function showList(){ if(!datalist.classList.contains('active')){ datalist.classList.add('active'); } if(!inputIco.classList.contains('reverseIco')){ inputIco.classList.add('reverseIco'); } }
	function hideList(){ if(datalist.classList.contains('active')){ datalist.classList.remove('active'); } if(inputIco.classList.contains('reverseIco')){ inputIco.classList.remove('reverseIco'); } }
}
