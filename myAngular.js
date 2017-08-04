var itcast = {};
        itcast.controller = function(str,model){
            var ele = document.querySelector(str);
            ele.innerHTML = ele.innerHTML
                                    .replace('{{title}}',model.title)
                                    .replace('{{subject}}',model.subject);
        }