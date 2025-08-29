$(document).ready(function () {
    function startNumber() {
        $("#outPutText").text($("#inputText").val());
    }
    $("#btn").click(startNumber);
})