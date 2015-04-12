/**
 * Created by santiago on 4/11/15.
 */


var items = [];

$( document ).ready(function() {

	items = [];

	var $images = $('#products_table');

	loadCats();
	loadSubcats("MLA5725");
	loadImages("MLU1747");

	var $cats = $('#cats');
	$cats.change(function() {
		var $cats = $('#cats');
		loadSubcats($cats.val());
	});

	var $subcats = $('#subcats');
	$subcats.change(function() {
		var $subcats = $('#subcats');
		loadImages($subcats.val());
	});

	$( "#btnPublish" ).click(function() {
		console.log('btnPublish');

		var body = {
			picture: svgCanvas.getSvgString(),
			title: $("#title").val(),
			likeCount: 2,
			userId: '5529c014b7626860bc25de99'
		};
		$.post("/api/sets",
			body,
			function(data,status){
				console.log(data);
			});
	});

	var $title = $("#title");
	$title.focus();
});

function loadCats() {
	var $cats = $('#cats');
	$.getJSON( "https://api.mercadolibre.com/sites/MLU/categories", function( data ) {
		data.forEach(function(item){
			$cats.append( '<option value="' + item.id + '">' + item.name + '</option>' );
		});
	});
}

function loadSubcats(cat) {
	var $subcats = $('#subcats');
	$subcats.empty();
	$.getJSON( "https://api.mercadolibre.com/categories/" + cat, function( data ) {
		data.children_categories.forEach(function(item){
			$subcats.append( '<option value="' + item.id + '">' + item.name + '</option>' );
		});
		loadImages($subcats.val());
	});
}

function loadImages(cat) {
	var $images = $('#products_table');
	$images.empty();
	$.getJSON( "https://api.mercadolibre.com/sites/MLU/search?category=" + cat, function( data ) {
		data.results.forEach(function(item){
			$images.append( '<img src="' + item.thumbnail + '" title="' + item.title + '" ondragstart="drag(event)" id="' + item.id + '" />' );
		});
	});
}

function allowDrop(ev) {
	ev.preventDefault();
}

function getMeta(url){
	$("<img/>").attr("src", url).load(function(){
		return  {w:this.width, h:this.height};
	});
}

function drag(ev) {

	ev.dataTransfer.setData("src", ev.target.src);
	ev.dataTransfer.setData("mlId", ev.target.id);
	console.log();
}

function drop(ev) {

	console.log(ev);

	ev.preventDefault();
	var imageSrc  = ev.dataTransfer.getData("src");
	var mlId  = ev.dataTransfer.getData("mlId");
	items.push(mlId);

	$("<img/>").attr("src", imageSrc).load(function(){
		var resizedWidth = 100;
		var resizedHeight = 100;
		var x = ev.layerX - 335;
		var y = ev.layerY - 145;
		var data = {
			"element": "image",
			"attr": {
				"x": x,
				"y": y,
				"width": resizedWidth + 'px',
				"height": resizedHeight + 'px',
				"xlink:href": imageSrc,
				"mlId": mlId,
				"onmouseover" : "ShowTooltip(evt);",
				"onmouseout" : "HideTooltip(evt);"
			}
		};
		console.log(data);
		svgCanvas.addSvgElementFromJson(data);
	});
}

