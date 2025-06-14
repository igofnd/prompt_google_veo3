
export interface PromptElements {
  subject: string;
  action: string;
  expression: string;
  setting: string;
  timeOfDay: string;
  cameraMovement: string;
  lighting: string;
  videoStyle: string;
  videoMood: string;
  soundMusic: string;
  spokenNarration: string;
  additionalDetails: string;
}

export type PromptElementKeyType = keyof PromptElements;
