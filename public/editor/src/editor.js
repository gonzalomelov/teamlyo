/**
 * Created by santiago on 4/11/15.
 */

$( document ).ready(function() {

	var select = $('#cats');

	$.getJSON( "https://api.mercadolibre.com/sites/MLA/categories", function( data ) {

		data.forEach(function(item){
			select.append( '<option value="' + item.id + '">' + item.name + '</option>' );
		});

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
				location.href = '/sets/' + data._id;
			});
	});


});
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

		var resizedWidth = this.width;
		var resizedHeight = this.height;

		if (this.height > 100){
			resizedHeight = 100;
			var porcentajeReduccion = (100*100) / this.height;  //regla de 3 para dejar la altura de 100px
			resizedWidth = (porcentajeReduccion * this.width) / 100;
		}
		else if(this.width > 100){
			resizedWidth = 100;
			var porcentajeReduccion = (100*100) / this.width;  //regla de 3 para dejar la altura de 100px
			resizedHeight = (porcentajeReduccion * this.height) / 100;

		}
		var x = ev.layerX - 300;
		var y = ev.layerY - 200;
		var data = {
			"element": "image",
			"attr": {
				"x": x,
				"y": y,
				"width": resizedWidth + 'px',
				"height": resizedHeight + 'px',
				"xlink:href": imageSrc
			}
		};
		console.log(data);
		svgCanvas.addSvgElementFromJson(data);
	});
}