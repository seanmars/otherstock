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
                console.log('yiswin');
                break;
            default:
                break;
        }
    }

    var dropdown = document.getElementsByClassName('dropdown-toggle')[0],
        options = document.getElementsByClassName('dropdown-menu')[0];

    options.addEventListener("click", function (e) {
        if (e.target.tagName === 'A') {
            dropdown.firstChild.textContent = e.target.textContent + ' ';
            updateMetadata($(e.target).attr('id'));
        }
    });
});