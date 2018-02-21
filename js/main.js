$(function(){
	function fnHead(){
		if($(window).scrollTop() == 0){
			$(".head-bar").removeClass("head-active");
		}else{
			$(".head-bar").addClass("head-active");
		}
	}
	fnHead();

	$(window).scroll(function(){
		fnHead();
	})
})