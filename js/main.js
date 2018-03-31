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

/*$(function(){
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
});*/

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
let backTop = document.querySelector('.btn-scroll-top');

stickyHeader();

function stickyHeader(){
    if(window.scrollY>0){
        headBox.classList.add('sticky');
        backTop.classList.add('show')
    }else{
        headBox.classList.remove('sticky');
        backTop.classList.remove('show')
    }
}

window.onscroll = function () {
    stickyHeader();
};

backTop.onclick = function () {
	window.scrollTo(0,0);
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
            let currentTop = window.scrollY;
            let n = 30;
            let t = Math.floor(500 / n);
            let i = 0;
            let distance =  Math.floor((element.offsetTop - currentTop -80) / n);
            let timer = setInterval(function () {
                if(i === n) {
                    clearInterval(timer);
                    return
                }
                i++;
                window.scrollTo(0,currentTop + distance * i);
            },t)
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

let aFilterBtn = document.querySelectorAll('.filter-btn button');
let filterLine = document.querySelector('.filter-bar-line');
let nFbLeft = document.querySelector('.filter-bar').offsetLeft;

for (let i =0; i<aFilterBtn.length; i++){
    aFilterBtn[i].onclick = function () {
    	for(let i =0; i<aFilterBtn.length; i++){
            aFilterBtn[i].classList.remove('active')
		}
		this.classList.add('active');

		let nBtnLeft = Math.floor(this.offsetLeft - nFbLeft);
		let NBtnWidth = Math.ceil(this.offsetWidth);
        filterLine.style.left = nBtnLeft + 'px';
        filterLine.style.width = NBtnWidth + 'px';
    }
}
