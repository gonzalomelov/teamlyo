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

		$.post("demo_test_post.asp",
			{
				name: "Donald Duck",
				city: "Duckburg"
			},
			function(data,status){
				alert("Data: " + data + "\nStatus: " + status);
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

	ev.preventDefault();
	var imageSrc  = ev.dataTransfer.getData("src");

	$("<img/>").attr("src", imageSrc).load(function(){

		var meta = {w:this.width, h:this.height};

		var data = {
			"element": "image",
			"attr": {
				"x": 0,
				"y": 0,
				"width": this.width + 'px',
				"height": this.height + 'px',
				"xlink:href": imageSrc
			}
		};

		console.log(data);
		svgCanvas.addSvgElementFromJson(data);
	});
}