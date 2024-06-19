import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";


import sword from "./images/sword.png";
import logo from "./images/logo.png"
import logoVertical from "./images/logo-vertical.png"
import segundoLogoVertical from "./images/logo-vertical para cena 2.png"
import npcA from "./images/npcA.png"
import npcB from "./images/npcB.png"
import npcC from "./images/npcC.png"
import soundBGM from "./sounds/zelda.mp3"


import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url"
import tmxMapaPath from "./maps/showroom_map.tmx?url"
import playerSpritePath from "./sprites/Jogador.png"
import npcASpritePlayer from "./sprites/Npc-A.png"
import npcBSpritePlayer from "./sprites/Npc-B.png"
import npcCSpritePlayer from "./sprites/Npc-C.png"

export const Resources = {
  SoundBGM: new Sound(soundBGM),
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  LogoVertical: new ImageSource(logoVertical),
  NpcA: new ImageSource(npcA),
  NpcB: new ImageSource(npcB),
  NpcC: new ImageSource(npcC),
  SegundoLogoVertical: new ImageSource(segundoLogoVertical),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, {filtering: ImageFiltering.Pixel}),
  NpcASpritePlayer: new ImageSource(npcASpritePlayer,{filtering: ImageFiltering.Pixel}),
  NpcBSpritePlayer: new ImageSource(npcBSpritePlayer,{filtering: ImageFiltering.Pixel}),
  NpcCSpritePlayer: new ImageSource(npcCSpritePlayer,{filtering: ImageFiltering.Pixel}),

  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path: "showroom_map.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx",  output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_estoque.tsx", output: tsxBibliotecaPath},
    
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
