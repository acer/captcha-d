var image = $("#alexio");
console.log(image);
$('#alexio').faceDetection({
        complete: function (faces) {
            console.log(faces);
        }
    });