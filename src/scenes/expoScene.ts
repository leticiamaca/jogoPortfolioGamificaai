import {
  Actor,
  CollisionType,
  Color,
  Engine,
  FadeInOut,
  Scene,
  Transition,
  vec,
} from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
  elemento?: HTMLElement;
  fadeOutElement(elemento: HTMLElement) {
    //Pegar opacidade do elemento HTML
    let opacidade = parseFloat(elemento.style.opacity);
    //Repetir diminuição da opacidade
    setInterval(() => {
      // Se elemento ainda está visível
      if (opacidade > 0) {
        //Diminuir a opacidade
        opacidade -= 0.01;
        elemento.style.opacity = opacidade.toString();
      }
    }, 20);
  }
  onTransition(direction: "in" | "out"): Transition | undefined {
    return new FadeInOut({
      direction: direction,
      color: Color.Black,
      duration: 1000,
    });
  }
  onInitialize(engine: Engine<any>): void {
    let tiledMap = Resources.Mapa;
    //Definir offset para renderização do mapa
    let offsetX = 138;
    let offsetY = 100;

    //Adicionando cena do mapa na tela
    tiledMap.addToScene(this, {
      pos: vec(offsetX, offsetY),
    });
    //Definir zoom da camera para aumentar um pouco a visualização
    this.camera.zoom = 1.4;

    // Criação e configuração do Player
    let jogador = new Player();
    jogador.z = 4;

    //Adicionando o player na cena
    this.add(jogador);
    // Adicionar colisão com cada objeto
    //Pegar a camada de objetos colisores
    let camadaObjetosColisores =
      tiledMap.getObjectLayers("ObjetosColisores")[0];
    console.log(camadaObjetosColisores);
    //Percorrer os objetos com for each e para cada objeto, renderizar um actor
    camadaObjetosColisores.objects.forEach((objeto) => {
      // Configurar o actor
      const objetoAtual = new Actor({
        name: objeto.name,
        x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
        y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
        width: objeto.tiledObject.width,
        height: objeto.tiledObject.height,
        collisionType: CollisionType.Fixed,
      });
      //Adicionar o colisor do objeto na cena
      this.add(objetoAtual)
    });
  }
}
