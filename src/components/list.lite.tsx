import { ComponentProps } from './uniform.type';
import UniformSlot from './slot-uniform.lite';

type ListProps = ComponentProps<{
  component: {
    variant?: string;
  };
  moreSpace: boolean;
  twoItems: boolean;
}>;
export default function ListLite(props: ListProps) {
  return (
    <div
      className={`${
        props.component?.variant !== 'list' || !props.component?.variant
          ? 'row-component'
          : 'list'
      }`}
    >
      <UniformSlot name="title" emptyPlaceholder={<div className="h-12" />} />

      <UniformSlot
        name="description"
        emptyPlaceholder={<div className="h-12" />}
      />
      <div
        className={`mt-4 grid ${props.moreSpace ? 'gap-12' : 'gap-4'} 
      ${
        !props.component?.variant || props.component?.variant === 'grid'
          ? `grid-cols-1 ${
              props.twoItems ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`
          : 'grid-cols-1'
      }`}
      >
        <UniformSlot name="list" emptyPlaceholder={<div className="h-12" />} />
      </div>
    </div>
  );
}
