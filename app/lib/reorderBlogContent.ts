/**
 * Reorders Portable Text blocks so that all inline images appear
 * before the first paragraph that matches a known intro snippet (e.g. Spanish
 * "El desarrollo de software..."). If no block matches, content is unchanged.
 */
function blockToPlainText(block: unknown): string {
  if (
    !block ||
    typeof block !== "object" ||
    (block as { _type?: string })._type !== "block" ||
    !Array.isArray((block as { children?: unknown[] }).children)
  ) {
    return "";
  }
  return (block as { children: { text?: string }[] }).children
    .map((c) => c?.text ?? "")
    .join("");
}

function isImageBlock(block: unknown): boolean {
  return (
    block !== null &&
    typeof block === "object" &&
    (block as { _type?: string })._type === "image"
  );
}

const DEFAULT_INTRO_SNIPPET = "el desarrollo de software está viviendo";

/**
 * Puts all body images (Portable Text) immediately before the intro paragraph.
 */
export function blogContentWithImagesBeforeIntro(
  content: unknown,
  introSnippet: string = DEFAULT_INTRO_SNIPPET,
): unknown {
  if (!Array.isArray(content) || content.length === 0) {
    return content;
  }

  const blocks = content as unknown[];
  const snippet = introSnippet.toLowerCase().trim();

  const textBlocks: unknown[] = [];
  for (const b of blocks) {
    if (!isImageBlock(b)) {
      textBlocks.push(b);
    }
  }

  let introInText = -1;
  for (let i = 0; i < textBlocks.length; i++) {
    const t = blockToPlainText(textBlocks[i]).toLowerCase();
    if (t.includes(snippet)) {
      introInText = i;
      break;
    }
  }

  if (introInText < 0) {
    return content;
  }

  const imageBlocks: unknown[] = blocks.filter((b) => isImageBlock(b));
  if (imageBlocks.length === 0) {
    return content;
  }

  const firstPart = textBlocks.slice(0, introInText);
  const fromIntro = textBlocks.slice(introInText);
  return [...firstPart, ...imageBlocks, ...fromIntro];
}
