$(document).ready(function () {
    $("#btn_start").click(startNumber);
    $("#btn_clear").click(clear);
    $("#btn_copy").click(copy);
    /**
     * 根据用户选项选择，执行对应的编号方法
     */
    function startNumber() {
        if ($("#optionSelect").val() == "symbol") { // 指定符号后添加编号
            numberAfterSymbol($("#symbol").val());
        } else if ($("#optionSelect").val() == "position") { // 指定位置后添加编号
            positionAfterNumber($("#position").val());
        }
    }

    /**
     * 将输入框中的文本转换成列表
     * @returns 包含文本的列表
     */
    function inputTextToList() {
        let inputText = $("#inputText").val();
        let textList = inputText.split("\n");
        return textList;
    }
    /**
     * 指定符号后面添加编号
     * @param {*} symbol 指定的符号
     */
    function numberAfterSymbol(symbol) {
        let textList = inputTextToList();
        let serialNumber = 1;
        let outputText = "";
        textList.forEach(element => {
            if (element.includes(symbol)) {
                outputText += element.replace(symbol, symbol + serialNumber++ + ". ") + "\n";
            } else {
                outputText += element + "\n";
            }
        });
        $("#outPutText").val(outputText);
    }
    /**
     * 指定位置后面添加编号
     * @param {*} position 指定的位置
     */
    function positionAfterNumber(position) {
        let textList = inputTextToList();
        let serialNumber = 1;
        let outputText = "";
        let pos = position;
        textList.forEach(element => {
            position = pos;
            // 处理负数或者超出字符串长度
            if (position < 0) {
                position = 0;
            } else if (position > element.length) {
                position = element.length;
            }
            // 插入字符 
            outputText += element.slice(0, position) + serialNumber++ + ". " + element.slice(position) + "\n";
        })
        $("#outPutText").val(outputText);
    }
    /**
     * 清空文本
     */
    function clear() {
        $("#outPutText").val("");
        $("#inputText").val("");
    }
    /**
     * 复制文本
     */
    function copy() {
        $("#outPutText").select();
        document.execCommand('copy');
    }

    $("#optionSelect").change(function () {
        let selectedValue = $(this).val();

        // 隐藏所有输入框
        $(".settings").children("input").hide();
        // 显示所选输入框
        $("#" + selectedValue).show();
    });
})