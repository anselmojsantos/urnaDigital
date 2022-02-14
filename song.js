let btnTeclado = document.querySelectorAll('.teclado--botao');

for(let i = 0; i< btnTeclado.length; i++){
       btnTeclado[i].addEventListener('click',beep);
       console.log(btnTeclado[i]);
}

function beep(){
       let $song = new Audio();
       $song.src = 'song/CLICK18B.wav';   
       $song.play();
}

function fim(){
       let $songFim = new Audio();
       $songFim.src = 'song/songUrna.mp3';   
       $songFim.play();
}
