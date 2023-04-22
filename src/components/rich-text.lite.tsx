import { Show, useStore } from '@builder.io/mitosis';
import { ComponentProps } from './uniform.type';

type RichTextProps = ComponentProps<{
  content: {
    rteValue: string;
  };
  component: {
    variant?: string;
  };
}>;
export default function RichTextLite(props: RichTextProps) {
  const state = useStore({
    get html() {
      return { __html: props.content?.rteValue };
    },
  });
  return (
    <Show when={props.content}>
      <article
        className={`rich-text text-xl mb-4 ${
          props.component.variant ? 'p-8' : 'p-0'
        }`}
        dangerouslySetInnerHTML={state.html}
      />
    </Show>
  );
}
