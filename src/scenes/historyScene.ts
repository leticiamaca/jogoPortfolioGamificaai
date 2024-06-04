import {Engine, Scene, Color} from 'excalibur'

export class historyScene extends Scene {
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Red
    }
}