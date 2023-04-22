import { ComponentProps } from './uniform.type';
import LinkLite from './link.lite';

type CtaProps = ComponentProps<{
  text: string;
  link: any;
  externalLink: string;
}>;

export default function CtaLite(props: CtaProps) {
  return (
    <LinkLite
      title={props.text}
      className="cta cta-default"
      href={props.link ? props.link : props.externalLink}
      target={props.externalLink ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      {props.text}
    </LinkLite>
  );
}
