import BaseNode from '../components/BaseNode';

const LEVELS = ['debug', 'info', 'warn', 'error'];

export default function LoggerNode({ data, selected }) {
  return (
    <BaseNode
      title="Logger"
      accentColor="oklch(0.6 0.15 130)"
      icon="≡"
      inputs={['data']}
      outputs={['passthrough']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Log Level
        </label>
        <div className="flex gap-1">
          {LEVELS.map((level) => {
            const colors = {
              debug: 'oklch(0.6 0.1 250)',
              info: 'oklch(0.6 0.15 130)',
              warn: 'oklch(0.65 0.18 70)',
              error: 'oklch(0.6 0.22 27)',
            };
            return (
              <button
                key={level}
                className="flex-1 py-1 rounded text-[10px] font-mono font-semibold border transition-colors"
                style={{
                  background:
                    (data?.level ?? 'info') === level
                      ? `${colors[level]}33`
                      : 'transparent',
                  borderColor:
                    (data?.level ?? 'info') === level
                      ? colors[level]
                      : 'oklch(0.26 0.02 264)',
                  color:
                    (data?.level ?? 'info') === level
                      ? colors[level]
                      : 'oklch(0.55 0.02 264)',
                }}
              >
                {level}
              </button>
            );
          })}
        </div>
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Prefix
        </label>
        <input
          type="text"
          defaultValue={data?.prefix ?? '[LOG]'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </BaseNode>
  );
}
