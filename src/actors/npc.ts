import { Actor, CollisionType, Color, Vector } from "excalibur";

export class Npc extends Actor {
  constructor(posicao: Vector, cor: Color, nome: string) {
    super({
      pos: posicao,
      height: 32,
      width: 32,
      name: nome,
      color: cor,
      collisionType: CollisionType.Fixed,
    });
  }
}
