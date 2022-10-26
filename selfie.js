const capture = document.getElementById("capture-btn");
const resetBtn = document.getElementById('reset');
const shareBtn = document.getElementById('share');
const shareBlock = document.querySelector('.share-and-reset-block')

const video = document.querySelector("video");
const canvas2 = document.createElement("canvas");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err) {
            alert("Error occurred: " + err);
        });
}

capture.onclick = function () {
    const screenshotTarget = document.getElementById("selfie-container");
    canvas2.width = video.videoWidth;
    canvas2.height = video.videoHeight;

    canvas2.getContext("2d").drawImage(video, 0, 0);

    html2canvas(screenshotTarget).then((canvas) => {
        const capturedImage = canvas.toDataURL("image/png");
        var anchor = document.createElement("a");
        // anchor.setAttribute("href", capturedImage);
        // anchor.setAttribute("download", "yourScreenshot.png");
        anchor.href = capturedImage;
        anchor.download = "yourScreenshot.png";
        anchor.click();
        anchor.remove();
    });

    // Switch buttons
    capture.style.display = 'none'
    shareBlock.style.display = 'flex'



};

// on reset
function resetBlock () {
    shareBlock.style.display = 'none'
    capture.style.display = 'flex'
}

// on share

resetBtn.addEventListener('click', resetBlock)

