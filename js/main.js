$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() == 0){
			$(".head-bar").removeClass("head-active");
			$(".header").css({"min-height":"0"});
		}else{
			$(".header").css({"min-height":"60px"});
			$(".head-bar").addClass("head-active");
		}
	})
})