!function () {
    var view = document.querySelector("#message");

    var model = {
        init: function () {
            var APP_ID = '69un2Mo80h7qFpuS5CuUXVG0-gzGzoHsz';
            var APP_KEY = 'IUPRcnbMhoogWCGSPykB8wCN';

            AV.init({appId: APP_ID, appKey: APP_KEY});
        },
        fetch: function () {
            var query = new AV.Query('message');
            return query.find()
        },
        save: function (name,email,content) {
            var Message = AV.Object.extend('message');
            var message = new Message();
            return message.save({
                name: name,
                email: email,
                content: content
            })
        }
    };

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view;
            this.model = model;
            this.form = view.querySelector("#message-form");
            this.messageList = view.querySelector(".message-list-ul");
            this.model.init();
            this.loadMessages();
            this.bindEvents();
        },
        createTags: function (tagName,className,conText) {
            let tag = document.createElement(tagName);
            tag.classList.add(className);
            tag.innerText = conText;
            return tag
        },
        createMessagesList: function (name,content,time) {
            let li = document.createElement('li');
            li.classList.add('message-item','hide');
            li.appendChild(this.createTags('span','name',name));
            li.appendChild(this.createTags('p','content',content));
            li.appendChild(this.createTags('div','message-time',time));

            let item = document.querySelectorAll(".message-item");
            if(item.length>0){
                this.messageList.insertBefore(li,item[0]);
            }else{
                this.messageList.appendChild(li);
            }
            setTimeout(()=> {li.classList.remove('hide')}, 100)
        },
        loadMessages: function () {
            model.fetch().then((messages) => {
                let array = messages.map((item) => {
                    let obj = {};
                    Object.assign(obj, item.attributes);
                    obj['date'] = item.createdAt.getFullYear() + '-'
                        + (item.createdAt.getMonth() + 1) + '-'
                        + item.createdAt.getDate() + ' '
                        + item.createdAt.getHours() + ':'
                        + item.createdAt.getMinutes();
                    return obj
                });
                array.forEach((item) => {
                    this.createMessagesList(item.name,item.content,item.date)
                })
            }).then(() => {}, (error) => console.log(error));
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savaMessage();
            })
        },
        savaMessage: function(){
            let messageForm = this.form;
            let name = messageForm.querySelector("input[name=user-name]").value;
            let email = messageForm.querySelector("input[name=user-email]").value;
            let content = messageForm.querySelector("textarea[name=message-content]").value;

            model.save(name,email,content).then(() => {
                messageForm.reset();
                let inputs = messageForm.querySelectorAll(".input-field input, .input-field textarea");
                for(let i = 0; i < inputs.length; i++){
                    inputs[i].parentNode.classList.remove('used');
                }
                let date = new Date();
                let messageDate = date.getFullYear() + '-'
                    + (date.getMonth() + 1) + '-'
                    + date.getDate() + ' '
                    + date.getHours() + ':'
                    + date.getMinutes();
                this.createMessagesList(name,content,messageDate)
            },() => console.log("提交留言失败，请重试！") )
        }
    };
    controller.init(view, model)
}.call();

