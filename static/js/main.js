$(document).ready(function () {
    // 1.買進賣出股票：手續費為成交價金的0.1425%，凡每筆不滿20元者以20元計之。(註：小數以下，無條件捨去)
    // 2.賣出股票：一般股票交易稅為成交價金的0.3%，ETF、權證、TDR、封閉基金交易稅為成交價金的0.1%，REITS、可轉債等免收交易稅。(註：小數以下，無條件捨去)
    // 舉例說明︰手續費=成交單價x成交股數x手續費率
    // 36元 x 2000股x 0.1425% =102元
    // 交易稅=成交單價x成交股數x交易稅率 
    // 36元x2000股x 0.3%=216元

    function updateMetadata(id) {
        switch (id) {
            case 'yeswin':
                $("#tradeFee").val(0.1425);
                $("#sellFee").val(0.3);
                break;
            default:
                break;
        }
    }

    function updateFeeCost() {
        // 手續費%
        var tradeFee = parseFloat($("#tradeFee").val());
        console.log("tradeFee:", tradeFee);
        if (!tradeFee) {
            tradeFee = 0;
        }

        // 買進價錢
        var buyPrice = parseInt($("#buyPrice").val()) * 1000;
        console.log("buyPrice:", buyPrice);
        if (!buyPrice) {
            buyPrice = 0;
        }
        // 賣出交易稅%
        var sellFee = parseFloat($("#sellFee").val());
        console.log("sellFee:", sellFee);
        if (!sellFee) {
            sellFee = 0;
        }
        // 賣出價錢
        var sellPrice = parseFloat($("#sellPrice").val()) * 1000;
        console.log("sellPrice:", sellPrice);
        if (!sellPrice) {
            sellPrice = 0;
        }
        // 賣出張數
        var stock = parseFloat($("#stock").val());
        stock = 1;

        // 買
        var tradeCost = Math.floor((tradeFee / 100) * 0.6 * buyPrice);
        if (tradeCost < 20) {
            tradeCost = 20;
        }
        console.log("tradeCost:", tradeCost);

        // 賣
        // 當沖折扣
        var discount = $("#cbDayTrade").prop("checked") ? 0.5 : 1.0;
        var sellTradeCost = Math.floor((tradeFee / 100) * 0.6 * sellPrice * stock);
        if (sellTradeCost < 20) {
            sellTradeCost = 20;
        }
        console.log("sellTradeCost:", sellTradeCost);
        var sellCostFee = Math.floor(sellFee / 100 * sellPrice * discount * stock);
        console.log("sellCostFee:", sellCostFee);

        // 手續費+交易稅
        var totalCost = tradeCost + sellTradeCost + sellCostFee;
        console.log("totalCost:", totalCost);
        $("#totalCost").text(tradeCost + "(買手續費) + " + sellTradeCost + "(賣手續費) + " + sellCostFee + "(交易稅) = " + totalCost);

        var netProfit = sellPrice - buyPrice - totalCost;
        $("#netProfit").text(netProfit);
        if (netProfit > 0) {
            $("#netProfit").removeClass("negative-value");
            $("#netProfit").addClass("positive-value");
        } else {
            $("#netProfit").removeClass("positive-value");
            $("#netProfit").addClass("negative-value");
        }
    }

    $('#buyPrice').on("focus", function () {
        $('#buyPrice').tooltip("show");
    });
    $('#sellPrice').on("focus", function () {
        $('#sellPrice').tooltip("show");
    });
    $('#stock, #decStock, #addStock').on("focus", function () {
        $('#stock').tooltip("show");
    });

    $("#inputDayTrade").click(function () {
        $("#cbDayTrade").prop("checked", !$("#cbDayTrade").prop("checked"));
    });

    $("#tradeFee, #buyPrice, #sellFee, #sellPrice").keyup(function () {
        updateFeeCost();
    });

    $("#cbDayTrade").change(function () {
        updateFeeCost();
    });

    $("#stock").bind("change paste keyup", function () {
        console.log('stock');
        updateFeeCost();
    });

    var dropdown = document.getElementsByClassName('dropdown-toggle')[0],
        options = document.getElementsByClassName('dropdown-menu')[0];

    options.addEventListener("click", function (e) {
        if (e.target.tagName === 'A') {
            dropdown.firstChild.textContent = e.target.textContent + ' ';
            updateMetadata($(e.target).attr('id'));
        }
    });

    $(".dropdown-menu .dropdown-item")[0].click();

    $("#decStock").on('click', function () {
        var v = $("#stock").val();
        v -= 1;
        $("#stock").val(v > 1 ? v : 1).trigger("change");
    });

    $("#addStock").on('click', function () {
        var v = parseInt($("#stock").val());
        v += 1;
        $("#stock").val(v <= 100 ? v : 100).trigger("change");
    });
});