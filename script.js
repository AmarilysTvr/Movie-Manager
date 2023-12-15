window.onload= init;

// The movie manager as a global variable
let cm; 

function init() { 
	// create an instance of the movie manager
	cm = new MovieManager();
	
  	cm.addTestData();
  	cm.printMoviesToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayMoviesAsATable("movies");

const form = document.querySelector("form");
form.addEventListener("submit", formSubmitted);
}


function formSubmitted(evt) {
	evt.preventDefault();
	// Get the values from input fields
	let name = document.querySelector("#name");
  	let imageSrc = document.querySelector("#imageSrc");
	let availableOn = document.querySelector("#availableOn");
	let mainActors = document.querySelector("#mainActors");
	let director = document.querySelector("#director");
	let year = document.querySelector("#year");

	let newMovie = new Movie(
		name.value, 
		imageSrc.value, 
		availableOn.value, 
		mainActors.value, 
		director.value, 
		year.value
	);
	cm.add(newMovie);
	

	// Empty the input fields
	name.value = "";
	imageSrc.value = "";
	availableOn.value = "";
	mainActors.value = "";
	director.value = "";
	year.value = "";
	
	// refresh the html table
	cm.displayMoviesAsATable("movies");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayMoviesAsATable("movies");
}

function loadList() {
	cm.load();
  	cm.displayMoviesAsATable("movies");
	assignTrashbinEventListeners();
}

function deleteMovie(index) {
	//effacer le film
	cm.removeMovie(index);
	//raffraîchir la page
	cm.displayMoviesAsATable("movies");
	assignTrashbinEventListeners();// ajout pour pas que les icones de corbeille s effacent
}


class Movie {
	constructor(name, imageSrc, mainActors, director, availableOn, year) {
		this.name = name;
		this.imageSrc = imageSrc;
		this.mainActors = mainActors;
		this.director = director;
		this.availableOn = availableOn;
		this.year = year;
	}
}

class MovieManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfMovies = [];
	}
	removeMovie(index){
		this.listOfMovies.splice(index, 1);
		//enregistrement
		this.save();
	}
	
	addTestData() {
		var c1 = new Movie("Fantastique Four", "https://fr.web.img3.acsta.net/pictures/22/08/04/17/01/4350130.jpg", "Adam Driver, Pedro Pascal", "Matt Shakman", "Currently in production", "2025");
  		var c2 = new Movie("The Hunger Games : The Ballad of Songbirds & Snakes", "https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_FMjpg_UX1000_.jpg", "Tom Blyth, Rachel Zegler, Hunter Schafer, Viola Davis", "Francis Lawrence", "Cinema, iTunes ", "2023");
  		var c3 = new Movie("The Marvels", "https://fr.web.img2.acsta.net/c_310_420/pictures/23/09/07/15/28/3776600.jpg", "Iman Vellani, Brie Larson, Teyonah Parris", "Nia DaCosta", "In cinema", "2023");
  		var c4 = new Movie("Haunted Mansion", "https://www.gamereactor.fr/media/26/_3972633b.png", "LaKeith Stanfield, Tiffany Haddish, Owen Wilson, Danny DeVito", "Justin Simien", "Amazon Prime Video, iTunes, Rakuken TV, Youtube", "2023");
  		var c5 = new Movie("Transformers: Rise of the Beasts", "https://www.cinema-florival.com/i/films/4093g.jpg", "Pete Davidson, Anthony Ramos, Peter Cullen, Ron Perlma, Dominique Fishback, Michelle Yeoh, Peter Dinklage, Tongayi Chirisa, Liza Koshy", "Steven Caple Jr.", "Amazon Prime Video, iTunes, Rakuken TV, Youtube", "2023");
		var c6 = new Movie("One Piece Film: Red", "https://i.ytimg.com/vi/MM_gd-f05mQ/maxresdefault.jpg", "Suuichi Ikeda, Mayumi Tanaka, Kaori Nazuka", "Gorō Taniguchi", "Amazon Prime Video, iTunes, Rakuken TV, Youtube, Univercine", "2022");
		var c7 = new Movie("The Nun II", "https://m.media-amazon.com/images/M/MV5BNjNmY2U5NDgtNTM0ZS00NGQ4LThiMmQtOTg1YzUyNWY2MDQ4XkEyXkFqcGdeQXNuZXNodQ@@._V1_.jpg", "Taissa Farmiga, Jonas Bloquet, Bonnie Aarons, Storm Reid", "Michael Chaves", "In Cinema, iTunes", "2023");
		var c8 = new Movie("The Dark Tower", "https://m.media-amazon.com/images/M/MV5BMTU3MjUwMzQ3MF5BMl5BanBnXkFtZTgwMjcwNjkxMjI@._V1_.jpg", "Idris Elba, Matthew McConaughey", "Nikolaj Arcel", "Amazon Prime Video, iTunes, Rakuken TV, Microsoft Movies & TV", "2017");
		var c9 = new Movie("One Punch Man: Road to Hero", "https://gamingonphone.com/wp-content/uploads/2020/08/ezgif.com-webp-to-jpg.jpg", "Kaito Ishikawa, Yuichi Nakamura, Yuki Kaji", "Minoru Yamaoka, Shingo Natsume", "Dailymotion", "2015");
		var c10 = new Movie("TRON: Legacy", "https://m.media-amazon.com/images/S/pv-target-images/64dab8064ed2ce6ef820adf61ce24a146030911f5f740ac6b5df3a3c924979ce.jpg", "Garrett Hedlund, Olivia Wilde", "Joseph Kosinski", "Amazon Prime Video, iTunes, Canal VOD, Disney", "2010");
		var c11 = new Movie("Howl's Moving Castle", "https://m.media-amazon.com/images/I/51XSIgFb6HL.jpg", "Takuya , Chieko Baisho,", "Hayao Miyazaki", "Amazon Prime Video, Arte Boutique, Benshi, Canal VOD, Filmo, Netflix, Rakuken TV", "2005");
		var c12 = new Movie("Aquaman and The Lost Kingdom", "https://s3.amazonaws.com/comicgeeks/comics/covers/large-7771066.jpg", "Jason Momoa, Amber Heard, Yahya Abdul", "James Wan", "In theatre", "2023");
		var c13 = new Movie("Madame Web", "https://media.cdnws.com/_i/147053/p%7B710%7D-16016/1108/16/fuite-du-logo-de-madame-web-une-forte-inspiration-spider-man-se-devoile-le-palais-des-goodies.jpeg", "Dakota Johnson, Adam Scott", "S. J. Clarkson", "In production", "2024");
		var c14 = new Movie("Deadpool 3", "https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2023-07/F0wBfWbWwAARqcx_0.jpeg", "Ryan Reynolds, Hugh Jackman", "Shawn Levy", "In production", "2024");
		var c15 = new Movie("Captain America: Brave New World", "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/04/captain-america-new-world-order-anthony-mackie.jpg", "Anthony Mackie", "Julius Onah", "In production", "2025");
		var c16 = new Movie("Thunderbolts", "https://i.jeuxactus.com/datas/evenements/m/a/marvel-cinematic-universe/xl/marvel-cinematic-universe-631df0a5b596a.jpg", "Florence Pugh, Sebastien Stan, Hannah John, Wyatt Russell, Julia Louis-Dreyfus", "Mark Bagley", "In production", "2025");
		var c17 = new Movie("Blade", "https://www.tvinsider.com/wp-content/uploads/2023/08/blade-770x433.jpg", "Mahershala Ali, Delroy Lindo", "Yann Demange", "In production", "2025");
		var c18 = new Movie("Avengers: The Kang Dynasty", "https://fr.web.img3.acsta.net/pictures/22/08/04/16/56/1665667.jpg", "Hailee Steinfeld, Jeremy Renner, Jonathan Majors, Paul Rudd, Kathryn Newton, Anthony Mackie, Tenoch Huerta", "Destin Daniel Cretton", "In production", "2026");
		var c19 = new Movie("Avengers: Secret Wars", "https://fr.web.img5.acsta.net/pictures/22/08/04/16/52/2212567.jpg", "Tom Holland, Mark Ruffalo, Jonathan Majors, Iman Vellani, Chris Hemsworth, Benedict Cumberbatch, Xochitl Gomez, Simu Liu, Kathryn Newton, Dominique Thorne, Anthony Mackie, Benedict Wong", "Destin Daniel Cretton", "In production", "2027");
		var c20 = new Movie("Mr. Monk's Last Case: A Monk Movie", "https://fr.web.img4.acsta.net/pictures/23/11/09/14/45/0004398.jpg", "Tony Shalhoub, Traylor Howard, Ted Levine", "Randy Zisk", "In theatre", "2023");

		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		this.add(c5);
		this.add(c6);
		this.add(c7);
		this.add(c8);
		this.add(c9);
		this.add(c10);
		this.add(c11);
		this.add(c12);
		this.add(c13);
		this.add(c14);
		this.add(c15);
		this.add(c16);
		this.add(c17);
		this.add(c18);
		this.add(c19);
		this.add(c20);


		this.printMoviesToConsole();
		this.displayMoviesAsATable("movies");
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
	
	// Will erase all contacts
	empty() {
		this.listOfMovies = [];
		this.displayMoviesAsATable("movies");
	}
	
	add(movie) {
		this.listOfMovies.push(movie);
	}
	
	remove(movie) {
		for(let i = 0; i < this.listOfMovies.length; i++) { 
			var c = this.listOfMovies[i];

			if(c.name === movie.name) {
				// remove the movie at index i
				this.listOfMovies.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	
	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfMovies.sort(MovieManager.compareByName);
	}
	
	// class method for comparing two contacts by name
	static compareByName(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
	
	printMoviesToConsole() {
		this.listOfMovies.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.movies !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfMovies = JSON.parse(localStorage.movies);
		};
	};
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.movies = JSON.stringify(this.listOfMovies);
	}; 
	
	
	 filtrerDonnees(val) {
		console.log(val);
		
		let tab = tableau.filter(elem => {
		  // ou startWith
		  return (elem.nom.includes(val))
		});
		
		// on récupère le table body
		let tbody = document.querySelector("#tableResultBody");
		tbody.innerHTML = "";
		
		tab.forEach(elem => {
		  tbody.innerHTML += "<tr><td>" + elem.nom + "</td><td>" + elem.prenom + "</td></tr>"
		})
	  }


  	displayMoviesAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfMovies.length === 0) {
			container.innerHTML = "<p>No movies to display!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
    	var table = document.createElement("table");
          
		//creer le header row du tableau
		var headerRow = table.createTHead().insertRow(0);
		// creer les header cells 
		var headers = ["Name", "Image ", "Available On","Main Actors", "Director", "Year"];
		for (var i = 0; i < headers.length;i++) {
			var headerCell = headerRow.insertCell(i);
			headerCell.innerHTML = headers[i];
		}


    	// iterate on the array of movies
    	this.listOfMovies.forEach(function(currentMovie, index) {
        	// creates a row
        	var row = table.insertRow();

			// Insert le nom de colonne
			var nameCell = row.insertCell(0);
			nameCell.innerHTML = currentMovie.name;
			//inserer image colonne
			var imageCell = row.insertCell(1);
			var image = document.createElement("img");
			image.classList.add("movie-image");
			image.src = currentMovie.imageSrc;
			imageCell.appendChild(image);
			// Insert le nom de colonne
			var availableOnCell = row.insertCell(2);
			availableOnCell.innerHTML = currentMovie.availableOn;
			// Insert le nom de colonne
			var mainActorsCell = row.insertCell(3);
			mainActorsCell.innerHTML = currentMovie.mainActors;
			// Insert le nom de colonne
			var directorCell = row.insertCell(4);
			directorCell.innerHTML = currentMovie.director;
			// Insert le nom de colonne
			var yearCell = row.insertCell(5);
			yearCell.innerHTML = currentMovie.year;

			var trashBinCell = row.insertCell(headers.length);
			var trashbin = document.getElementById("trashbin-icon").cloneNode(true);
			trashbin.classList.add("trashbin-icon");
			trashbin.dataset.movieIndex = index;
			trashBinCell.append(trashbin);
			
			trashbin.addEventListener("click", function (evt) {
				//appel d'une fonction pour supprimer le film
				deleteMovie(evt.target.dataset.movieIndex);
			});
     	});
  
     	// adds the table to the div
     	container.appendChild(table);

		// assigner les ecouteurs d evenement pour les icones de corbeille après le tri du tableau
		//assignTrashbinEventListeners();
  	}
}

function filtrerDonnees(val) {
	console.log(val);
	
	let filteredMovies =cm.listOfMovies.filter(movie => {
	  // ou startWith
	  return movie.name.toLowerCase().includes(val.toLowerCase());
	});
	
	// on récupère le table body
	let tbody = document.querySelector("#tableResultBody");
	tbody.innerHTML = "";
	
	filteredMovies.forEach(movie => {
	  tbody.innerHTML += "<tr><td>" + movie.name + "</td><td>" + movie.director + "</td></tr>";
	})
}

function assignTrashbinEventListeners() {
	//recuperer toutes les icones de corbeille dans le tableau
	var trashbins = document.querySelectorAll('.trashbin-icon');
	trashbins.forEach(function (trashbin) {
		trashbin.addEventListener('click', function (evt) {
		var index = evt.target.dataset.movieIndex;
			deleteMovie(index);
		});
	});
}

function loadList() {
	cm.load();
	cm.displayMoviesAsATable("movies");
}
