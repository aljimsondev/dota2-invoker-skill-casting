const PRESSED = 1;
const RELEASED = 0;

interface KeyboardState {
  keys: string[];
  mapKeys: Map<any, any>;
}

class KeyboardState {
  #lastKeyPressed = "";
  #counter = 0;
  constructor() {
    this.keys = [];
    this.mapKeys = new Map();
  }
  listenToWindow(window: Window) {
    let pressed = false;
    let counter = 0;
    ["keydown", "keyup"].map((type) => {
      window.addEventListener(type, (e: any) => {
        if (type === "keydown") {
          if (pressed) {
            //do nothing
            return;
          }
          // console.log(indexToInsertKey);
          this.#lastKeyPressed = e.key; //do other stuff on pressed
          this.mapKeys.set("key", e.key);

          pressed = true; //toogle pressed
        }
        this.getKey(pressed);
        pressed = false;
        if (counter >= 2) {
          //reset counter
          counter = 0;
        }
      });
    });
  }
  getKeys() {
    return this.keys;
  }
  getKey(status: boolean) {
    let arr = [null, null, null];
    if (status) {
      //pressed
      console.log("key is pressed");
      this.#counter += 1; //increment counter everytime function is called
    }
    console.log(this.mapKeys);
    arr.unshift(this.mapKeys.get("key"));

    console.log(arr);
    console.log(this.#counter);
  }
}

export default KeyboardState;
