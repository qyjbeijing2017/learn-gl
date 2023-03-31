export interface IInput {
    mousePosition: [number, number];
    downKeys: Set<number>;
    upKeys: Set<number>;
}

export enum InputKey {
    LeftMouseButton = 0,
    MiddleMouseButton = 1,
    RightMouseButton = 2,
    Space = 32,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40,
}

export class Input {
    private _last: IInput = {
        mousePosition: [0, 0],
        downKeys: new Set<number>(),
        upKeys: new Set<number>(),
    };
    private _current: IInput = {
        mousePosition: [0, 0],
        downKeys: new Set<number>(),
        upKeys: new Set<number>(),
    };
    constructor(private readonly gl: WebGL2RenderingContext) {
        gl.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        gl.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        gl.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        gl.canvas.addEventListener('keydown', this.onKeyDown.bind(this));
        gl.canvas.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    private onMouseMove = (evt: Event) => {
        const event = evt as MouseEvent;
        const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
        this._current.mousePosition = [
            event.clientX - rect.left,
            event.clientY - rect.top,
        ];
    }

    private onMouseDown = (evt: Event) => {
        const event = evt as MouseEvent;
        this._current.downKeys.add(event.button);
    }

    private onMouseUp = (evt: Event) => {
        const event = evt as MouseEvent;
        this._current.upKeys.add(event.button);
    }

    private onKeyDown = (evt: Event) => {
        const event = evt as KeyboardEvent;
        this._current.downKeys.add(event.keyCode);
    }

    private onKeyUp = (evt: Event) => {
        const event = evt as KeyboardEvent;
        this._current.upKeys.add(event.keyCode);
    }

    update() {
        const allDown = new Set([...this._current.downKeys, ...this._last.downKeys]);
        const stillDown = [...allDown].filter(key => !this._current.upKeys.has(key));
        this._last = {
            mousePosition: this._current.mousePosition,
            downKeys: new Set(stillDown),
            upKeys: this._current.upKeys,
        };
        this._current = {
            mousePosition: [0, 0],
            downKeys: new Set(),
            upKeys: new Set(),
        };
    }

    isKeyDown(key: InputKey) {
        return this._current.downKeys.has(key);
    }

    isKeyUp(key: InputKey) {
        return this._current.upKeys.has(key);
    }

    isKeyHeld(key: InputKey) {
        return !this._current.upKeys.has(key) && this._last.downKeys.has(key);
    }



}