// HTML要素の参照を取得
const uploadButton = document.getElementById('upload-button');
const fileInput = document.getElementById('file-input');
const imageCanvas = document.getElementById('image-canvas');
const resultElement = document.getElementById('result');

// MobileNetモデルの読み込み
let model;
async function loadModel() {
    model = await mobilenet.load();
    console.log("MobileNetモデルがロードされました");
}

// ユーザーが写真を撮影または選択した時に呼び出される
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
        // キャンバスに画像を描画
        const ctx = imageCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);

        // モデルで画像を推論
        const predictions = await model.classify(imageCanvas);
        resultElement.textContent = predictions[0].className;
    };
});

// ボタンが押されたらファイル選択ダイアログを表示
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

// ページ読み込み時にモデルをロード
loadModel();
