const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];
const fruitLower = fruit.map(function(fru){
	return fru.toLowerCase();
})

function search(str) {
	//Creates a new array if the letters found in the passed through str are located in the lowerCase fruit list.
	let results = [];
	results = fruitLower.filter(function(value){
		if (value.indexOf(str)>=0) return true;
	})

	//Ensure that options only return IF there is text in the fruit search bar. 
	if(input.value){
		return results;
	}
	return [];
}

function searchHandler(e) {
	//clears out the ul based on previous keyup event.
	//Used chat GPT to create the while loop for deleting 'li's
	while (suggestions.firstChild){
		suggestions.removeChild(suggestions.firstChild);
	}

	//creates uniform letters for search. Runs search which returns an array with potential matching fruits.
	let string = input.value.toLowerCase();
	let fruitOptions = search(string);

	//hands the matching fruit array potential over to showSuggestions which makes an li for EACH item and spans for EACH letter.
	showSuggestions(fruitOptions, string);

}

function showSuggestions(results, inputVal) {
	//creates a new li with spans for each letter. Any letter included in the search input - its span will receive the class of 'has-suggestion'
	for (let fru of results){
		//iterates throught the results list and creates an li
		let selection = document.createElement('li');
		let counter = fru.indexOf(inputVal);
		let len = inputVal.length;
		
		for (let i = 0; i <fru.length; i++){
			//iterates through the letters of the results list to create spans for each
			let abc = document.createElement('span')
			abc.innerText = fru[i];

			if( i === counter || ( i > counter && i < counter + len)){
				//assigns the class of has-suggestion to spans with letters that are part of the inputValue.
				abc.setAttribute('class','has-suggestions')
			}

			selection.append(abc);
			//adds the spans onto the li eg. li: span-'a', span-'p', span-'p', span-'l',span'e'
		}

		suggestions.append(selection);
		//attachs the newly created span onto the ul
	}
}

function useSuggestion(e) {
	let yourFruit = e.target.innerText;
	input.value = yourFruit;
	//completes the input value with the selected item's text

	while(suggestions.firstChild){
		suggestions.removeChild(suggestions.firstChild)
	}
	//removes all items from the drop-down suggestion list
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion); 