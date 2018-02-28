(function(){

  // 增加字段
    $('.value-plus').on('click',function(){
      var addtbody = Handlebars.compile($('#addtbody').html())
      $('.form-table').append(addtbody());
    })
  //删除字段
    $('.form-table').on('click','.delValue',function(){
      $(this).parents('tbody').remove();
    })
  // 获取模板函数 on change内部优化
  function getTemplate(templateId,locations,data){
    // 获取模板
    var addobj = Handlebars.compile($('#'+templateId).html());
    $(locations).parents('tr').after(addobj(data))
  }

  // select 默认值
  function selected(selectName,dataArray,selectVal){
    var selector = $('select[name="'+ selectName +'"]');
    $.each(dataArray,function(index, data) {
        if(data[selectVal]){
          $($(selector)[index]).val(data[selectVal])
        }
    })
  }
  // select切换
  $('.form-table').on('change','select[name="value.type"]',function(){
    var val = $(this).val() ;
    if(val == 'OBJECT' || val == 'ENUM' || val == 'EXTERN'){
      var showSubValues= $(this).parents('tr').next('.showSubValues');
      if(showSubValues.length > 0){
        showSubValues.remove()
      }
      if(val == 'OBJECT'){
        var obj = {
          obj_array_separator:'',
          tuple_separator:'',
          segment_separator:'',
          combine_value:[
            {
              name:'',
              type:'',
              comment:'',
              arksType:'',
              sourceName:'',
              keyName:''
            },
          ]
        }
        getTemplate('obj',this,obj);
        var dataArray = obj.combine_value;
        selected('value.value.type',dataArray,'type');
        selected('value.value.arksType',dataArray,'arksType');
        // 获取模板
      }else if(val == 'ENUM') {
        var enums = {enums:[{value:''}]}
        getTemplate('subEnum',this,enums)
      }else if(val == 'EXTERN') {
        getTemplate('subExtern',this,{sourceName:'',keyName:''})
      }
    }else {
    $(this).parents('tr').next('.showSubValues').remove()
    }
  })

  // 是否对象数组切换;
  $('.form-table').on('click','input[name="obj-array-chk-box"]',function(){
        var $obj_array_separator_div = $(this).parents("div.object-type-div").find(".object-array-separator-div");
        if ($(this).prop('checked')) {
            $obj_array_separator_div.show();
        } else {
            $obj_array_separator_div.hide();
        }
  })

  // 子字段类型select切换
  $('.form-table').on('change', 'select[name="value.value.type"]', function() {
    if($(this).val() == 'EXTERN'){
      $(this).parent('div').nextAll('.value-extern-div').show();
    }else{
      $(this).parent('div').nextAll('.value-extern-div').hide();
    }
  });
  // 增加子字段
  $('.form-table').on('click','.combine-value-plus',function(){
    var subValue = Handlebars.compile($('#subValue').html());
    $(this).before(subValue());
  })
  // 删除子字段
  $('.form-table').on('click', '.combine-value-minus', function(event) {
    event.preventDefault();
    $(this).parent('.combine-value-div').remove()
  });
  //增加enum
  $('.form-table').on('click', '.enum-value-plus', function(event) {
    event.preventDefault();
    var enums = Handlebars.compile($('#enum').html())
    $(this).before(enums());
  });
  // 删除enum
  $('.form-table').on('click', '.enum-value-minus', function(event) {
    event.preventDefault();
    $(this).parent('.value-enum-div').remove()
  });





// 获取数据   需要进步优化和修改
  function getFormDate(form_selector){
    var form = $(form_selector);
    var elementTbody = form.find('.form-table tbody');
    var formDate = [];
    $.each(elementTbody,function(index, el ) {
      var date = formSubmit(el);
      formDate.push(date)
    });
    console.log('formDate',formDate)
  }
  // 提交表单
  $('button[name="submit"]').on('click', function(event) {
    event.preventDefault();
    getFormDate('#form')
    /* Act on the event */
  //  var date = $('#form').serializeArray();//获取form表单中的所有[{name：value}]
    // console.log('date',date)
    //   var formDate = {};
    //   $.each(date,function(index, el) {
    //     formDate[el.name] = el.value;
    //   });
    //   console.log('formDate',formDate);
  });

})()
