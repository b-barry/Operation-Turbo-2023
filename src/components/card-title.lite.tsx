import { ComponentProps } from './uniform.type';

type CardProps = ComponentProps<{
  title: string;
}>;

export default function CardTitleLite(props: CardProps) {
  return (
    <h3 className="text-xl mb-2 line-clamp-2 font-black underline">
      {props.title}
    </h3>
  );
}
