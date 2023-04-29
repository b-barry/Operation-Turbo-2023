import { ComponentProps } from './uniform.type';
import UniformSlot from './slot-uniform.lite';
import { useStore } from '@builder.io/mitosis';

type ContainerProps = ComponentProps<{
  label: string;
  background: string;
  component: {
    variant?: string;
  };
}>;
export default function ContainerLite(props: ContainerProps) {
  const state = useStore({
    get backgroundStyle() {
      return { background: props.background ? props.background : '#0F223E' };
    },
    get className() {
      return `${
        props.component?.variant
          ? 'w-full py-12 mb-12'
          : 'max-w-[1400px] mx-auto'
      }`;
    },
  });
  return (
    <div style={state.backgroundStyle} className={state.className}>
      <div className="max-w-[1400px] mx-auto">
        <UniformSlot name="content" />
      </div>
    </div>
  );
}
