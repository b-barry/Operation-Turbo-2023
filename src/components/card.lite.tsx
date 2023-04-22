import { ComponentProps } from './uniform.type';
import CardImageLite from './card-image.lite';
import { Show } from '@builder.io/mitosis';
import LinkLite from './link.lite';
import CardTitleLite from './card-title.lite';
import CardDescriptionLite from './card-description.lite';
import CardBlogLite from './card-blog.lite';
import { isDateBeforeToday } from './helpers';
import CardDateLite from './card-date.lite';

type CardProps = ComponentProps<{
  identifier: string;
  type: string;
  title: string;
  description: string;
  date: string;
  media: string;
  day: string;
  month: string;
  year: string;
  upcoming: boolean;
  component: {
    variant?: string;
  };
}>;

export default function CardLite(props: CardProps) {
  return (
    <>
      <Show when={!props.type || props.type === 'video'}>
        <div
          className={` flex flex-col mb-4 ${
            props.component?.variant ? 'md:flex-row' : 'flex-col'
          }`}
        >
          <div
            className={`relative w-full ${
              props.component?.variant ? 'md:mr-4 md:w-60' : 'w-full'
            } ${!props.media ? 'aspect-[16/9] mb-0' : 'mb-4'}`}
          >
            <LinkLite
              target="_blank"
              title={props.title}
              rel="noopener noreferrer"
              href={`https://youtube.com/watch?v=${props.identifier}`}
            >
              <Show
                when={props.media}
                else={
                  <div className="w-full h-full rounded-lg bg-white bg-opacity-10" />
                }
              >
                <CardImageLite
                  alt={props.title}
                  src={props.media}
                  component={props.component}
                />
              </Show>
              <span className="play"></span>
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
              href={`https://youtube.com/watch?v=${props.identifier}`}
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
            <Show when={props.description && props.component.variant}>
              <CardDescriptionLite description={props.description} />
            </Show>
            <Show when={!props.description && props.component.variant}>
              <div className="w-3/4 rounded-lg bg-white bg-opacity-10 py-3 mt-4"></div>
            </Show>
          </div>
        </div>
      </Show>
      <Show when={props.type === 'blog'}>
        <CardBlogLite
          component={props.component}
          title={props.title}
          identifier={props.identifier}
          when={props.media}
          day={props.day}
          date={props.date}
          month={props.month}
          year={props.year}
        />
      </Show>
      <Show when={props.type === 'talk'}>
        <div className="flex flex-row">
          <div className="w-20 mr-4">
            <CardDateLite
              date={props.date}
              day={props.day}
              month={props.month}
              year={props.year}
            />
          </div>
          <div
            className={`${
              props.component?.variant
                ? 'w-full md:w-[calc(100%-5rem)]'
                : 'w-full'
            }`}
          >
            <Show
              when={
                props.upcoming ||
                (props.date && !isDateBeforeToday(new Date(props.date)))
              }
            >
              <p className="inline-block font-bold text-lg uppercase fancy-title">
                upcoming
              </p>
            </Show>
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
            <Show when={props.description}>
              <CardDescriptionLite description={props.description} />
            </Show>
          </div>
        </div>
      </Show>
    </>
  );
}
