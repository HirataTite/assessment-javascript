(function() {
    var caixaAberta = "";
    var imagemAberta = "";
    var cont = 0;
    var imagemEncontrada = 0;
    var source = "#boxcard";
    var imagens = [
        'img/facebook.png',
        'img/android.png',
        'img/chrome.png',
        'img/firefox.png',
        'img/html5.png',
        'img/googleplus.png',
        'img/twitter.png',
        'img/windows.png'
    ];

    function Randomizer(max, min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function embaralhaImagens() {
        var ImgAll = $(source).children();
        var ImgThis = $(source + " div:first-child");
        var imgArray = new Array();

        for (var i = 0; i < ImgAll.length; i++) {
            imgArray[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
            ImgThis = ImgThis.next();
        }

        ImgThis = $(source + " div:first-child");

        for (var z = 0; z < ImgAll.length; z++) {
            var RandomNumber = Randomizer(0, imgArray.length - 1);

            $("#" + ImgThis.attr("id") + " img").attr("src", imgArray[RandomNumber]);
            imgArray.splice(RandomNumber, 1);
            ImgThis = ImgThis.next();
        }
    }

    $(document).ready(function(){
      $("a").click(function(){
        $("p").slideToggle();
      });
    });

    function reiniciar() {
        embaralhaImagens();
        $(source + " div img").hide();
        $(source + " div").css("visibility", "visible");
        cont = 0;
        $("#success").remove();
        $("#cont").html("" + cont);
        caixaAberta = "";
        imagemAberta = "";
        imagemEncontrada = 0;
        return false;
    }

    function virarCarta() {
        var id = $(this).attr("id");

        if ($("#" + id + " img").is(":hidden")) {
            $(source + " div").unbind("click", virarCarta);
            $("#" + id + " img").slideDown('fast');

            if (imagemAberta == "") {
                caixaAberta = id;
                imagemAberta = $("#" + id + " img").attr("src");
                setTimeout(function() {
                    $(source + " div").bind("click", virarCarta)
                }, 150);
            } else {
                CurrentOpened = $("#" + id + " img").attr("src");
                if (imagemAberta == CurrentOpened) {
                    $("#" + id + " img").attr("src");
                    $("#" + caixaAberta + " img").attr("src");
                    imagemEncontrada++;
                    caixaAberta = "";
                    imagemAberta = "";
                } else {
                    setTimeout(function() {
                        $("#" + id + " img").slideUp('fast');
                        $("#" + caixaAberta + " img").slideUp('fast');
                        caixaAberta = "";
                        imagemAberta = "";
                    }, 3000);
                }
                setTimeout(function() {
                    $(source + " div").bind("click", virarCarta)
                }, 3000);
            }
            cont++;
            $("#cont").html("" + cont);

            if (imagemEncontrada == imagens.length) {
                $("#cont").prepend('<span id="success">Parabéns! Você encontrou todas as imagens!</span>');
            }
        }
    }

    $(function() {
        for (var y = 1; y < 3; y++) {
            $.each(imagens, function(i, val) {
                $(source).append("<div id=card" + y + i + "><img src=" + val + " />");
            });
        }
        $(source + " div").click(virarCarta);
        embaralhaImagens();
    });
})();

app.inicio();
