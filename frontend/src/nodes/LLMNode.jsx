import BaseNode from '../components/BaseNode';

const MODELS = [
  'gpt-4o',
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'claude-3-opus',
  'claude-3-sonnet',
  'gemini-1.5-pro',
];

export default function LLMNode({ data, selected }) {
  return (
    <BaseNode
      title="LLM"
      accentColor="oklch(0.6 0.2 270)"
      icon="◈"
      inputs={['system', 'prompt', 'context']}
      outputs={['response']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Model
        </label>
        <select
          defaultValue={data?.model ?? 'gpt-4o'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {MODELS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Temperature
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          defaultValue={data?.temperature ?? '0.7'}
          className="w-full accent-primary"
        />
        <div className="flex gap-2 items-center">
          <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
            Max Tokens
          </label>
          <input
            type="number"
            defaultValue={data?.maxTokens ?? 512}
            className="w-20 rounded-md px-2 py-1 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </BaseNode>
  );
}
