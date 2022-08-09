export type MyNode = (parent: Element) => void;

export type KeyboardEventHandlerType = (
  type: WindowEventMap["keyup"] | WindowEventMap["keydown"],
  event: KeyboardEvent
) => void;

export type ComboType = {
  elemental: string[];
  skillName: string;
};
