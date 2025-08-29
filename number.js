$(document).ready(function () {
    // 开始对文本进行编号
    function startNumber() {
        let inputText = $("#inputText").val();
        let textList = inputText.split("\n");
        let serialNumber = 1;
        let outputText = "";

        textList.forEach(element => {
            outputText += serialNumber++ + ". " + element + "\n";
        });

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
    $("#btn_start").click(startNumber);
    $("#btn_clear").click(clear);
    $("#btn_copy").click(copy);


    $("#optionSelect").change(function () {
        let selectedValue = $(this).val();

        // 隐藏所有输入框
        $("#optionSelectInput").siblings().hide();
        // 显示所选输入框
        $("#" + selectedValue + "Input").show();

    });
})