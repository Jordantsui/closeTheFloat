//在每一个$(clickMe).on('click', function()内部添加监听$(document).one('click', function()，打开浮层就监听，关闭浮层之后就不监听了
$(clickMe).on('click', function() {
    $(popover).show()
    console.log('show')
    setTimeout(function() {
      console.log('添加 one click')
      $(document).one('click', function() {
        console.log('我觉得这里不会执行')
        console.log('hide')
        $(popover).hide()
      })
    }, 0)
  })
  
  //如果不加setTimeout，则$(document).one('click', function()会在之后立刻触发；加上setTimeout之后，会等到此冒泡过程完了之后再执行setTimeout里面的代码，而此时，事件过程已结束，因此$(document).one('click', function()不会执行
  //除了用setTimeout这种方法外，还可以用阻止冒泡（阻止传播）的方法（如上一个JS里所示）
  
  //补充：$(clickMe).on('click', false)
  //false包括阻止默认事件和阻止传播两个功能
  //阻止默认事件：e.preventDefault()（例如勾选checkbox）
  //阻止传播：e.stopPropagation()
  //但是在这里，只用到了阻止传播，所以只用e.stopPropagation()，用false反而会出bug