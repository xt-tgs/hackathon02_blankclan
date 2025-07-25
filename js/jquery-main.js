// -------------------------------------------------------
// avatar画像
// -------------------------------------------------------
$('.slider').slick({
    autoplay: true,//自動的に動き出すか
    infinite: true,//スライドをループさせるか
    speed: 500,//スライドのスピード。
    slidesToShow: 3,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    centerMode: true,//要素を中央ぞろえにする
    variableWidth: true,//幅の違う画像の高さを揃えて表示
    dots: false,//下部ドットナビゲーションの表示
    responsive: [{
        breakpoint: 500,
        settings: {
            slidesToShow: 1
        }
    }]
});