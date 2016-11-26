var image = $("#alexio");
console.log(image);

image.faceDetection({
        complete: function (faces) {
            console.log(faces);
        }
    });