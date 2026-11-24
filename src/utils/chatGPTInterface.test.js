import { test } from "node:test";
import assert from "node:assert/strict";

test("loads on a page without the ChatGPT composer", async () => {
  globalThis.document = { querySelector: () => null };
  const chatGPT = await import("./chatGPTInterface.js");
  assert.equal(chatGPT.getChatGPTInput(), null);
  assert.doesNotThrow(() => chatGPT.appendValueToCGPTInput("text"));
  assert.doesNotThrow(() => chatGPT.triggerKeyPress());
});
