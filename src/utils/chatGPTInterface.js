export function getChatGPTInput() {
  return document.querySelector("textarea[data-id]");
}

export function appendValueToCGPTInput(content) {
  if (!getChatGPTInput()) return;
  getChatGPTInput().value += content;
}

export function triggerKeyPress() {
  // Get the textarea element with the data-id attribute
  const textarea = document.querySelector('textarea[data-id]');

  // Create a new mouse click event
  const input = new Event('input', {
    bubbles: true,
  });

  // Create a new mouse click event
  const change = new Event('change', {
    bubbles: true,
  });

  // Dispatch the mouse click event on the textarea element
  textarea.dispatchEvent(input);
  textarea.dispatchEvent(change);
}


// Add an event listener to the textarea to handle the keypress event
document.querySelector('textarea[data-id]').addEventListener('keypress', function(event) {
  console.log('Key pressed:', event.key, event.charCode);
});
