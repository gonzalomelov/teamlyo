window.onload = function () {
  document.querySelector('body').addEventListener('drop', function(e) {

    console.log('drag upload!!');

    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function(evt) {
      //document.querySelector('img').src = evt.target.result;
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);


    // ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
  }, false);
}
