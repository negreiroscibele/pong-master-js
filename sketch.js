//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90; 

//variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let colidiu = false;

//chance de errar
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound ("raquetada.mp3");
  ponto = loadSound ("ponto.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
    background(0);
    mostrarBolinha();
    movimentarBolinha();
    verificarColisaoBorda();
    mostrarRaquete(xRaquete, yRaquete);
    movimentarRaquete();
    verificarColisaoRaquete(xRaquete, yRaquete);
    mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentarRaqueteOponente();
    calculaChanceDeErrar();
colisaoOponenteBiblioteca(xRaqueteOponente,yRaqueteOponente);
    mostrarPlacar();
    marcarPontos();
  
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
  }

function movimentarBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
  
  }

function verificarColisaoBorda(){
  if (xBolinha + raio > width || 
      xBolinha - raio < 0) {
      velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height || 
      yBolinha - raio < 0) {
      velocidadeYbolinha *= -1;
  }
}
  
function mostrarRaquete(x,y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentarRaquete(){
  if (keyIsDown (UP_ARROW)) {
    yRaquete += -10;
  }
  if (keyIsDown (DOWN_ARROW)) {
    yRaquete += 10;} 
}

function verificarColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
      velocidadeXbolinha *= -1; 
    raquetada.play();
  }
}

function movimentarRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function colisaoOponenteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){velocidadeXbolinha *= -1;  
               raquetada.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function mostrarPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcarPontos(){
  if (xBolinha > 585){
      meusPontos += 1;
      ponto.play();
  } 
 if (xBolinha < 15){
    pontosDoOponente += 1;
     ponto.play();
  } 
}