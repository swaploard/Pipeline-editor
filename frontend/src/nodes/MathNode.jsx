import BaseNode from '../components/BaseNode';

export default function MathNode({ data, selected }) {
  return (
    <BaseNode
      title="Math"
      accentColor="oklch(0.6 0.2 340)"
      icon="∑"
      inputs={['a', 'b']}
      outputs={['result']}
      selected={selected}
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
          Operation
        </label>
        <select
          defaultValue={data?.operation ?? 'add'}
          className="w-full rounded-md px-2 py-1.5 text-xs font-mono bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="add">Add (a + b)</option>
          <option value="subtract">Subtract (a - b)</option>
          <option value="multiply">Multiply (a × b)</option>
          <option value="divide">Divide (a ÷ b)</option>
          <option value="power">Power (a ^ b)</option>
          <option value="modulo">Modulo (a % b)</option>
        </select>
      </div>
    </BaseNode>
  );
}
