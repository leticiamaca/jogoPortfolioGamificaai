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
import { Npc } from "../actors/npc";

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

    //carregar musica de fundo (BGM) 
let musicaFundo = Resources.SoundBGM

//Configurar e executar a música
musicaFundo.loop = true
// musicaFundo.play(0.5)



    //Adicionando cena do mapa na tela
    tiledMap.addToScene(this, {
      pos: vec(offsetX, offsetY),
    });
    //Definir zoom da camera para aumentar um pouco a visualização
    this.camera.zoom = 1.4;

//Carregar spawnpoint do player
let spawnPoint = tiledMap.getObjectsByName('player_spawn')[0]

    // Criação e configuração do Player
    let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY));
    jogador.z = 5;

    //Adicionando o player na cena
    this.add(jogador);
//Pegar sapawn dos npc's
    let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
    let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
    let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]



//configurar npc
let npcA = new Npc(
  vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
  "NpcA",
  "A"
)

let npcB = new Npc(
  vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
  "NpcB",
  "B"
)

let npcC = new Npc(
  vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
  "NpcC",
  "C"
)

//Adicionar os NPC'S 
this.add(npcA)
this.add(npcB)
this.add(npcC)

//Focar a câmera do player
this.camera.strategy.lockToActor(jogador)




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
