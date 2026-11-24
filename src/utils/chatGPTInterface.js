// chatgpt.com names its composer "prompt"; chat.openai.com used data-id.
const COMPOSER_SELECTOR = 'textarea[name="prompt"], textarea[data-id]';

export function getChatGPTInput() {
  return document.querySelector(COMPOSER_SELECTOR);
}

// Framework-controlled inputs ignore `input.value = x`; the native setter
// updates the value the framework tracks.
function setNativeValue(textarea, value) {
  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(textarea),
    "value"
  )?.set;
  if (setter) setter.call(textarea, value);
  else textarea.value = value;
}

export function appendValueToCGPTInput(content) {
  const textarea = getChatGPTInput();
  if (!textarea) return;
  setNativeValue(textarea, textarea.value + content);
}

export function triggerKeyPress() {
  const textarea = getChatGPTInput();
  if (!textarea) return;

  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.dispatchEvent(new Event("change", { bubbles: true }));
}
