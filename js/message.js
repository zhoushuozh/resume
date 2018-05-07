var APP_ID = '69un2Mo80h7qFpuS5CuUXVG0-gzGzoHsz';
var APP_KEY = 'IUPRcnbMhoogWCGSPykB8wCN';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('message');
query.find().then(
    function (messages) {
        let array = messages.map((item) => {
            let obj = {};
            Object.assign(obj, item.attributes);
            obj['date'] = item.createdAt.getFullYear() + '-'
                + (item.createdAt.getMonth() + 1) + '-'
                + item.createdAt.getDate() + ' '
                + item.createdAt.getHours() + ':'
                + item.createdAt.getMinutes()
            return obj
        });
        array.forEach((item) => {
            createLi(item.name,item.content,item.date)
        })
    }).then(
        () => {},
        (error) => console.log(error)
    );

let messageForm = document.querySelector("#message-form");
messageForm.addEventListener('submit',function (e) {
    e.preventDefault();
    let name = messageForm.querySelector("input[name=user-name]").value;
    let email = messageForm.querySelector("input[name=user-email]").value;
    let content = messageForm.querySelector("textarea[name=message-content]").value;

    var Message = AV.Object.extend('message');
    var message = new Message();
    message.save({
        name: name,
        email: email,
        content: content
    }).then(() => {
        messageForm.reset();
        let inputs = messageForm.querySelectorAll(".input-field input, .input-field textarea");
        for(let i = 0; i < inputs.length; i++){
            inputs[i].parentNode.classList.remove('used')
        }
        let date = new Date();

        let messageDate = date.getFullYear() + '-'
            + (date.getMonth() + 1) + '-'
            + date.getDate() + ' '
            + date.getHours() + ':'
            + date.getMinutes();
        createLi(name,content,messageDate)
    },() => console.log("提交留言失败，请重试！") )
})

function createLi(name,content,time){
    let li = document.createElement('li');
    li.classList.add('message-item','hide');

    let span = document.createElement('span');
    span.classList.add('name');
    span.innerText = name;
    li.appendChild(span);

    let p = document.createElement('p');
    p.classList.add('content');
    p.innerText = content;
    li.appendChild(p);

    let div = document.createElement('div');
    div.classList.add('message-time');
    div.innerText = time;
    li.appendChild(div);

    let item = document.querySelectorAll(".message-item");
    if(item.length>0){
        document.querySelector('.message-list-ul').insertBefore(li,item[0]);
    }else{
        document.querySelector('.message-list-ul').appendChild(li);
    }
    setTimeout(()=> {li.classList.remove('hide')}, 300)
}

