/**
 * Created by santiago on 4/11/15.
 */

$( document ).ready(function() {
	
	var $images = $('#products_table');
	
	loadCats();
	loadSubcats("MLA5725");
	loadImages("MLU1747");

	var $cats = $('#cats');
	$cats.change(function() {
		var $cats = $('#cats');
		var $subcats = $('#subcats');
		loadSubcats($cats.val());
		loadImages($subcats.val());
	});

	var $subcats = $('#subcats');
	$subcats.change(function() {
		var $subcats = $('#subcats');
		loadImages($subcats.val());
	});

	$( "#btnPublish" ).click(function() {
		console.log('btnPublish');
		console.log(svgCanvas.getSvgString());

		$.post("/api/sets",
			{
				picture: svgCanvas.getSvgString(),
				title: 'New set',
				likeCount: 2,
				userId: '5529c014b7626860bc25de99'
			},
			function(data,status){
				console.log(data);
				location.href = '/set.html?id=' + data._id;

				//var saveChanges = function() {
				//	svgCanvas.clearSelection();
				//	//hideSourceEditor();
				//	//zoomImage();
				//	Editor.paintBox.fill.prep();
				//	Editor.paintBox.stroke.prep();
				//
				//	location.href = '/set.html?id=' + data._id;
				//};
				//
				//if (!svgCanvas.setSvgString($('#svg_source_textarea').val())) {
				//	$.confirm(uiStrings.notification.QerrorsRevertToSource, function(ok) {
				//		if(!ok) return false;
				//		saveChanges();
				//	});
				//} else {
				//	saveChanges();
				//}
				//setSelectMode();


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
	});
}

function loadImages(cat) {
	var $images = $('#products_table');
	$images.empty();
	$.getJSON( "https://api.mercadolibre.com/sites/MLU/search?category=" + cat, function( data ) {
		data.results.forEach(function(item){
			$images.append( '<img src="' + item.thumbnail + '" title="' + item.title + '" ondragstart="drag(event)" />' );
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
	console.log();
}

function drop(ev) {

	console.log(ev);

	ev.preventDefault();
	var imageSrc  = ev.dataTransfer.getData("src");

	$("<img/>").attr("src", imageSrc).load(function(){

		//var resizedWidth = this.width;
		//var resizedHeight = this.height;

		//if (this.height > 100){
		//	resizedHeight = 100;
		//	var porcentajeReduccion = (100*100) / this.height;  //regla de 3 para dejar la altura de 100px
		//	resizedWidth = (porcentajeReduccion * this.width) / 100;
		//}
		//else if(this.width > 100){
		//	resizedWidth = 100;
		//	var porcentajeReduccion = (100*100) / this.width;  //regla de 3 para dejar la altura de 100px
		//	resizedHeight = (porcentajeReduccion * this.height) / 100;
		//
		//}
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
				"mlId": "MLU425156179"
			}
		};
		console.log(data);
		svgCanvas.addSvgElementFromJson(data);
	});
}
