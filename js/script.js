
// vars
var backpage = 'home';
var backbtn = document.getElementById("backbtn");
backbtn.classList = 'hide';
var menuicon = document.getElementById("menuicon");
var nav = document.getElementById("nav");

// show navigation
function shownavigation(argument) {
	
	nav.classList.toggle('shownav');
	if ( nav.classList != "shownav") {
		menuicon.classList = '';
	} else {
		menuicon.classList = 'open';
	}

}

// run nav
async function runnav(here) {
	// return if empty
	if (here.trim().length === 0) {
		backbtn.classList = 'hide';
		return
	} 
	// return if shop
	if (here == 'shop') {
		// console.log('shop')
		shop();
		setbackbtn();
		return
	}

	backbtn.classList = '';
	setbackbtn();
	let file = await fetch('pages/'+here+'.md');
	let text = await file.text();
	var article = document.createElement('article');
	article.innerHTML = marked.parse(text);
	content.innerHTML = '';
	content.appendChild(article);
	history.replaceState(undefined, undefined, "#"+here);
	document.body.className = 'page-'+here;
}


// create html from md file
async function run(folder, here) {
	let file = await fetch(folder +'/'+ here +'.md');
	let text = await file.text();
	var article = document.createElement('article');
	article.innerHTML = marked.parse(text);
	article.id = here;
	content.appendChild(article);
}


// create nav from md file
async function shop() {
	let file = await fetch('pages/shop.md');
	let text = await file.text();
	var nav = document.createElement('div');
	nav.id = 'navigation';
	nav.innerHTML = marked.parse(text);
	content.innerHTML = '';
	content.appendChild(nav);
	history.replaceState(undefined, undefined, "#shop");


	// render pages from nav
	for(var i = 0; i < nav.childNodes[0].children.length; i++) {
		run('products',nav.childNodes[0].children[i].innerHTML); 
	}
	document.body.className = 'page-shop';
}

// set back
function setbackbtn() {
	backpage = window.location.hash.substring(1);
	backbtn.setAttribute('onclick', "runnav('"+ backpage +"')");
}


// start
// load page from URL
if(window.location.hash) {
	var hash = window.location.hash.substring(1);
	if (hash == 'shop') {
		shop()
	} else {
		run('pages',hash);				
	}
	history.replaceState(undefined, undefined, "#"+hash)
	document.body.className = 'page-'+hash;

} else {
	run('pages','home');
	document.body.className = 'page-home';
}