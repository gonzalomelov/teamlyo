if(document.location.toString().indexOf('#filter=.blog')!=-1){

	$("#page_nav").css("display","block");
	
} else {

	$("#page_nav").css("display","none");

}

if(document.location.toString().indexOf('#filter=.page-contact')!=-1){


	$("#map_canvas").animate({opacity:'1'});
	$("#map_canvas").css("left","0");
	$("#map_canvas").css("top","75px");
	
	
	
} else {

	$("#map_canvas").animate({opacity:'0'});
	$("#map_canvas").css("left","-9999px");
	$("#map_canvas").css("top","-9999px");

}