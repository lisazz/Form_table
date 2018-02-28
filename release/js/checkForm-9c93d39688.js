/**
 * Created by wb-ls255707 on 2017/6/22.
 */
var checkForm = function(){

 /**
  * [check 在validate之上的一层包装]
  * 依赖jquery和validate
  * @param  {[type]} form_selector [获取form的selector]
  * @param  {[type]} rule          [校验规则]
  * @param  {[type]} submitHandler [提交表单时调用]
  * @param  {[type]} cancelHandler [返回时调用]
  * @return {[type]}               [返回check函数]
  */
    function check(form_selector,rule,submitHandler,cancelHandler) {

        var form = $(form_selector);
        var error = $('.alert-danger', form);
        var success = $('.alert-success', form);

        form.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            rules: rule,
            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                success.hide();
                error.show();
                Metronic.scrollTo(error, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                success.show();
                error.hide();
                submitHandler()

            }

        });

        //取消操作
        form.find('.J_formCancel').on('click', cancelHandler);
    }
    return {
        check ,
    }

}()
