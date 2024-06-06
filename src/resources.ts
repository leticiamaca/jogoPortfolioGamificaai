import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png"
import logoVertical from "./images/logo-vertical.png"
import segundoLogoVertical from "./images/logo-vertical para cena 2.png"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  LogoVertical: new ImageSource(logoVertical),
  SegundoLogoVertical: new ImageSource(segundoLogoVertical)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
