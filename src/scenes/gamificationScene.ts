import { Actor, Color, Engine, Resource, Scene, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
  elementoTextoSegundaCena?: HTMLElement
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
  }
}
