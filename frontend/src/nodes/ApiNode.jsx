import BaseNode from '../components/BaseNode';

export default function ApiNode({ data, selected }) {
  return (
    <BaseNode
      title="API"
      accentColor="oklch(0.6 0.18 200)"
      icon="⇅"
      inputs={['body', 'headers']}
      outputs={['response', 'status']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Method
        </label>
        <div className="flex gap-1">
          {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
            <button
              key={m}
              className="flex-1 py-1 rounded text-[10px] font-mono font-semibold border transition-colors"
              style={{
                background:
                  (data?.method ?? 'GET') === m
                    ? 'oklch(0.6 0.18 200 / 0.2)'
                    : 'transparent',
                borderColor:
                  (data?.method ?? 'GET') === m
                    ? 'oklch(0.6 0.18 200)'
                    : 'oklch(0.26 0.02 264)',
                color:
                  (data?.method ?? 'GET') === m
                    ? 'oklch(0.75 0.18 200)'
                    : 'oklch(0.55 0.02 264)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          URL
        </label>
        <input
          type="text"
          defaultValue={data?.url ?? 'https://api.example.com'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </BaseNode>
  );
}
