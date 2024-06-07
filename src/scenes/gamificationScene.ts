import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
  elementoTextoSegundaCena?: HTMLElement
  fadeOutElement(elementoTextoSegundaCena: HTMLElement){
    //Pegar opacidade do elemento HTML
    let opacidade = parseFloat(elementoTextoSegundaCena.style.opacity)
    //Repetir diminuição da opacidade
    setInterval(() => {
    // Se elemento ainda está visível
    if (opacidade > 0){
        //Diminuir a opacidade
    opacidade -= 0.01
    elementoTextoSegundaCena.style.opacity = opacidade.toString()
    
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
    this.backgroundColor = Color.fromHex("#403f4c")
    let actorLogo = new Actor({
      pos: vec(engine.halfDrawWidth / 2, 350),
    });

   this.elementoTextoSegundaCena = document.createElement("div") as HTMLElement
this.elementoTextoSegundaCena.style.opacity = "1"

let containerGame = document.querySelector(".container-game") as HTMLElement
containerGame?.appendChild(this.elementoTextoSegundaCena)
this.elementoTextoSegundaCena.classList.add("sobre-gamifica-segunda-cena")

this.elementoTextoSegundaCena.innerHTML = `<h2>O que é gamificação?</h2>
<p>
    Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de
    engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes
    como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos
    desejados e aumentar a participação e o comprometimento dos participantes.</p>`









    let imagemLogoSegundaCena = Resources.SegundoLogoVertical.toSprite();
    imagemLogoSegundaCena.scale = vec(0.7, 0.7);
    actorLogo.graphics.add(imagemLogoSegundaCena);
    this.add(actorLogo);  

    // Configurar a cena para detectar a tecla Enter e ir para a próxima cena
    this.input.keyboard.on('press', (event) => {
if(event.key == Keys.Enter){
  this.fadeOutElement(this.elementoTextoSegundaCena!)
  engine.goToScene("exposicao");
}
    })
  }
  onDeactivate(context: SceneActivationContext<undefined>): void {
    this.elementoTextoSegundaCena?.remove()
    
    
  }
}