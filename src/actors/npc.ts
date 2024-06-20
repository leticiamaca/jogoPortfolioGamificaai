import { Actor, Animation, CollisionType, Color, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";

export class Npc extends Actor {
  constructor(posicao: Vector, nome: string, letra: string) {
    super({
      pos: posicao,
      height: 32,
      width: 32,
      name: nome,
      collisionType: CollisionType.Fixed,
      //Propriedades
    });

    let frameDuracao = 70

    const npcASpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.NpcASpritePlayer,
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

    const downIdleA = new Animation({
      frames: [
        { graphic: npcASpriteSheet.getSprite(18, 1) },
        { graphic: npcASpriteSheet.getSprite(19, 1) },
        { graphic: npcASpriteSheet.getSprite(20, 1) },
        { graphic: npcASpriteSheet.getSprite(21, 1) },
        { graphic: npcASpriteSheet.getSprite(22, 1) },
        { graphic: npcASpriteSheet.getSprite(23, 1) },
      ],
      frameDuration:  frameDuracao,
    });
    this.graphics.add("down-idleA", downIdleA);

    this.graphics.use("down-idle"+letra)




    const npcBSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.NpcBSpritePlayer,
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


    const downIdleB = new Animation({
      frames: [
        { graphic: npcBSpriteSheet.getSprite(18, 1) },
        { graphic: npcBSpriteSheet.getSprite(19, 1) },
        { graphic: npcBSpriteSheet.getSprite(20, 1) },
        { graphic: npcBSpriteSheet.getSprite(21, 1) },
        { graphic: npcBSpriteSheet.getSprite(22, 1) },
        { graphic: npcBSpriteSheet.getSprite(23, 1) },
      ],
      frameDuration: frameDuracao
    });
    this.graphics.add("down-idleB", downIdleB);

    this.graphics.use("down-idle"+letra)



    const npcCSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.NpcCSpritePlayer,
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


    const downIdleC = new Animation({
      frames: [
        { graphic: npcCSpriteSheet.getSprite(18, 1) },
        { graphic: npcCSpriteSheet.getSprite(19, 1) },
        { graphic: npcCSpriteSheet.getSprite(20, 1) },
        { graphic: npcCSpriteSheet.getSprite(21, 1) },
        { graphic: npcCSpriteSheet.getSprite(22, 1) },
        { graphic: npcCSpriteSheet.getSprite(23, 1) },
      ],
      frameDuration:  frameDuracao,
    });
    this.graphics.add("down-idleC", downIdleC);

    this.graphics.use("down-idle"+letra)




  }
}
