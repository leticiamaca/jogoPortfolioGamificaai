import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
  //Propriedades do player
  private velocidade: number = 180;

  // Configuração do player
  constructor() {
    super({
      pos: vec(500, 500),
      radius: 16,
    //   width: 32,
    //   height: 32,
      name: "Jogador",
      color: Color.Red,
      collisionType: CollisionType.Active
    });
  }
  onInitialize(engine: Engine<any>): void {
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
