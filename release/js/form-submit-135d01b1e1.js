
var formSubmit = function (form_selector) {
    var prev_name;
    //最终转化为的json数据格式
    var form_data = {};
    //处理input型表单
    $('input,textarea', form_selector).each(function (index, node) {
        var name, value;
        var inputType = node.type;
        if (inputType == 'radio') {
            //处理radio类型表单
            if (node.checked) {
                name = node.name;
                value = node.value;
                if (value == 'yes') {
                    form_data[name] = true;
                } else if (value == 'no') {
                    form_data[name] = false;
                } else {
                    form_data[name] = value;
                }
            }
        } else if (inputType == 'checkbox') {
            //处理checkbox类型表单
            if ($(node).hasClass('judge-checkbox')) {
                //这是那种为了表示是否的复选框
                name = node.name
                if (node.checked) {
                    form_data[name] = true;
                } else {
                    form_data[name] = false;
                }
            } else {
                //为了多选的复选框
                if (node.checked) {
                    name = node.name;
                    value = node.value;
                    if (name == prev_name) {
                        //遇到的仍是上一个checkbox群
                        form_data[name].push(value);
                    } else {
                        //遇到了一个新的checkbox群
                        form_data[name] = [];
                        form_data[name].push(value);
                    }
                    prev_name = name;
                }
            }
        } else if (inputType == 'file') {
            if (node.files.length > 0) {
                form_data[node.name] = node.files[0];
            }
        } else {
            //处理text类型表单
            name = node.name;
            value = node.value;
            form_data[name] = value;
        }
    });
    //处理select类型表单，由于该业务中无复选select故不考虑这种情况
    $('select', form_selector).each(function (index, node) {
        var name, value;
        name = node.name;
        value = $(node).val();
        form_data[name] = value;
    });

    return form_data;
};
