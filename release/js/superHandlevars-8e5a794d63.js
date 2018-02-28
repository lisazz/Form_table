/***************handlebars if强化**********************/
(function(){
  //if 处理
  Handlebars.registerHelper('ifCond', function(v1, v2, options) {
      if (v1 == v2) {　　　　　　　　　　　　
          return options.fn(this);
      }　　　　　　　　　　 //options.inverse()这个方法就是取反的意思，相当于if的else
      return options.inverse(this);
  });
})()
