// variables
const input = document.querySelector('.main-search');
const searchBtn = document.querySelector('.main-btn');

// events
searchBtn.addEventListener('click', searchWiki);

// functions
// search wiki
function searchWiki(event) {
 event.preventDefault();
 showGif('show');
 let searchValue = input.value;

 const origin = "https://en.wikipedia.org";
 const url = `${origin}/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${searchValue}`

 fetch(url).then(function (data) {
  return data.json()

 }).then(displayData).catch(function (error) {
  console.log('There was an error')
 })
}

// show/hide gif
function showGif(value) {
 if (value === 'show') {
  document.querySelector('.wait-icon').classList.add('show')
 } else if (value === 'hide') {
  document.querySelector('.wait-icon').classList.remove('show')

 }
}

// display Data
function displayData(data) {
 console.log(data);
 let results = data.query.search;
 console.log(results);
 let output = '';
 results.forEach(e => {
  output += `
   <li class="search-item">
    <h2 class="search-item__title">
     ${e.title}
    </h2>
    <p class="search-item__text">
     ${e.snippet}
    </p>
    <a target = "_blank"
    class = "search-item__link"
    href = "http://en.wikipedia.org/?curid=${e.pageid}" >
     read more...
    </a>
   </li>`
 });
 document.querySelector('.results').innerHTML = output;
 showGif('hide');
 input.value = '';
}