import BaseNode from '../components/BaseNode';

export default function DelayNode({ data, selected }) {
  return (
    <BaseNode
      title="Delay"
      accentColor="oklch(0.6 0.18 300)"
      icon="⏱"
      inputs={['trigger']}
      outputs={['after']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Duration
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            defaultValue={data?.duration ?? 1000}
            min="0"
            className="flex-1 rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            defaultValue={data?.unit ?? 'ms'}
            className="w-20 rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ms">ms</option>
            <option value="s">s</option>
            <option value="m">min</option>
          </select>
        </div>
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Mode
        </label>
        <select
          defaultValue={data?.mode ?? 'fixed'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="fixed">Fixed</option>
          <option value="random">Random</option>
          <option value="exponential">Exponential Backoff</option>
        </select>
      </div>
    </BaseNode>
  );
}
