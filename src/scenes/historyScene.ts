import {Engine, Scene, Color, FadeInOut, Transition, Actor, Resource, vec, Keys, SceneActivationContext} from 'excalibur'
import { Resources } from '../resources'

export class historyScene extends Scene {
//é meio que uma configuração global, por isso é colocado em cima de tudo
//Declaração do elementoTexto
elementoTexto?: HTMLElement
// Método para esmaecer um elemento HTML
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
        this.backgroundColor = Color.fromHex('#403f4c')

        //Criar elemento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement
        //Definir opacidade do elemento para 1 = visível
        this.elementoTexto.style.opacity = "1"

        //Inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        //Inserir um elemento filho na div container game
        containerGame.appendChild(this.elementoTexto)

        //Adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        //Adicionar titulo e paragrafo dentro do conteudo da div
        this.elementoTexto.innerHTML =  `<h2>Sobre o Gamifica Ai</h2>
        <p>
          Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.
        </p>`



//   //Configurar Frase Enter na tela para ficar piscando
//   fraseEnter.actions.repeatForever((fraseEnter) => {
//     fraseEnter.fade(0, 1000);
//     fraseEnter.fade(1, 1000);
//   });
        let gamificaaiVertical = new Actor({
pos: vec(890, 350)
        })
        let imagemLogoVertical = Resources.LogoVertical.toSprite()

        imagemLogoVertical.scale = vec(0.7, 0.7);
       
        gamificaaiVertical.graphics.add(imagemLogoVertical);
        this.add(gamificaaiVertical);

        //Configurar a cena para monitorar o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.Enter){
                //Chamando a função para criar transição suave do elemento texto
                this.fadeOutElement(this.elementoTexto!)

                //Direcionar para a próxima cena
                engine.goToScene("gamificacao")


            }
        } )


    }
    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}