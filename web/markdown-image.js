import { Node } from '@tiptap/core';

export function inspectMarkdownImages(text, tokens) {
  const images = [];
  function visit(value, formatted = false) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) {
      value.forEach(item => visit(item, formatted));
      return;
    }
    if (value.type === 'image') {
      if (formatted || !value.raw.endsWith(')')) {
        throw new Error('Linked, formatted or reference-style images are not supported by visual editing. Use Markdown source to preserve them.');
      }
      images.push(value.raw);
      return;
    }
    const nested = formatted || ['link', 'strong', 'em', 'del'].includes(value.type);
    for (const child of Object.values(value)) visit(child, nested);
  }
  visit(tokens);
  if ((text.match(/!\[/g) || []).length !== images.length) {
    throw new Error('This draft contains image markup not supported by visual editing. Use Markdown source to preserve it.');
  }
  return images;
}

export const MarkdownImage = Node.create({
  name: 'markdownImage',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return { raw: { default: '' }, alt: { default: '' } };
  },
  renderHTML({ node }) {
    return ['span', { class: 'editor-image', contenteditable: 'false' },
      `[Image: ${node.attrs.alt || 'untitled'}]`];
  },
  markdownTokenName: 'image',
  parseMarkdown(token, helpers) {
    if (!token.raw.endsWith(')')) {
      throw new Error('Reference-style images are not supported by visual editing. Use Markdown source to preserve them.');
    }
    return helpers.createNode('markdownImage', { raw: token.raw, alt: token.text });
  },
  renderMarkdown(node) {
    return node.attrs.raw;
  },
});
