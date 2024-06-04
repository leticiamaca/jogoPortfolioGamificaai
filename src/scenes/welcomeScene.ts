//é comum que coloquenos o nome da classe com o mesmo nome do arquivo

import {
  Actor,
  Color,
  Engine,
  Font,
  Keys,
  Label,
  Scene,
  TextAlign,
  vec,
} from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {
  onInitialize(engine: Engine<any>): void {
    this.backgroundColor = Color.Gray;

    //Configura objeto para ser a frase de bem-vindo
    let fraseBemVindo = new Label({
      text: "Bem vindo ao Portfólio",
      width: 400,
      height: 50,
      pos: vec(engine.drawWidth / 2, 300),
      font: new Font({
        color: Color.White,
        size: 40,
        textAlign: TextAlign.Center,
        family: "Anta",
      }),
    });

    // Adiciona a frase na cena, tela
    this.add(fraseBemVindo);

    //configurar ator do logo
    let actorLogo = new Actor({
      pos: vec(engine.drawWidth / 2, 430),
    });

    //Utilizar imagem do Logo
    let imagemLogo = Resources.Logo.toSprite();

    //Aplicar zoom na imagem
    imagemLogo.scale = vec(0.4, 0.4);

    //Configurar o ator para usar a imagem
    actorLogo.graphics.add(imagemLogo);

    // Adicionando ator logo na tela
    this.add(actorLogo);

    let fraseEnter = new Label({
      text: 'Pressione "Enter" para iniciar...',
      width: 400,
      height: 30,
      pos: vec(engine.drawWidth / 2, 630),
      font: new Font({
        color: Color.White,
        size: 20,
        textAlign: TextAlign.Center,
        family: "Anta",
      }),
    });
    this.add(fraseEnter);
    //Configurar Frase Enter na tela para ficar piscando
    fraseEnter.actions.repeatForever((fraseEnter) => {
      fraseEnter.fade(0, 1000);
      fraseEnter.fade(1, 1000);
    });
    // Monitora o evento de tecla pressionada
    this.input.keyboard.on("press", (event) => {
      //Caso a tecla pressionada seja enter
      if (event.key == Keys.Enter) {
        // Redirecionando para a próxima cena  Historia
        engine.goToScene("historia");
      }
    });
  }
}
