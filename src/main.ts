import "./css/styles.css";
import { createMainAppDiv } from "./js/app";
import Canvas from "./js/canvas";
import KeyboardState from "./js/Keyboard";
import { ComboType } from "./js/type";

const root = document.getElementById("root")!;
const width = 300;
const canvas = new Canvas(window.innerHeight, width, {
  id: "canvas",
}).render();

//keyboard
const keyboard = new KeyboardState();

const ctx = canvas.getContext("2d")!;
root.appendChild(canvas);
createMainAppDiv(root);

/**
 * TODO: create invoked skill combo
 * TODO: listen to skillcast
 * TODO: in order to get the combo right parsed the array to string before checking mathes
 */
let pressed = false;
let keys: string[] = [];
let invokedSkills: ComboType[] = [];
let supportedkey = ["q", "w", "e", "r", "d", "f"];
let combos: ComboType[] = [
  {
    elemental: ["qqq"],
    skillName: "cold-snap",
  },
  {
    elemental: ["qqe", "qeq", "eqq"],
    skillName: "ice-wall",
  },
  {
    elemental: ["qee", "eqe", "eeq"],
    skillName: "forge-spirit",
  },
  {
    elemental: ["wwq", "wqw", "qww"],
    skillName: "tornado",
  },
  {
    elemental: ["wwe", "wew", "eww"],
    skillName: "alacrity",
  },
  {
    elemental: ["qqw", "qwq", "wqq"],
    skillName: "ghost-walk",
  },
  {
    elemental: ["www"],
    skillName: "emp",
  },
  {
    elemental: ["eee"],
    skillName: "sunstrike",
  },
  {
    elemental: ["qwe", "qew", "wqe", "weq", "eqw", "ewq"],
    skillName: "defending-blast",
  },
  {
    elemental: ["eew", "ewe", "wee"],
    skillName: "chaos-meteor",
  },
  {
    elemental: ["q", "q", "q"],
    skillName: "cold-snap",
  },
];

function SpellChecker(skill: ComboType, cb: () => void) {
  //check length of the array if occupied unless do nothing
  const alreadyCasted = invokedSkills.some(
    (combo) => combo.skillName === skill.skillName
  );
  if (alreadyCasted && invokedSkills.length >= 2) {
    //check if the skill is in the index of 0 if not swap the skill
    const skillIsInPlace = CheckSkillIndex(skill, invokedSkills);
    if (skillIsInPlace) return;
    //swaps the skills
    invokedSkills = SwapSkill(invokedSkills);
    return;
  }
  if (alreadyCasted && invokedSkills.length <= 1) {
    console.log("skill already in slot");
    return;
  }

  cb();
}
const skillInvokedListener = (elementals: string[]) => {
  //parse the elementals to string
  const skillInvoked = elementals.toString().replaceAll(",", "");
  // const elementalMatch =
  const skills: ComboType[] = combos.map((skill) => {
    if (skill.elemental.some((combo) => combo === skillInvoked)) {
      return skill;
    }
    return {
      skillName: "null",
      elemental: [],
    };
  });
  const castedSkill = skills.find((item) => item.skillName !== "null");

  if (castedSkill) {
    //check array length
    SpellChecker(castedSkill, () => {
      {
        if (invokedSkills.length >= 2) {
          invokedSkills.shift();
        }
        invokedSkills.push(castedSkill);
      }
    });
  }
};

window.addEventListener("keydown", (e) => {
  const key = e.key + "";
  const valid = supportedkey.some((k) => k === key);
  if (!valid) {
    return;
  } else {
    // if (pressed) {
    //   return;
    // }
    switch (key) {
      //check invoke combo
      case "r":
        skillInvokedListener(keys);
        break;
      case "d":
        console.log("invoked the skillcast1");
        break;
      case "f":
        console.log("invoked the skillcast2");
        return;
      default:
        keys.push(e.key);
        if (keys.length >= 4) {
          keys.shift();
        }
        pressed = true;
        break;
    }
  }
});

window.addEventListener("keyup", (e) => {
  pressed = false; //unmounting
});

const elementClassListChecker = (el: Element | null, type: string) => {
  if (!el) return;
  let classlist = el.classList.value.split(" ");
  if (classlist.length > 1) {
    //have more that 1 class
    //TODO: remove the appended class
    el.classList.remove(classlist[classlist.length - 1]);
  }
  //append the new classlist
  el.classList.add(type);
};

const renderSkills = () => {
  const parent = document.querySelector("#elementals")!;

  keys.map((key, index) => {
    let type = "";
    if (key === "q") {
      type = "quas";
    } else if (key == "w") {
      type = "wex";
    } else if (key == "e") {
      type = "exort";
    }
    elementClassListChecker(parent.children.item(index), type);
    // ?.classList.add(type);
  });
};

const renderActiveSkills = () => {
  const parent = document.querySelector(".skills-invoked")!;
  invokedSkills.map((skill, index) => {
    elementClassListChecker(parent.children.item(index), skill.skillName);
  });
};

function SwapSkill(skills: ComboType[]) {
  let temp = null;
  temp = skills[0];
  skills[0] = skills[1];
  skills[1] = temp;

  return skills;
}

/**
 * Checks the first index of the array if it's equal to the skill casted
 */
function CheckSkillIndex(skill: ComboType, skills: ComboType[]) {
  return skills[0].skillName === skill.skillName;
}

function main() {
  renderSkills();
  renderActiveSkills();
  requestAnimationFrame(main);
}

main();
