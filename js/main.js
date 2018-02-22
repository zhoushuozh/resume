$(function(){
	function fnHead(){
		if($(window).scrollTop() == 0){
			$(".head-bar").removeClass("head-active");
			$(".btn-scroll-top").fadeOut();
		}else{
			$(".head-bar").addClass("head-active");
			$(".btn-scroll-top").fadeIn();
		}
	}
	fnHead();

	$(window).scroll(function(){
		fnHead();
	})
})

$(function(){
	var fbLeft = $(".filter-bar").offset().left;

	$(".filter-btn button").click(function(){

		var fLeft = Math.floor($(this).offset().left-fbLeft);
		var fWidth = Math.ceil($(this).width());
		
		$(".filter-btn button").removeClass("active");
		$(this).addClass("active");

		$(".filter-bar-line").css({"width":fWidth,"left":fLeft});
	})
})

$(".btn-scroll-top").click(function(e){
	$("html, body").animate({scrollTop:0});
})

$(function(){
	$(".input-field input,.input-field textarea").focus(function(){
		$(this).parent().addClass("used");
	})

	$(".input-field input,.input-field textarea").blur(function(){
		$(this).parent().removeClass("used");
	})
})

$(".message-board").css({"min-height":$(".contact-text").height()});


