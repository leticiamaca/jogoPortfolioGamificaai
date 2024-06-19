import {
  Actor,
  Animation,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Keys,
  Side,
  SpriteSheet,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
  //Propriedades do player
  private velocidade: number = 180;
  private ultimaDirecao: string = "up";
  private temObjetoProximo: boolean = false
  private ultimoColisor?: Collider




  // Configuração do player
  constructor(posicao: Vector) {
    super({
      pos: posicao,

      width: 35,
      height: 30,
      name: "Jogador",
      color: Color.Red,
      collisionType: CollisionType.Active,
    });
  }

 

  onInitialize(engine: Engine<any>): void {
    // Configurar spriteSheet do player
    const PlayerSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.PlayerSpriteSheet,
      grid: {
        spriteWidth: 32,
        spriteHeight: 64,
        columns: 56,
        rows: 20,
      },
      spacing: {
        originOffset: {
          y: 0,
        },
      },
    });

    // Criar as animações, duração de animação
    const duracaoFrameAnimacao = 70;

    // Animações Idle
    // Idle esquerda
    const leftIdle = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(12, 1) },
        { graphic: PlayerSpriteSheet.getSprite(13, 1) },
        { graphic: PlayerSpriteSheet.getSprite(14, 1) },
        { graphic: PlayerSpriteSheet.getSprite(15, 1) },
        { graphic: PlayerSpriteSheet.getSprite(16, 1) },
        { graphic: PlayerSpriteSheet.getSprite(17, 1) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });
    this.graphics.add("left-idle", leftIdle);

    // Idle direita
    const rightIdle = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(0, 1) },
        { graphic: PlayerSpriteSheet.getSprite(1, 1) },
        { graphic: PlayerSpriteSheet.getSprite(2, 1) },
        { graphic: PlayerSpriteSheet.getSprite(3, 1) },
        { graphic: PlayerSpriteSheet.getSprite(4, 1) },
        { graphic: PlayerSpriteSheet.getSprite(5, 1) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });
    this.graphics.add("right-idle", rightIdle);
    this.graphics.use(rightIdle);

    //Definindo animação andando para cima
    const upIdle = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(6, 1) },
        { graphic: PlayerSpriteSheet.getSprite(7, 1) },
        { graphic: PlayerSpriteSheet.getSprite(8, 1) },
        { graphic: PlayerSpriteSheet.getSprite(9, 1) },
        { graphic: PlayerSpriteSheet.getSprite(10, 1) },
        { graphic: PlayerSpriteSheet.getSprite(11, 1) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });
    this.graphics.add("up-idle", upIdle);

    //Definindo animação andando para baixo
    const downIdle = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(18, 1) },
        { graphic: PlayerSpriteSheet.getSprite(19, 1) },
        { graphic: PlayerSpriteSheet.getSprite(20, 1) },
        { graphic: PlayerSpriteSheet.getSprite(21, 1) },
        { graphic: PlayerSpriteSheet.getSprite(22, 1) },
        { graphic: PlayerSpriteSheet.getSprite(23, 1) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });
    this.graphics.add("down-idle", downIdle);
    //posição padrão quando carrega o jogo
    this.graphics.use("down-idle")

    //Definir animação inicial do player
    //this.graphics.use(downIdle)

    //Animações Walk
    //Animação para a esquerda
    const leftWalk = new Animation({
      frames: [
        // {graphic: PlayerSpriteSheet.getSprite(12,2)},
        { graphic: PlayerSpriteSheet.getSprite(13, 2) },
        { graphic: PlayerSpriteSheet.getSprite(14, 2) },
        { graphic: PlayerSpriteSheet.getSprite(15, 2) },
        { graphic: PlayerSpriteSheet.getSprite(16, 2) },
        { graphic: PlayerSpriteSheet.getSprite(17, 2) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });

    this.graphics.add("left-walk", leftWalk);

    //Animação Walk para a direita
    const rightWalk = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(0, 2) },
        { graphic: PlayerSpriteSheet.getSprite(1, 2) },
        { graphic: PlayerSpriteSheet.getSprite(2, 2) },
        { graphic: PlayerSpriteSheet.getSprite(3, 2) },
        { graphic: PlayerSpriteSheet.getSprite(4, 2) },
        { graphic: PlayerSpriteSheet.getSprite(5, 2) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });
    //Animação Walk para baixo
    const downWalk = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(18, 2) },
        { graphic: PlayerSpriteSheet.getSprite(19, 2) },
        { graphic: PlayerSpriteSheet.getSprite(20, 2) },
        { graphic: PlayerSpriteSheet.getSprite(21, 2) },
        { graphic: PlayerSpriteSheet.getSprite(22, 2) },
        { graphic: PlayerSpriteSheet.getSprite(23, 2) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });

    //Animação Walk para cima
    const upWalk = new Animation({
      frames: [
        { graphic: PlayerSpriteSheet.getSprite(6, 2) },
        { graphic: PlayerSpriteSheet.getSprite(7, 2) },
        { graphic: PlayerSpriteSheet.getSprite(8, 2) },
        { graphic: PlayerSpriteSheet.getSprite(9, 2) },
        { graphic: PlayerSpriteSheet.getSprite(10, 2) },
        { graphic: PlayerSpriteSheet.getSprite(11, 2) },
      ],
      frameDuration: duracaoFrameAnimacao,
    });

    // Configurar player para monitorar evento "hold" (segurar) do teclado
    engine.input.keyboard.on("hold", (event) => {
      //Detectar qual tecla está pressionada
      switch (event.key) {
        case Keys.Left:
        case Keys.A:
          this.graphics.use(leftWalk);
          // X negativo pois no plano cartesiano - significa esquerda
          //Mover para a esquerda
          this.vel.x = -this.velocidade;

          //Guardar ultima direção
          this.ultimaDirecao = "left";

          break;

        case Keys.ArrowRight:
        case Keys.D:
          //Mover para a direita
          this.vel.x = this.velocidade;
          this.graphics.use(rightWalk);

          //Guardar ultima direção
          this.ultimaDirecao = "right";
          break;

        case Keys.ArrowUp:
        case Keys.W:
          this.vel.y = -this.velocidade;
          this.graphics.use(upWalk);
          this.ultimaDirecao = "up";
          break;
        case Keys.ArrowDown:
        case Keys.S:
          this.vel.y = this.velocidade;
          this.graphics.use(downWalk);
          this.ultimaDirecao = "down";
          break;

        default:
          // Zera a velocidade do player, para a movimentação
          this.vel.x = 0;
          this.vel.y = 0;

          break;
      }
    });
    // Configura o player para monitorar evento "release" (soltar)
    engine.input.keyboard.on("release", (event) => {
      //Fazer o player parar ao soltar as teclas de movimentação
      if (
        event.key == Keys.A ||
        event.key == Keys.Left ||
        event.key == Keys.D ||
        event.key == Keys.Right
      ) {
        // Zerar Velocidde horizontal
        this.vel.x = 0;
      }
      if (
        event.key == Keys.W ||
        event.key == Keys.Up ||
        event.key == Keys.S ||
        event.key == Keys.Down
      ) {
        // Zerar Velocidde vertical
        this.vel.y = 0;
      }
      // Ao parar o player, defiir animação Idle da ultima direção
      if (this.vel.x == 0 && this.vel.y == 0) {
        //Ultima - Left, right, up, down
        //Colar a ultimaDireção + idle -> ex. left-idle, right-idle, up-idle
        this.graphics.use(this.ultimaDirecao + "-idle")
        

      }
    });


    //Configura o player para monitorar evento "press" -> pressionar
    engine.input.keyboard.on("press", (event) => {
      //Se a tecla for a f
      //Se a tecla pressionada for a F e tiver objeto próximo
      if(event.key == Keys.F && this.temObjetoProximo){

       //Identificar o alvo da interação 
       if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
        console.log("essa é a mesa A")
        //Vai para a cena passando qual o objeto da interação
        engine.goToScene("case", {
          sceneActivationData: {
            nomeDoActor: this.ultimoColisor?.owner.name
          }
        })

       }
       //Identificar o alvo da interação 
       if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
        console.log("essa é a mesa B")
        //Vai para a cena passando qual o objeto da interação
        engine.goToScene("case", {
          sceneActivationData: {
            nomeDoActor: this.ultimoColisor?.owner.name
          }
        })
       }
       //Identificar o alvo da interação 
       if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
        console.log("essa é a mesa C")
        //Vai para a cena passando qual o objeto da interação
        engine.goToScene("case", {
          sceneActivationData: {
            nomeDoActor: this.ultimoColisor?.owner.name
          }
        })
       }
      }
    })
  }
  onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
//Indicar que tm um objeto próximo
this.temObjetoProximo = true
// Registrar o ultimo objeto colidido
this.ultimoColisor = other
  }
// Ao iniciar atualização de frame
  onPreUpdate(engine: Engine<any>, delta: number): void {
    // Verificar se o player está distante do último objeto colidido
    if (this.ultimoColisor &&  this.pos.distance(this.ultimoColisor.worldPos) > 50) {
      // Marcar que o objeto não está próximo
      this.temObjetoProximo = false
    }
    
  }
}

