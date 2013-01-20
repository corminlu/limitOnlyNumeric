function limitOnlyNumeric(evt) {
    var e = evt || window.event,
      key = e.keyCode || e.which;
 
    if (
      // Backspace, Tab, Enter, Esc, Delete
      key == 8 || key == 9 || key == 13 || key == 27 || key == 46 ||
      // Ctrl + A
      (key == 65 && event.ctrlKey === true) ||
      // Home, End, 四个方向键
      key >= 35 && key <= 40) {
        return;
    }
 
    if (e.shiftKey || e.altKey || e.ctrlKey) {
      return false;
    }
     
    var el = e.target || e.srcElement,
      // 最大数字长度
      nl = parseInt(el.getAttribute("data-numbers")) || 15,
      // 最大小数长度
      dl = parseInt(el.getAttribute("data-decimals")) || 2,
      // 是否允许输入负数
      sallow = !!el.getAttribute("data-substract"),
      val = el.value,
      // "." 位置
      dotIndex = val.indexOf("."),
      rng = caret.call(el),
      // 光标在"."左边
      rLeft = rng.end <= dotIndex,
      // 光标在"."右边
      rRight = rng.begin > dotIndex;
       
    if (
      // 数字  
      key >= 48 && key <= 57 ||
      // 数字键盘输入的数字
      key >= 96 && key <= 105) {
      
      // 验证输入的值
      function validateValue() {
        if (sallow && val[0] == "-") nl = nl + 1;//负号开头多加一位
        if (
          // 未输入过"."
          dotIndex == -1 && val.length < nl ||
          // 光标位置在"."之前
          rLeft && val.substring(0, dotIndex).length < nl ||
          // 光标在"."之后且未达到小数上限
          rRight && val.substring(dotIndex + 1).length < dl)
          return true;
        return false;
      }
      
      if (validateValue())
        return;
       
      // 选中部分文本再做一次处理
      val = val.substring(0, rng.begin) + val.substring(rng.end);
      dotIndex = val.indexOf(".");
      if (validateValue())
        return;
    }
    else if (
      // "."
      (key == 190 ||
      // 数字键盘上的 "."
      key == 110) &&
      // 允许输入小数
      dl > 0) {       
      if (
        // 未输入".", 且输入的位置后面的小数位数未达到上限
        dotIndex == -1 && (rng.end == val.length || val.substring(rng.end).length <= dl) ||
        // 输过".", 且选中部分文本包含"."
        dotIndex > -1 && rng.begin <= dotIndex && dotIndex < rng.end)
        return;
    }
    else if (
      // 允许负数
      sallow &&
      // "-"
      (key == 189 ||
      // 数字键盘上的 "-"
      key == 109) &&
      // 光标在开始位置
      (rng.begin == 0 &&
      // 未输入过"-"负号 或者 选中了开头一段文本
      (val[0] != "-" || rng.end > rng.begin))) {
      return;
    }
 
    return false;
}

// 获取光标位置
function caret() {
  var begin, end;
  if (this.setSelectionRange) {
    begin = this.selectionStart;
    end = this.selectionEnd;
  } else if (document.selection && document.selection.createRange) {
    var range = document.selection.createRange();
    begin = 0 - range.duplicate().moveStart('character', -100000);
    end = begin + range.text.length;
  }
  return { begin: begin, end: end };
}
