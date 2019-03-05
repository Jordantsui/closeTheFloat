//在每一个$(clickMe).on('click', function()内部添加监听$(document).one('click', function()，打开浮层就监听，关闭浮层之后就不监听了

$(clickMe).on('click', function() {
  if(popover.style.display==='block'){
    //bug3:注意这里，如果仅仅在css里写了display:none，在JS里打印popover.style.display，是个空格，没有定义
    //而如果在html里写了style='display:none'，打印popover.style.display就可得到 none
    //所以我猜想，css里只能控制格式，而不能给标签添加属性
    //一开始我是判断popover.style.display是否等于none，发现第一次点按钮时，浮层并不出现，第二次点才出现，是因为
    //第二次时，hide()自动将popover.style.display设为none了
    //然后，我又试验了打印出popover.style.position，一直没有打印出来，印证了我的想法：css里只能控制格式，而不能给标签添加属性
    $(popover).hide()
  }else{
    //bug1:如果没有这个判断，点击按钮使浮层消失后，再点击按钮，浮层不会出现
    $(popover).show()
    console.log('show')
    setTimeout(function() {
      x=1
      console.log('添加 one click')
      $(popover).on('click', function(e) {
        e.stopPropagation()
      })
      //bug2:如果没有以上三句，点击浮层，浮层也会消失
      $(document).one('click', function() {
        x=0
        console.log('我觉得这里不会执行')
        console.log('hide')
        $(popover).hide()
      })
    }, 0)
  }
})
  
  //如果不加setTimeout，则$(document).one('click', function()会在之后立刻触发；加上setTimeout之后，会等到此冒泡过程完了之后再执行setTimeout里面的代码，而此时，事件过程已结束，因此$(document).one('click', function()不会执行
  //除了用setTimeout这种方法外，还可以用阻止冒泡（阻止传播）的方法（如上一个JS里所示）
  
  //补充：$(clickMe).on('click', false)
  //false包括阻止默认事件和阻止传播两个功能
  //阻止默认事件：e.preventDefault()（例如勾选checkbox）
  //阻止传播：e.stopPropagation()
  //但是在这里，只用到了阻止传播，所以只用e.stopPropagation()，用false反而会出bug