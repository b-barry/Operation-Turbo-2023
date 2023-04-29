import { Show, useStore } from '@builder.io/mitosis';
import CardImageLite from './card-image.lite';
import LinkLite from './link.lite';
import CardTitleLite from './card-title.lite';
import { asDay, asMonth, asYear } from './helpers';

export default function CardBlogLite(props: {
  component: { variant?: string };
  title: string;
  identifier: string;
  when: string;
  day: any;
  date: any;
  month: any;
  year: any;
}) {
  const state = useStore({
    get dayAndMonth() {
      return `${props.day || asDay(props.date)} ${
        props.month || asMonth(props.date)
      }`;
    },

    get yearValue() {
      return props.year || asYear(props.date);
    },
  });

  return (
    <div
      className={` flex flex-col mb-4 ${
        props.component?.variant ? 'md:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`relative w-full ${
          props.component?.variant ? 'md:mr-4 md:w-60' : 'mb-4 w-full'
        }`}
      >
        <LinkLite
          target="_blank"
          title={props.title}
          rel="noopener noreferrer"
          href={props.identifier ? props.identifier : ''}
        >
          <Show
            when={props.when}
            else={
              <div className="w-full h-full rounded-lg bg-white bg-opacity-10" />
            }
          >
            <CardImageLite
              alt={props.title}
              src={props.when}
              component={props.component}
            />
          </Show>
        </LinkLite>
      </div>
      <div
        className={`w-full ${
          props.component?.variant ? 'md:w-[calc(100%-15rem)]' : 'w-full'
        }`}
      >
        <LinkLite
          target="_blank"
          title={props.title}
          rel="noopener noreferrer"
          href={props.identifier ? props.identifier : ''}
        >
          <Show
            when={props.title}
            else={
              <div className="w-full rounded-lg bg-white bg-opacity-10 mt-4 py-3"></div>
            }
          >
            <CardTitleLite title={props.title} />
          </Show>
        </LinkLite>
        <Show when={props.component.variant}>
          <p className="title flowing-title">
            {state.dayAndMonth} {state.yearValue}
          </p>
        </Show>
      </div>
    </div>
  );
}
