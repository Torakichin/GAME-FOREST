const startButton = document.getElementById('start-button');
const gifAnimation = document.getElementById('gif-animation');
const randomImage = document.getElementById('random-image');

// 画像ファイル名のリスト
const images = ["images/大吉.png", "images/大吉2.png", "images/中吉.png", "images/小吉.png", "images/凶.jpg","images/凶.png"];

// スタートボタンが押されたときの処理
startButton.addEventListener('click', () => {
    // GIFアニメーションを表示
    gifAnimation.style.display = 'block';
    randomImage.style.display = 'none'; // 以前の画像を非表示にする

    // GIFを数秒間表示した後にランダムな画像を表示
    setTimeout(() => {
        // ランダムに画像を選択
        const randomIndex = Math.floor(Math.random() * images.length);
        randomImage.src = images[randomIndex];
        
        // GIFを非表示にして選ばれた画像を表示
        gifAnimation.style.display = 'none';
        randomImage.style.display = 'block';
    }, 3000); // 3秒間GIFを表示
});
