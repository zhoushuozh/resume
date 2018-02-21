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