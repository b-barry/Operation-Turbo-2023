import { ComponentProps } from './uniform.type';

type CardProps = ComponentProps<{
  description: string;
}>;

export default function CardDescriptionLite(props: CardProps) {
  return <p className="line-clamp-2">{props.description}</p>;
}
