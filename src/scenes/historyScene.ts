import {Engine, Scene, Color, FadeInOut, Transition} from 'excalibur'

export class historyScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
          direction: direction,
        color: Color.Black,
        duration: 1000  
        })
        
    }
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Red
    }
}