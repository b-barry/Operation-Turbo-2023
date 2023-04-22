import {useMetadata, useStore} from '@builder.io/mitosis';
import {ComponentProps} from './uniform.type';
import React from 'react';

type TitleProps = ComponentProps<{
  text: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  bottomMargin: boolean;
  component: {
    variant?: string;
  };
}>;

useMetadata({
  elementTag: 'state.tag',
});
export default function TitleLite(props: TitleProps) {
  const state = useStore({
    tag: props.type || 'h1',
    get size() {
      let sizeClass = 'text-3xl md:text-7xl';
      switch (props.component.variant) {
        case 'large':
          sizeClass = 'text-3xl md:text-6xl';
          break;
        case 'medium':
          sizeClass = 'text-3xl md:text-5xl';
          break;
        case 'small':
          sizeClass = 'text-3xl';
          break;

        default:
          sizeClass = 'text-3xl md:text-6xl';
          break;
      }
      return sizeClass;
    },
  });
  return (
    <div className={`${props.bottomMargin ? 'mb-6' : 'mb-auto'} `}>
      <state.tag
        className={`${state.size} title flowing-title leading-mobiletitle md:leading-title`}
      >
        {props.text}
      </state.tag>
    </div>
  );
}
