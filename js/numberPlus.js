$(function () {
    let havaColor = new Map();
    $("#btn_startConversion").click(startConversion)
    $("#btn_clearBlock").click(btn_clearBlock)
    $("#btn_clearString").click(btn_clearString);
    $("#btn_number").click(number)
    $("#btn_copy").click(copy)

    $('.conversion-area').on('click', '.small-div', div_click);
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
     * 将输入文本转换为列表，并将每个字符转换为小方块
     */
    function startConversion() {
        btn_clearString();
        let textList = inputTextToList();
        let index = 0;
        textList.forEach(function (element, value) {
            $("#list").append(`<li id="list${value}"></li>`)
            let characters = Array.from(element);
            $(`#list${value}`).append(`<span>${value + 1}.&nbsp</span>`)
            for (let i = 0; i < characters.length; i++) {
                $(`#list${value}`).append(`<span id="${index++}" class="small-div" click="div_click">${characters[i]}</span>`);
            }
        })

    }
    /**
     * 将选中的位置标记为一或二或三级序号
     */
    function div_click() {
        // 获取选中的单选框
        let checked = $('input[type="radio"]:checked');
        // 判断当前方块的颜色和选中的单选框颜色是否一致
        if ($(this).css("background-color") == checked.parent().css("background-color")) {
            //如果颜色一致，说明方块之前的序号级别和当前一致，是取消
            $(this).css("background-color", "rgb(255, 255, 255)")
            havaColor.delete($(this).attr("id"));
        } else {
            //否则说明颜色不一致，将方块的序号级别设置为当前选中的单选框级别
            $(this).css("background-color", checked.parent().css("background-color"));
            havaColor.set($(this).attr("id"), checked.val());
        }

    }
    /**
     * 清空所有的颜色
     */
    function btn_clearBlock() {
        havaColor.forEach((value, key, map) => {
            $('#' + key).css("background-color", "rgb(255, 255, 255)")
        })
    }
    /**
     * 清空所有字符块
     */
    function btn_clearString() {
        // 将动态生成的元素都删除
        $("#list").empty();
        // 将记录的颜色都清空
        havaColor.clear();
    }
    /**
     * 复制结果
     */
    function copy() {
        $("#outPutText").select();
        document.execCommand("copy");
    }
    /**
     * 编号
     */
    function number() {
        // 获取行
        let row = $("#list").children("li");
        // 获取列
        let col
        let firstOrder = 0;
        let secondOrder = 1;
        let thirdOrder = 1;
        // 标记上一次编号的级别
        let tag = 2;
        let outPutText = "";
        row.each(function (index, row) {
            col = $(row).children("span.small-div");
            col.each(function (index, col) {
                console.log(col);
                if (havaColor.get($(col).attr("id")) == "1") {
                    outPutText += ++firstOrder + ". " + $(col).text();
                } else if (havaColor.get($(col).attr("id")) == "2") {

                    if (tag != 2) {
                        secondOrder = 1;
                        tag = 2;
                    }
                    outPutText += firstOrder + "." + secondOrder++ + ". " + $(col).text();
                } else if (havaColor.get($(col).attr("id")) == "3") {
                    if (tag != 3) {
                        thirdOrder = 1;
                        tag = 3;
                    }
                    outPutText += firstOrder + "." + secondOrder + "." + thirdOrder++ + ". " + $(col).text();
                } else {
                    outPutText += $(col).text();
                }
            })
            outPutText += "\n";
        })

        $("#outPutText").val(outPutText);
    }
    /**
     * 点击单选框文字也可以进行选择
     */
    $(".level").click(function () {
        $(this).find("input[type='radio']").prop("checked", true);
    })

})