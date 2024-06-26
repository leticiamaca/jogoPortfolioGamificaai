import { Actor, Color, Engine, FadeInOut, Keys, Resource, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetointeração: any
    private npcCase?: Actor
    private listaImagens?: Sprite[]

    private textoDacena?: string
    elementotexto1?: HTMLElement

    // onTransition(direction: "in" | "out"): Transition | undefined {
    //     return new FadeInOut({
    //         direction: direction,
    //         color: Color.Black,
    //         duration: 1000
    //     })
    // }

    //onInitialize só roda uma vez, então fazemos as funções do case no onActivate pois ele roda toda a vez, sem ser algo padrão
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //Criar elemento com a descrição do case
        this.elementotexto1 = document.createElement('div') as HTMLElement
        this.elementotexto1.classList.add('texto-case')

        //Adicionar o elemento ao container game
        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementotexto1)

        this.npcCase = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight),
        })

         //Carregar imagem dos NPC'S
         let imagemNpcUm = Resources.NpcA.toSprite()
         let imagemNpcDois = Resources.NpcB.toSprite()
         let imagemNpcTres = Resources.NpcC.toSprite()
         
         this.listaImagens = [imagemNpcUm, imagemNpcDois, imagemNpcTres] //Colocando essas imagens em uma lista para ficar mais organizado
         
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        // Pegar dados vindos da cena passada
        this.objetointeração = context.data
          this.elementotexto1!.style.opacity = "1"

        // se for a mesa a 
        if (this.objetointeração.nomeDoActor == "mesa_stand_a") {
            // this.textoDacena = "Essa é a descrição do case a"
            this.elementotexto1!.innerHTML =`<h2>XYZ Tech - Transformação Digital e Capacitação na Tecnologia</h2>
            <p>A empresa enfrentava dificuldades na adoção de novas tecnologias pelos funcionários, resultando em baixa eficiência e resistência às mudanças.</p>
            <p>A XYZ Tech Solutions implementou uma plataforma de treinamento gamificada, onde os funcionários ganhavam pontos e badges ao completar módulos de treinamento sobre novas tecnologias. Eles podiam ver seu progresso em um leaderboard, incentivando uma competição saudável.</p>            
            <p> APERTE ESC PARA SAIR </p>`
            this.npcCase?.graphics.add(this.listaImagens![0])
            //Mudar o zoom
            this.npcCase!.graphics.current!.scale = vec(1.7, 1.7)
            
      
            
        
         
        }



        // se for a b
        if (this.objetointeração.nomeDoActor == "mesa_stand_b") {
              this.elementotexto1!.innerHTML = `<h2>ABC Finance - Incentivo à Cultura de Inovação</h2>
            <p>A empresa queria incentivar os funcionários a proporem ideias inovadoras para melhorar processos e produtos, mas havia pouca participação.
            <p>ABC Finance criou um programa chamado "InovaABC" onde os funcionários podiam submeter ideias e ganhar pontos. As ideias eram votadas pelos colegas e avaliadas por um comitê. Os funcionários com as melhores ideias ganhavam prêmios e reconhecimento trimestral.
            <p> APERTE ESC PARA SAIR </p>`
                 //Inserir o Sprite no actor da mesa b
            this.npcCase?.graphics.add(this.listaImagens![1])
                 //Mudar o zoom
                 this.npcCase!.graphics.current!.scale = vec(1.7, 1.7)
               
                
         
        }

        // se for a c
        if (this.objetointeração.nomeDoActor == "mesa_stand_c") {
          this.elementotexto1!.innerHTML = `<h2>FastMart - Melhoria na Experiência do Cliente</h2>
            <p>A empresa de varejo enfrentava problemas com o atendimento ao cliente, resultando em baixa satisfação e retenção de clientes.
            <p>FastMart lançou uma aplicação interna onde os atendentes ganhavam pontos ao fornecer um excelente atendimento ao cliente, baseado em avaliações dos próprios clientes e supervisores. Os melhores atendentes eram destacados no mural da empresa e recebiam recompensas.
            <p> APERTE ESC PARA SAIR </p>`
                //Inserir o Sprite no actor da mesa c
                this.npcCase?.graphics.add(this.listaImagens![2])
                     //Mudar o zoom
            this.npcCase!.graphics.current!.scale = vec(1.7,1.7)
          
            
            
        }  
        
//Adicionando o player na tela, e como é algo que acontece para todos não é necessário colocar um em cada um, colocamos de uma forma global para dar certo para todos
      this.add(this.npcCase!)



          //Configurar a cena para monitorar o evento de tecla pressionada
          this.input.keyboard.on("press", (event) => {
            if(event.key == Keys.Esc){
                //Direcionar para a próxima cena
                this.engine.goToScene("exposicao")
            }
        })

       
       

    }
   
    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementotexto1!.style.opacity = "0"
    }

}