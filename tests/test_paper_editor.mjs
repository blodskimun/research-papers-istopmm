import assert from 'node:assert/strict';
import test from 'node:test';
import StarterKit from '@tiptap/starter-kit';
import { MarkdownManager } from '@tiptap/markdown';
import { inspectMarkdownImages, MarkdownImage } from '../web/markdown-image.js';

function manager() {
  return new MarkdownManager({
    extensions: [StarterKit, MarkdownImage],
    markedOptions: { breaks: true, gfm: true },
  });
}

test('preserves image markup when surrounding text changes', () => {
  const markdown = manager();
  const images = [
    '![Figure 1](/library/paper/pdf-page?id=doi%3A10.1%2Fpaper&page=2&sha256=abc&xref=24)',
    '![Figure [2]](https://example.test/figure.png "Figure title")',
  ];
  const document = markdown.parse(`Before ${images[0]} after\n\n${images[1]}`);
  document.content[0].content[0].text = 'Changed ';
  const result = markdown.serialize(document);
  assert.match(result, /^Changed /);
  for (const image of images) assert.ok(result.includes(image), image);
});

test('reference-style images fall back rather than lose their definitions', () => {
  assert.throws(
    () => manager().parse('![Figure][source]\n\n[source]: /figure.png'),
    /Reference-style images/,
  );
});

test('rejects image contexts and unparsed markup that cannot round-trip safely', () => {
  const markdown = manager();
  for (const source of [
    '[![alt](/image)](/target)',
    '**![alt](/image)**',
    '![Figure][source]\n\n[source]: /figure.png',
    '`![not an image]`',
  ]) {
    assert.throws(() => inspectMarkdownImages(source, markdown.instance.lexer(source)), /image/i, source);
  }
  const source = '![one](/image) ![one](/image)';
  assert.deepEqual(inspectMarkdownImages(source, markdown.instance.lexer(source)), [
    '![one](/image)', '![one](/image)',
  ]);
});
