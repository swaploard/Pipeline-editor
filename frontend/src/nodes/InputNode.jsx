import BaseNode from '../components/BaseNode';

export default function InputNode({ data, selected }) {
  return (
    <BaseNode
      title="Input"
      accentColor="oklch(0.55 0.2 150)"
      icon="⤵"
      inputs={[]}
      outputs={['value']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Input Name
        </label>
        <input
          type="text"
          defaultValue={data?.inputName ?? 'input_1'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="variable name"
        />
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Type
        </label>
        <select
          defaultValue={data?.inputType ?? 'text'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="file">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
