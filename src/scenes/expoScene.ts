import { Color, Engine, FadeInOut, Scene, Transition } from "excalibur";
import { Resources } from "../resources";

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
        tiledMap.addToScene(this)
      }
} 