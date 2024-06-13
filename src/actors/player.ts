import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
  //Propriedades do player
  private velocidade: number = 180;

  // Configuração do player
  constructor(posicao: Vector) {
    super({
      pos: posicao,
      radius: 16,
    //   width: 32,
    //   height: 32,
      name: "Jogador",
      color: Color.Red,
      collisionType: CollisionType.Active
    });
  }


  onInitialize(engine: Engine<any>): void {
    // Configurar spriteSheet do player
    const PlayerSpriteSheet =  SpriteSheet.fromImageSource({
      image: Resources.PlayerSpriteSheet,
      grid: {
        spriteWidth: 32,
        spriteHeight: 64,
        columns: 56,
        rows: 20,
      },
      spacing: {
        originOffset: {
          y: 8

        }
      }
    })

// Criar as animações
const duracaoFrameAnimacao = 70
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
  frameDuration: duracaoFrameAnimacao
})
this.graphics.add("left-idle", leftIdle)
this.graphics.use("left-idle")

    // Configurar player para monitorar evento "hold" (segurar) do teclado
    engine.input.keyboard.on("hold", (event) => {
      //Detectar qual tecla está pressionada
      switch (event.key) {
        case Keys.Left:
        case Keys.A:
          // X negativo pois no plano cartesiano - significa esquerda
          //Mover para a esquerda
          this.vel.x = -this.velocidade;
          break;

        case Keys.ArrowRight:
        case Keys.D:
          //Mover para a direita
          this.vel.x = this.velocidade;
          break;

        case Keys.ArrowUp:
        case Keys.W:
          this.vel.y = -this.velocidade;
          break;
        case Keys.ArrowDown:
        case Keys.S:
          this.vel.y = this.velocidade;
          break;

        default:
            // Zera a velocidade do player, para a movimentação
this.vel.x = 0
this.vel.y = 0

          break;
      }
    })
    // Configura o player para monitorar evento "release" (soltar)
    engine.input.keyboard.on("release", (event) => {
        //Fazer o player parar ao soltar as teclas de movimentação
        if(
            event.key == Keys.A  ||
            event.key == Keys.Left ||
            event.key == Keys.D ||
            event.key == Keys.Right
        ) {
// Zerar Velocidde horizontal
this.vel.x = 0
        }
        if( event.key == Keys.W  ||
            event.key == Keys.Up ||
            event.key == Keys.S ||
            event.key == Keys.Down)
            {
// Zerar Velocidde vertical
this.vel.y = 0
        }
    })
  }
}
