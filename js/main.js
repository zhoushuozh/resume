/*$(function(){
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
})*/

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
});

/*$(function(){
	$(".message-board").css({"min-height":$(".contact-text").height()});

	$(".input-field input,.input-field textarea").focus(function(){
		$(this).parent().addClass("used");
	})

	$(".input-field input,.input-field textarea").blur(function(){
		$(this).parent().removeClass("used");
	})
})*/

let headBox = document.querySelector('.head-bar');
stickyHeader();

function stickyHeader(){
    if(window.scrollY>0){
        headBox.classList.add('sticky')
    }else{
        headBox.classList.remove('sticky')
    }
}

window.onscroll = function () {
    stickyHeader();
};

let aNavTags = headBox.querySelectorAll('.head-nav ul li a');

for(let i = 0; i<aNavTags.length; i++){
	aNavTags[i].onclick = function (event) {
		event.preventDefault();
		let a = event.currentTarget;
		let href = a.getAttribute('href');
		if(href === '' || href === '#'){
			return false
		}else{
            let element = document.querySelector(href);
            let top = element.offsetTop;
            window.scrollTo(0,top);
		}
    }
}

let amsInput = document.querySelectorAll('.input-field input,.input-field textarea');

for (let i = 0; i<amsInput.length; i++){
	amsInput[i].onfocus = function () {
        this.parentNode.classList.add('used');
    };
    amsInput[i].onblur = function () {
        this.parentNode.classList.remove('used');
    }
}