limitOnlyNumeric
================

limit textfield input to numeric only
用于限制文本框只允许输入数字，包括负号"-"以及"."

###使用方法###

> 期望的html代码是这样的

        <input type="number" style="ime-mode:disabled" ... />
        <input type="text" style="ime-mode:disabled" ... />

* 通过keydown事件来绑定：

`document.getElementById("txt1").onkeydown = limitOnlyNumeric;`

* 直接写在html属性里：

`<input type="text" id="txt1" onkeydown="return limitOnlyNumeric(event)" />`

* 或者用jQuery的事件绑定：

`$(".numericOnly").keydown(limitOnlyNumeric);`


###需要额外处理的情况###

* 禁用粘贴：

`document.getElementById("txt1").onpaste=function(){return false;};`

* 禁用文本框的右键菜单：

        document.getElementById("txt1").onmousedown=function(e){
          if (e.button && e.button == 2 ||
            e.which && e.which == 3)
          return false;
        };

* 额外的输入控制：

        document.getElementById("txt1").oninput=function(){
          if(isNaN(this.value))
            this.value = parseFloat(this.value) || "";
        };
         
        // ie 6-8
        document.getElementById("txt1").onpropertychange=function(){
          if(isNaN(this.value))
            this.value = parseFloat(this.value) || "";
        };


* 限制输入法，同时要兼容于多个浏览器：

        <input type="number" style="ime-mode:disabled" ... />


