import { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene{
    elemento?: HTMLElement
    fadeOutElement(elemento: HTMLElement){
      //Pegar opacidade do elemento HTML
      let opacidade = parseFloat(elemento.style.opacity)
      //Repetir diminuição da opacidade
      setInterval(() => {
      // Se elemento ainda está visível
      if (opacidade > 0){
          //Diminuir a opacidade
      opacidade -= 0.01
      elemento.style.opacity = opacidade.toString()
      
      }
      
      }, 20)
      
      }
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
          direction: direction,
        color: Color.Black,
        duration: 1000  
        })
       

        }
      onInitialize(engine: Engine<any>): void {
        let tiledMap = Resources.Mapa
        //Definir offset para renderização do mapa
        let offsetX = 138
        let offsetY = 100

        //Adicionando cena do mapa na tela
        tiledMap.addToScene(this, {
          pos: vec(offsetX, offsetY),
        })
        //Definir zoom da camera para aumentar um pouco a visualização
        this.camera.zoom = 1.4

        // Criação e configuração do Player
        let jogador = new Player()
        jogador.z = 4

        //Adicionando o player na cena 
        this.add(jogador)
      }
} 