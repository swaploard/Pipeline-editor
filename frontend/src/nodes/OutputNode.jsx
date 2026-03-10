import BaseNode from '../components/BaseNode';

export default function OutputNode({ data, selected }) {
  return (
    <BaseNode
      title="Output"
      accentColor="oklch(0.55 0.18 200)"
      icon="⤴"
      inputs={['value']}
      outputs={[]}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Output Name
        </label>
        <input
          type="text"
          defaultValue={data?.outputName ?? 'output_1'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="output name"
        />
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Type
        </label>
        <select
          defaultValue={data?.outputType ?? 'text'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
