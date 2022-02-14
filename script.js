let $spanTitulo = document.querySelector('.d-1-1 span');
let $cargo = document.querySelector('.d-1-2 span');
let $descricao = document.querySelector('.d-1-4');
let $information = document.querySelector('.d-2');

let $d1_right = document.querySelector('.d-1-right');
let $d1_numbers = document.querySelector('.d-1-3');

let listaAtual = 0;
let numero ;
let numberHtml;
let vtoBranco = true;

// Iniciando a Etapa de Votação

iniciarEtapa();

function iniciarEtapa(){
   let etapa = lista[listaAtual]; 
   numberHtml = '';
   numero = '';
   vtoBranco  = false;

   //criando a região de votação

   for (let i = 0; i < etapa.numeros; i++){
      if(i===0){
         numberHtml += '<div class ="number pisca"></div>';
      }else{
      numberHtml += '<div class ="number"></div>';
      }
   } 
   $spanTitulo.style.display = 'none';
   $cargo.innerHTML = etapa.titulo;
   $descricao.innerHTML ='';
   $information.style.display = 'none';
   $d1_right.innerHTML = '';
   $d1_numbers.innerHTML = numberHtml;
}

// interface com os dados do voto

function atualizaInterface(){
   let etapa = lista[listaAtual];
   let candidato = etapa.canditados.filter((item)=>{
      if (item.numero === parseInt(numero)){
         return true;
      }else{
         return false;
      }
   });
    if(candidato.length > 0){
       candidato = candidato[0];
       $spanTitulo.style.display = 'block';
       $descricao.innerHTML = `Nome: ${candidato.name}<br>Partido: ${candidato.partido}<br>Vice: ${candidato.vice}`;
       $information.style.display ='block';

       let fotosHtml = '';
       for(let i in candidato.fotos){

            if(candidato.fotos[i].small){
               fotosHtml += `<div class="d-1-img small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }else{
               fotosHtml += `<div class="d-1-img"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;    
            }
       }
       $d1_right.innerHTML = fotosHtml;
   }else{
      $spanTitulo.style.display = 'block';
      $information.style.display ='block';
      $descricao.innerHTML = '<div class="aviso--importante pisca">VOTO NULO</div>';
   }
}

//Preencher as lacunas de votação do teclado

function clicar(n){
   let elNum = document.querySelector('.number.pisca');
   if(elNum !== null){
      elNum.innerHTML = n;
      numero = `${numero}${n}`;

      elNum.classList.remove('pisca');
      if(elNum.nextElementSibling!== null){
         elNum.nextElementSibling.classList.add('pisca');
      }else{
            atualizaInterface()
      }
   }
}
function btnCr(){
   iniciarEtapa();
}

function btnbr(){
      numero = '';
      vtoBranco  = true;
      $spanTitulo.style.display = 'block';
      $information.style.display = 'block';
      $d1_numbers.innerHTML = '';
      $descricao.innerHTML = '<div class="aviso--importante pisca">VOTO EM BRANCO</div>';
       
}

let voto =[]; 
function btnCf(){
   let etapa = lista[listaAtual];
   let vtConfirmado = false;
    
   if(vtoBranco === true){
        vtConfirmado = true;
        voto.push({
           etapa:lista[listaAtual].titulo,
           voto: 'branco'
        });      
    }if( numero.length === etapa.numeros){
        vtConfirmado = true;
        voto.push({
         etapa:lista[listaAtual].titulo,
         voto: numero
      }); 
    }

    if (vtConfirmado){
       listaAtual++;

       if(lista[listaAtual] !== undefined){
         iniciarEtapa();
       }else{
          fim();
          document.querySelector('.tela').innerHTML = '<div class="aviso--importante--big pisca">FIM</div>';
          console.log(voto);
      }
    }

}
