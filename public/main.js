function renderSearchResults(arrayOfObjects) { 
	arrayOfObjects.forEach(function(d){
		var heading = $('<h3>Search Results: </h3>');
		var name = $('<div>Country Name: '+d.name+'</div>');
		var frenchName = $('<div>French Name: '+d.frenchName+'</div>');
		var region = $('<div>Region: '+d.region+'</div>');

		var searchItem = $('<div class="search-container"></div>');
		searchItem.append(heading,name, frenchName, region);
		$('body').append(searchItem);

	})
}

function renderList(arrayOfObjects, cb) {
	var list = $('<ul></ul>');
	var listItems = arrayOfObjects.map(function(d){
		var heartContainer = $('<div class="heart-container"></div>');
		var emptyHeart = $('<span class="glyphicon glyphicon-heart-empty"></span>');
		var filledHeart = $('<span class="glyphicon glyphicon-heart"></span>');
		var item = $('<li class="country-name">' + d.name + '</li>');
		if (d.hasTraveled) {
			emptyHeart.css('display', 'none');
			filledHeart.css('display', 'block');
			heartContainer.append(emptyHeart, filledHeart);
			item.append(heartContainer);
			list.append(item);

			return cb(list)
		}

		else {
			emptyHeart.css('display', 'block');
			filledHeart.css('display', 'none');
			heartContainer.append(emptyHeart, filledHeart);
			item.append(heartContainer);
			list.append(item);

			return cb(list)
		}
	})
}


$(function(){

	$(document).on('click', '.load-countries', function(){
		$.get('/countries', function(data){
			renderList(data, function(d){
				$('body').append(d);
			})
		});
	});

	$('form').on('submit', function(e){
		e.preventDefault();

		var inputElement = $(this).find('input[name=search]');
		console.log(inputElement.val());

		$.post('/search', {search: inputElement.val()}, function(data){
			renderSearchResults(data);

		});
	});

	$(document).on('click', 'span', function(){
		$(this).siblings().toggle();
		var countryName = $(this).parent().parent().text();

		var checkTravel = $(this).siblings('.glyphicon-heart').css('display');
		var hasTraveled;
		if (checkTravel === 'block') {
			hasTraveled = true;
		}
		else{
			hasTraveled = false;
		}


		$.get('/travel', {name: countryName, hasTraveled: hasTraveled}, function(data){
			renderSearchResults(data);
		});
	})

})