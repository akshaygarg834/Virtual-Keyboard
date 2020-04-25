import "./styles.css";

const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    onInput: null,
    onClose: null
  },

  properties: {
    value: "",
    capslock: false,
    inputTargetClassName: null
  },

  init(inputTargetClassName) {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard--keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard--key"
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // document.getElementsByClassName(this.properties.inputTargetClassName).forEach( element =>{

    // })
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space"
    ];

    const createIconHTML = icon_name => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      const keyElement = document.createElement("button");
      keyElement.type = "button";
      keyElement.classList.add("keyboard--key");
      switch (key) {
        case "caps":
          keyElement.classList.add(
            "keyboard--key-wide",
            "keyboard--key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            this._handleCapsLock();
            this.properties.capslock
              ? keyElement.classList.add("keyboard--key--active")
              : keyElement.classList.remove("keyboard--key--active");
          });
          break;
        case "backspace":
          keyElement.classList.add("keyboard--key-wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.slice(
              0,
              this.properties.value.length - 1
            );
            this._triggerEventHandler("onInput");
          });
          break;
        case "space":
          keyElement.classList.add("keyboard--key-extrawide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEventHandler("onInput");
          });
          break;
        case "enter":
          keyElement.classList.add("keyboard--key-wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEventHandler("onInput");
          });
          break;
        case "done":
          keyElement.classList.add("keyboard--key-wide", "keyboard--key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", () => {
            this._triggerEventHandler("onClose");
            this.close();
          });
          break;
        default:
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capslock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEventHandler("onInput");
          });
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _handleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
    this.elements.keys.forEach(key => {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capslock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    });
  },

  _triggerEventHandler(eventHandlerName) {
    if (typeof this.eventHandlers[eventHandlerName] === "function") {
      console.log(eventHandlerName + " triggered");
      this.eventHandlers[eventHandlerName](this.properties.value);
    }
  },

  open(initialValue, onInput, onClose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.onInput = onInput;
    this.eventHandlers.onClose = onClose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    // this.eventHandlers.onInput = onInput;
    // this.eventHandlers.onClose = onClose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

// window.addEventListener("DOMContentLoaded", function() {
keyboard.init();
keyboard.open("", console.log, console.log);
// });
