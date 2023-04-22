import { ComponentProps } from './uniform.type';
import UniformSlot from './slot-uniform.lite';
import { useStore } from '@builder.io/mitosis';

type TwoColumnProps = ComponentProps<{
  layout: '1-1' | '1-2' | '2-1';
  spaceBelow: boolean;
}>;
export default function TwoColumnLite(props: TwoColumnProps) {
  const state = useStore({
    get position() {
      let sideA = '';
      let sideB = '';

      switch (props.layout) {
        case '1-1':
          sideA = 'md:w-2/4';
          sideB = 'md:w-2/4';
          break;
        case '1-2':
          sideA = 'md:w-2/5';
          sideB = 'md:w-3/5';
          break;
        case '2-1':
          sideA = 'md:w-3/5';
          sideB = 'md:w-2/5';
          break;
      }
      return {
        sideA,
        sideB,
      };
    },
  });
  return (
    <div
      className={`row-component flex flex-col md:flex-row ${
        props.spaceBelow ? 'mb-12' : ''
      }`}
    >
      <div className={`w-full mb-8 md:mb-0 md:pr-12 ${state.position.sideA}`}>
        <UniformSlot name="sideA" />
      </div>
      <div className={`w-full ${state.position.sideB}`}>
        <UniformSlot name="sideB" />
      </div>
    </div>
  );
}
