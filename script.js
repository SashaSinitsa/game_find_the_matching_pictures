(function() {
// сделать AJAX
    var width = 5;
        height = 6;

    function Game() {
        this.img = [ 'https://kde.link/test/1.png',
                     'https://kde.link/test/2.png',
                     'https://kde.link/test/9.png',
                     'https://kde.link/test/7.png',
                     'https://kde.link/test/6.png',
                     'https://kde.link/test/3.png',
                     'https://kde.link/test/4.png',
                     'https://kde.link/test/0.png',
                     'https://kde.link/test/5.png',
                     'https://kde.link/test/8.png' ];

    }

    // Game.prototype.pause = pause;
    // Game.prototype.setting = setting;
    // данные которые получаем в ajax



    Game.prototype.init = function () {

        var inner = document.getElementById('click-game');
        inner.style.width = this.w = inner.dataset.width;
        inner.style.height = this.h = inner.dataset.height;

        inner.innerHTML = `
            <div class="inner">
              <div class="left">
                <div class="logo">LOGO <br> GO-GO</div>
                <div class="score">Score: <br><div class="number" id="score"></div></div>
              </div>

              <div class="right">
                <div class="time">Time: <br><div id="timer" class="number"></div></div>
              </div>

              <div class="center">
                <button onclick="clickGame.start()"> Новая игра </button>
              </div>
            </div>`;
        this.center = document.getElementsByClassName('center')[0];
    };



    Game.prototype.stop = function () {

        clearTimeout(this.timerId);
        setTimeout(() => {
            this.center.innerHTML = '<div class="record">Ваш рекорд:  ' + this.timer + ' c <br>' + 
            '<button onclick="clickGame.start()"> Новая игра </button></div>';
        }, 1000);
    };



    Game.prototype.tick = function () {

        this.score--;
        this.timer++;
        scoreEl.innerHTML = this.score;
        timerEl.innerHTML = this.timer;
        this.timerId = setTimeout(this.tick.bind(game), 1000);
    };



    Game.prototype.start = function () {

        var box, table, tr, td, widthBox, heightBox, size, duble1, duble2, keys,
            i = 0, j = 0, arr = [],
            sumTd = width*height;

        this.score = 1000;
        this.timer = 0;
        this.center.innerHTML = "<div class='center-inner'><div class='box' id='box'></div></div>";

        // create the array of pairs of pictures
        for (i; i < sumTd / 2; i++) {
            if (this.img[j]) {
                arr.push(this.img[j], this.img[j]);
                j++;
            } else {
                j = 0;
                arr.push(this.img[j], this.img[j]);
            }
        }
        // sorting randomly
        arr.sort((a, b) => Math.random() - 0.5);

        // creates the table
        box = document.getElementById('box');
        widthBox = this.center.offsetWidth -4 -10; // border and padding
        heightBox = this.h*0.92-16;

        table = document.createElement('div');
        table.classList.add('table');

        for (i = 0; i < height; i++) {
            tr = document.createElement('div');
            tr.classList.add('tr');
            for (j = 0; j < width; j++) {
                td = document.createElement('div');
                size = (widthBox/width < heightBox/height) ? widthBox/width : heightBox/height;
                image = arr.pop();
                td.style.cssText = 
                    'width: ' + size + 
                    'px; height: ' + size + 
                    'px; background-image: url(' + image + ')';
                td.classList.add('td','closed');
                td.pair = image;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        box.appendChild(table);

        // start timer
        this.timerId = setTimeout(this.tick.bind(game), 1000);
        scoreEl = document.getElementById('score');
        timerEl = document.getElementById('timer');

        // adds the handler
        box.addEventListener('click', handler, false);
        function handler (e) {
            if (e.target.classList.contains('td')) {
                if (e.target === duble1) return;
                var first = e.target;
                var second = duble1 ? duble1 : null;
                var third = duble2 ? duble2 : null;
                duble1 = first;
                duble2 = second;

                if (third) {
                    second.classList.add('closed');
                    third.classList.add('closed');
                    duble2 = null;
                } else if (second && (first.pair === second.pair)) {
                    first.classList.add('hide');
                    second.classList.add('hide');
                    first.onclick = function(e) {e.stopImmediatePropagation();};
                    second.onclick = function(e) {e.stopImmediatePropagation();};
                    duble1 = duble2 = null;
                    sumTd = sumTd-2;
                }
                e.target.classList.remove('closed');
            }
            if (sumTd === 0) game.stop();
        }
    };


var game = new Game();
// game.ajax();
game.init();

window.clickGame = {};
window.clickGame.start = function() {game.start();};

})();
// clickGame.start();

