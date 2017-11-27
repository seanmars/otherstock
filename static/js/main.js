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
                $("#buyFee").val(0.1425);
                $("#sellFee").val(0.3);
                break;
            default:
                break;
        }
    }

    function updateFeeCost() {
        var buyFee = $("#buyFee").val();
        console.log("buyFee:", buyFee);
        if (!buyFee) {
            buyFee = 0;
        }

        var buyPrice = $("#buyPrice").val();
        console.log("buyPrice:", buyPrice);
        if (!buyPrice) {
            buyPrice = 0;
        }

        var sellFee = $("#sellFee").val();
        console.log("sellFee:", sellFee);
        if (!sellFee) {
            sellFee = 0;
        }

        var sellPrice = $("#sellPrice").val();
        console.log("sellPrice:", sellPrice);
        if (!sellPrice) {
            sellPrice = 0;
        }

        var discount = $("#cbDayTrade").prop("checked") ? 0.5 : 1.0;

        var buyCostFee = Math.floor((buyFee / 100) * 0.6 * buyPrice);
        console.log("buyCostFee:", buyCostFee);
        var sellCostFee = Math.floor(sellFee / 100 * sellPrice * discount);
        console.log("sellCostFee:", sellCostFee);
        var fee = buyCostFee + sellCostFee;
        console.log("fee:", fee);
        $("#fee").text(buyCostFee + " + " + sellCostFee + " = " + fee);

        var netProfit = sellPrice - buyPrice - fee;
        $("#netProfit").text(netProfit);
        if (netProfit > 0) {
            $("#netProfit").removeClass("negative-value");
            $("#netProfit").addClass("positive-value");
        } else {
            $("#netProfit").removeClass("positive-value");
            $("#netProfit").addClass("negative-value");
        }
    }

    $("#inputDayTrade").click(function () {
        $("#cbDayTrade").prop("checked", !$("#cbDayTrade").prop("checked"));
    });

    $("#buyFee, #buyPrice, #sellFee, #sellPrice").keyup(function () {
        updateFeeCost();
    });

    $("#cbDayTrade").change(function () {
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
});