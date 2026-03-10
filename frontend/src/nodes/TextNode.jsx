'use client';

import { useEffect, useRef, useState } from 'react';
import BaseNode from '../components/BaseNode';
import { parseVariables } from '../utils/parseVariables';

export default function TextNode({ data, selected }) {
  const [text, setText] = useState(data?.text ?? '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Resize textarea to fit content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  // Detect {{variables}} live
  useEffect(() => {
    setVariables(parseVariables(text));
  }, [text]);

  return (
    <BaseNode
      title="Text"
      accentColor="oklch(0.6 0.18 50)"
      icon="T"
      inputs={variables.length > 0 ? variables : []}
      outputs={['output']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Content
        </label>
        <div className="relative min-w-[320px]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder={'Type text… use {{variable}} for dynamic inputs'}
            className="w-full overflow-hidden rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
          />
        </div>
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {variables.map((v) => (
              <span
                key={v}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono"
                style={{
                  background: 'oklch(0.6 0.18 50 / 0.15)',
                  color: 'oklch(0.75 0.18 50)',
                  border: '1px solid oklch(0.6 0.18 50 / 0.3)',
                }}
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
