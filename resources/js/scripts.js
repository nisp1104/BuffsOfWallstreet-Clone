var news_array = '';
var category_array = '';
var loaded = false;
var selected_category = 'general';

/*
  converts the given dateTime (UNIX) into Month, Date, Year
*/
function convertDateTime(dateTime) {
  var time = parseInt(dateTime);
  var temp = new Date(time * 1000);
  var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
  var year = temp.getFullYear();
  var month = months[temp.getMonth()];
  var date = temp.getDate();
  var final = month + ' ' + date + ', ' + year;
  return final;
}

function loadNewsPage() {
  var api_url = `https://finnhub.io/api/v1/news?category=general&token=bu6sjt748v6rghl7koq0`;
  var temp = '<div class="card-deck">';
  $.ajax({url:api_url, dataType: "json"}).then(function(data) {
    news_array = data;
    
    for(var i = 0; i < 9; ++i) {
      var card = `
      <div class="card text-white bg-dark mb-3" id="art${i}">
          <a id="art${i}URL" href="${news_array[i].url}" style="color: inherit;">
            <img class="card-img-top" id="art${i}Img" src="${news_array[i].image}" alt="News Headline ${i + 1} Image">
          </a>
          <div class="card-body">
            <h5 class="card-title" id="art${i}Title">${news_array[i].headline}</h5>
            <p class="card-text" id="art${i}Summary">${news_array[i].summary}</p>
            <p class="card-text">
              <small class="text-muted" id="art${i}Time">
                ${convertDateTime(news_array[i].datetime)}
              </small>
            </p>
          </div>
        </div>
      `;
      temp += card;
      if((i + 1) % 3 == 0) {
        temp += `
          </div>
          <br>
          <div class="card-deck">
        `
      }
    }
    temp += "</div>\n<br>\n<br>"
    document.getElementById('newsCards').innerHTML = temp;
  })
  
  loaded = true;
}

function callStockInfoForUser(){
	$.ajax({url: '/stock_info', type: 'get'}).then(function(res){
		// use the json data in res to populate the stocks table of the profile page.
		
		var numCol = 3; //3 columns in table: symbol, quantity owned, and price brought in 
		
		table = document.getElementById("Positions"); //table from HTML
	  	var tr = document.createElement("tr"); //new row
		for(var i =0; i < res.stockData.length; i ++){
		    tr = table.insertRow(-1);
		    var tkrCell = tr.insertCell(0);
		    var qtyCell = tr.insertCell(1);
		    var prcCell = tr.insertCell(2);
		    tkrCell.innerHTML = res.stockData[i].ticker;
		    qtyCell.innerHTML = res.stockData[i].qty.toString();
		    prcCell.innerHTML = res.stockData[i].price.toString();
		}
	})
}

$(callStockInfoForUser);

/* 
  When a button is clicked on the news page, this will update the articles shown.
*/
function changeNewsPage(pageNum) {
  if(!loaded) {
    alert("Please let the data load before changing pages.");
    return;
  }
  var url, img, title, summary, time, value;

  for(var i = 0; i < 9; ++i) {
    value = "art" + (i + 1).toString();

    url = document.getElementById(value + "URL");
    img = document.getElementById(value + "Img");
    title = document.getElementById(value + "Title");
    summary = document.getElementById(value + "Summary");
    time = document.getElementById(value + "Time");

    url.href = news_array[pageNum*9 + i].url;
    img.src = news_array[pageNum*9 + i].image;
    title.innerHTML = news_array[pageNum*9 + i].headline;
    summary.innerHTML = news_array[pageNum*9 + i].summary;
    time.innerHTML = convertDateTime(news_array[pageNum*9 + i].datetime);
  }
}

function filterCategory(category) {
  var url, img, title, summary, time, value;
  var api_url = `https://finnhub.io/api/v1/news?token=bu6sjt748v6rghl7koq0&category=${category}`;
  $.ajax({url:api_url, dataType:"json"}).then(function(data) {
    category_array = data;
    for(var i = 0; i < 9; ++i) {
      value = "art" + (i + 1).toString();
  
      url = document.getElementById(value + "URL");
      img = document.getElementById(value + "Img");
      title = document.getElementById(value + "Title");
      summary = document.getElementById(value + "Summary");
      time = document.getElementById(value + "Time");
  
      url.href = category_array[i].url;
      img.src = category_array[i].image;
      title.innerHTML = category_array[i].headline;
      summary.innerHTML = category_array[i].summary;
      time.innerHTML = convertDateTime(category_array[i].datetime);
    }
  })
  selected_category = category;
}

/* Registration JavaScript for disabling submit button until required fields are not empty*/
function fields_empty() {
  var fname, lname, uname, pword, pworda, submit;
  fname = document.getElementById("first-name");
  lname = document.getElementById("last-name");
  uname = document.getElementById("username");
  pword = document.getElementById("password");
  pworda = document.getElementById("password-auth");
  submit = document.getElementById("reg-button");
  if (fname.value == "" || lname.value == "" || uname.value == "" || pword.value == "" || pworda.value == "")
  {
    submit.disabled = true;
  }
  if (fname.value != "" && lname.value != "" && uname.value != "" && pword.value != "" && pworda.value != "")
  {
    submit.disabled = false;
  }
}

/* Registration JavaScript for checking password verification. Will not allow submission until passwords match*/
function valid() {
  var pword, pworda;
  pword = document.getElementById("password");
  pworda = document.getElementById("password-auth");
  if (pword.value != pworda.value)
  {
    alert("Passwords do not match!! Please re-enter matching passwords to continue. (ALL FIELDS CASE SENSITIVE)")
    return false;
  }
  else
  {
    return true;
  }
}
/*Trade JavaScript*/

var buyOrSell = 0; //0 means a buy 1 will indicate user wants to sell stock
var ticker = "";

//User selects buy/sell
function showHide(toggle){
  var buyForm = document.getElementById('buyStock');
  var sellForm = document.getElementById("sellStock");
  if(toggle == 0){
    sellForm.style.visibility = 'hidden';
    buyForm.style.visibility = 'visible';
    var elements = sellForm.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
    var elements = buyForm.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = false;
    }
  }
  else{
    buyForm.style.visibility = 'hidden';
    sellForm.style.visibility = 'visible';
    var elements = buyForm.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
    var elements = sellForm.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = false;
    }
  }
  
}




