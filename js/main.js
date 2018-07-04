let headBox = document.querySelector('.head-bar');
let backTop = document.querySelector('.btn-scroll-top');

let sectionBox = document.querySelectorAll('.container .section');
let fideInUpBox = document.querySelectorAll('.container .fadeInUp');

for(let i = 0 ; i<fideInUpBox.length; i++){
    fideInUpBox[i].classList.add('out');
}

backTop.onclick = function () {
    let currentTop = window.scrollY;
    let t = Math.abs(currentTop / 100 * 200);
    if(t>800){t=800}
    let coords = { y: currentTop };
    let tween = new TWEEN.Tween(coords)
        .to({ y: 0 }, t)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
            window.scrollTo(0,coords.y)
        })
        .start();
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
            let targetTop =  element.offsetTop - 100;
            let t = Math.abs((targetTop - currentTop) / 100 *300);
            if(t>500){t=500}
            let coords = { y: currentTop };
            let tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, t)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onUpdate(function() {
                    window.scrollTo(0,coords.y)
                })
                .start();
		}
    }
}

let amsInput = document.querySelectorAll('.input-field input,.input-field textarea');

for (let i = 0; i<amsInput.length; i++){
	amsInput[i].onfocus = function () {
        this.parentNode.classList.add('used');
    };
    amsInput[i].onblur = function () {
        if(!this.value){
            this.parentNode.classList.remove('used');
        }
    }
}

function stickyHeader(){
    if(window.scrollY>0){
        headBox.classList.add('sticky');
        backTop.classList.add('show')
    }else{
        headBox.classList.remove('sticky');
        backTop.classList.remove('show')
    }
}

function highLightNav() {
    let minIndex = 0;
    for(let i = 0 ; i<sectionBox.length; i++){
        let bodyHeight = document.documentElement.clientHeight;
        let sectionTop = sectionBox[i].offsetTop;
        let sectionScrollTop = sectionTop - window.scrollY;
        if(sectionScrollTop < bodyHeight / 2){
            minIndex = i;
            let id = sectionBox[minIndex].id;
            let a = document.querySelector('a[href="#'+ id + '"]');
            let li = a.parentNode;
            let ali = li.parentNode.children;
            for(let i = 0; i<ali.length; i++){
                ali[i].classList.remove('active');
            }
            li.classList.add('active');
        }
    }
}

function boxUp() {
    let minIndex = 0;
    for(let i = 0 ; i<fideInUpBox.length; i++){
        let bodyHeight = document.documentElement.clientHeight;
        let upBoxTop = fideInUpBox[i].offsetTop;
        let upBoxScrollTop = upBoxTop - window.scrollY;
        if(upBoxScrollTop < bodyHeight - 150 && upBoxTop + fideInUpBox[i].offsetHeight > window.scrollY + 150){
            minIndex = i;
            fideInUpBox[minIndex].classList.remove('out');
        }
    }
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

let menuBtn = document.querySelector(".menu-btn"),
    navBar = document.querySelector('.head-nav'),
    overlay = document.querySelector('.overlay'),
    open;

menuBtn.addEventListener('click',function(){
    if(open){
        navBar.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.classList.remove('icon-guanbi');
        menuBtn.classList.add('icon-menu');
        open = false
    }else{
        navBar.classList.add('active');
        overlay.classList.add('active');
        menuBtn.classList.remove('icon-menu');
        menuBtn.classList.add('icon-guanbi');
        open = true
    }
});

overlay.addEventListener('click',function () {
    navBar.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.classList.remove('icon-guanbi');
    menuBtn.classList.add('icon-menu');
    open = false
});

function throttle(fn, delta, context) {
    let safe = true;
    return function() {
        // let args = arguments;
        if(safe) {
            fn.call(context);
            safe = false;
            setTimeout(function() {
                safe = true
            }, delta)
        }
    }
}

function setProjectItemHeight() {
    if(window.screen.width <= 640){
        let projectItem = document.querySelectorAll('.project-item');

        for(let i = 0; i < projectItem.length; i++){
            let height = projectItem[i].querySelector('.project-description').offsetHeight;
            projectItem[i].style.height = height + 'px';
        }
    }
}
setProjectItemHeight();
window.addEventListener('resize', throttle(setProjectItemHeight,500));

baguetteBox.run('.project-img');