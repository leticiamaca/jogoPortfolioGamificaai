import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetointeração: any

    private textoDacena?: string
    elementotexto1?: HTMLElement

    // onTransition(direction: "in" | "out"): Transition | undefined {
    //     return new FadeInOut({
    //         direction: direction,
    //         color: Color.Black,
    //         duration: 1000
    //     })
    // }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vindos da cena passada
        this.objetointeração = context.data

        console.log(this.objetointeração);

        // se for a mesa a 
        if (this.objetointeração.nomeDoActor == "mesa_stand_a") {
            // this.textoDacena = "Essa é a descrição do case a"

            this.elementotexto1 = document.createElement("div") as HTMLElement
            this.elementotexto1.style.opacity = "1"
            let containergame = document.querySelector(".container-game") as HTMLElement
            containergame.appendChild(this.elementotexto1)
            this.elementotexto1.classList.add("case")
            this.elementotexto1.innerHTML = "<p> Case da merenda </p>"
            let npc_a = new Actor({
                pos: vec(850,400)
            })
let imagemCaseA = Resources.NpcA.toSprite()
npc_a.graphics.add(imagemCaseA)
imagemCaseA.scale = vec(1.5, 1.5)
            this.add(npc_a)

        }



        // se for a b
        if (this.objetointeração.nomeDoActor == "mesa_stand_b") {
            
            this.elementotexto1 = document.createElement("div") as HTMLElement
            this.elementotexto1.style.opacity = "1"
            let containergame = document.querySelector(".container-game") as HTMLElement
            containergame.appendChild(this.elementotexto1)
            this.elementotexto1.classList.add("case")
            this.elementotexto1.innerHTML = "<p> Case da escola </p"
            let npc_b = new Actor({
                pos: vec(850,400)
            })
let imagemCaseB = Resources.NpcB.toSprite()
npc_b.graphics.add(imagemCaseB)
imagemCaseB.scale = vec(1.5, 1.5)
            this.add(npc_b)

        }

        // se for a c
        if (this.objetointeração.nomeDoActor == "mesa_stand_c") {
            this.textoDacena = "Essa é a descrição do case c"
            
            this.elementotexto1 = document.createElement("div") as HTMLElement
            this.elementotexto1.style.opacity = "1"
            let containergame = document.querySelector(".container-game") as HTMLElement
            containergame.appendChild(this.elementotexto1)
            this.elementotexto1.classList.add("case")
            this.elementotexto1.innerHTML = "<p>case dos funcionários</p>"
            let npc_c = new Actor({
                pos: vec(850,400)
            })
let imagemCaseC = Resources.NpcC.toSprite()
npc_c.graphics.add(imagemCaseC)
imagemCaseC.scale = vec(1.5, 1.5)
            this.add(npc_c)

        }

          //Configurar a cena para monitorar o evento de tecla pressionada
          this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.F){
                //Chamando a função para criar transição suave do elemento texto
        

                //Direcionar para a próxima cena
                this.engine.goToScene("exposicao")


            }
        } )

    }
   
    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementotexto1?.remove()
    }

}