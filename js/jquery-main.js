$(function () {

    // // -------------------------------------------------------
    // // MENU（スクロール連動）
    // // -------------------------------------------------------
    const navLinks = document.querySelectorAll(".menu-nav li a");
    const sectionIds = Array.from(navLinks).map(link => link.getAttribute("href"));
    const sections = sectionIds.map(id => document.querySelector(id));

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6 // 画面に60%表示されたら
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = `#${entry.target.id}`;
            const correspondingLink = document.querySelector(`.menu-nav li a[href="${id}"]`);

            if (entry.isIntersecting) {
                // すべてのリンクの色をリセット
                navLinks.forEach(link => {
                    link.style.backgroundColor = "var(--main)";
                });
                // 対象リンクだけ #be2452ff に変更
                if (correspondingLink) {
                    correspondingLink.style.backgroundColor = "#b41444ff";
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });

    // header処理と同じロジック
    $(window).on('scroll', function () {
        var scroll = $(this).scrollTop();
        var mvHeight = $('.mainvisual-wrapper').outerHeight();

        // mainvisualスクロール後に表示
        if (scroll >= mvHeight) {
            $('.menu-nav').addClass('menu-nav--visible');
        } else {
            $('.menu-nav').removeClass('menu-nav--visible');
        }
    });

    // -------------------------------------------------------
    // ハンバーガーメニュー
    // -------------------------------------------------------
    $(function () {
        // ハンバーガー開閉
        $('.hamburger').on('click', function () {
            $(this).toggleClass('active');
            $('.sp-menu').toggleClass('sp-menu--visible');

            // アクセシビリティ対応
            const expanded = $(this).attr('aria-expanded') === 'true';
            $(this).attr('aria-expanded', !expanded);
            $('.sp-menu').attr('aria-hidden', expanded);
        });

        // メニュー内リンク押したら閉じる
        $('.sp-menu a').on('click', function () {
            $('.hamburger').removeClass('active').attr('aria-expanded', 'false');
            $('.sp-menu').removeClass('sp-menu--visible').attr('aria-hidden', 'true');
        });
    });

    // -------------------------------------------------------
    // Page top
    // -------------------------------------------------------
    const button = document.querySelector('.page-top');

    button.addEventListener('click', () => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            button.classList.add('is-active');
        } else {
            button.classList.remove('is-active');
        }
    });

    // -------------------------------------------------------
    // フェードUP
    // -------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {
        const bubbles = document.querySelectorAll('.bubble');
        const container = document.querySelector('.worries-box');

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 全てのbubbleに一括でクラスをつける
                    bubbles.forEach((bubble, index) => {
                        setTimeout(() => {
                            bubble.classList.add('fadeUp');
                        }, index * 200); // 0.2秒ごとにdelay
                    });
                    observer.unobserve(entry.target); // 一度だけ発火
                }
            });
        }, options);

        observer.observe(container);
    });


    // -------------------------------------------------------
    // 歩く人
    // -------------------------------------------------------
    document.addEventListener('scroll', function () {
        var image = document.querySelector('.run_man_img');
        var imageContainer = document.querySelector('.run_man_area');
        var progress = Math.min(Math.max((window.scrollY + window.innerHeight - imageContainer.offsetTop) /
            (imageContainer.clientHeight + window.innerHeight), 0), 1);
        image.style.transform = `translateX(${progress * window.innerWidth}px)`;
    });

    // -------------------------------------------------------
    // avatar画像（Slickスライダー）
    // -------------------------------------------------------
    $('.slider').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    // -------------------------------------------------------
    // タブ切り替え
    // -------------------------------------------------------
    $('.tab').on('click', function () {
        $('.tab, .panel').removeClass('active');
        $(this).addClass('active');
        var index = $('.tab').index(this);
        $('.panel').eq(index).addClass('active');
    });

    // -------------------------------------------------------
    // header処理
    // -------------------------------------------------------
    var $header = $('.header');
    var showClass = 'header--visible'; 
    var $mainvisual = $('.mainvisual-wrapper'); 

    if ($mainvisual.length === 0) {
        // mainvisual-wrapperがなければ、headerを最初から表示
        $header.addClass(showClass);
    } else {
        $(window).on('scroll', function() {
            var scroll = $(this).scrollTop();
            var mvHeight = $mainvisual.outerHeight(); 
            if (scroll >= mvHeight) {
                $header.addClass(showClass);
            } else {
                $header.removeClass(showClass);
            }
        });
    }


    // -------------------------------------------------------
    // mainvisual 都道府県の画像切り替え
    // -------------------------------------------------------
    var allImages = [
        "aichi", "akita", "aomori", "chiba", "ehime", "fukui", "fukuoka", "fukushima",
        "gifu", "gunma", "hiroshima", "hokkaido", "hyogo", "ibaraki", "ishikawa", "iwate",
        "kagawa", "kagoshima", "kanagawa", "kochi", "kumamoto", "kyoto", "mie", "miyagi",
        "miyazaki", "nagano", "nagasaki", "nara", "niigata", "oita", "okayama", "okinawa",
        "osaka", "saga", "saitama", "shiga", "shimane", "shizuoka", "tokushima", "tokyo",
        "tottori", "toyama", "wakayama", "yamagata", "yamaguchi", "yamanashi",
        "usa", "australia", "saudiArabia"
    ];

    var imgSets = [];
    for (var i = 0; i < allImages.length; i += 6) {
        var set = allImages.slice(i, i + 6).map(function (name) {
            return "/img/transparent/" + name + "_transparent.png";
        });
        var j = 0;
        while (set.length < 6) {
            set.push("/img/transparent/" + allImages[j++] + "_transparent.png");
        }
        imgSets.push(set);
    }

    var index = 0;
    setInterval(function () {
        index = (index + 1) % imgSets.length;
        var selectors = [
            '.mainvisual__landmark--topleft',
            '.mainvisual__landmark--topright',
            '.mainvisual__landmark--middleleft',
            '.mainvisual__landmark--middleright',
            '.mainvisual__landmark--bottomleft',
            '.mainvisual__landmark--bottomright'
        ];
        selectors.forEach(function (sel, i) {
            $(sel).fadeOut(800, function () {
                $(this).attr('src', imgSets[index][i]).fadeIn(800);
            });
        });
    }, 5000);

    // -------------------------------------------------------
    // mainvisual 地球を回す設定
    // -------------------------------------------------------
    var $earth = $('.mainvisual__earth');
    $earth.on('mouseenter', function () {
        if (!$(this).hasClass('is-rotating')) {
            $(this).addClass('is-rotating');
        }
    });
    $earth.on('animationend webkitAnimationEnd', function () {
        $(this).removeClass('is-rotating');
    });

    // -------------------------------------------------------
    // opening動画の設定（存在確認あり）
    // -------------------------------------------------------
    (function () {
        // ★ すでに再生済みかをチェック（sessionStorage使用）
        if (sessionStorage.getItem('openingPlayed')) {
            $('#opening-video-layer').hide(); // すぐに非表示
            $('html, body').removeClass('noscroll');
            return; // 処理を中断
        }

        // ページロード時に常に最上部へ（#のハッシュも消す）
        history.replaceState(null, null, location.pathname);
        window.scrollTo(0, 0);

        // スクロール禁止用
        function disableScroll() {
            $('html, body').addClass('noscroll');
            $('body').css({
                position: 'fixed',
                width: '100vw'
            });
        }

        // スクロール許可用
        function enableScroll() {
            $('html, body').removeClass('noscroll');
            $('body').css({
                position: '',
                width: ''
            });
        }

        // 必要な要素の取得
        var $videoLayer = $('#opening-video-layer');
        var video = document.getElementById('opening-video');

        // 動画表示＆スクロール禁止
        $videoLayer.show();
        disableScroll();

        // 動画非表示関数
        function hideOpeningVideo() {
            $videoLayer.addClass('fadeout');
            setTimeout(function () {
                $videoLayer.hide();
                enableScroll();
                window.scrollTo(0, 0);
                history.replaceState(null, null, location.pathname);
                // ★ 再生済みフラグを保存（タブを閉じるまで有効）
                sessionStorage.setItem('openingPlayed', 'true');
            }, 850);
        }

        // 再生終了・クリックで非表示
        video.addEventListener('ended', hideOpeningVideo);
        $videoLayer.on('click', function () {
            video.pause();
            hideOpeningVideo();
        });

        // 念のための最上部移動
        $(window).on('beforeunload', function () {
            window.scrollTo(0, 0);
        });
    })();
});