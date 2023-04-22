import { ComponentProps } from './uniform.type';
import { asDay, asMonth, asYear } from './helpers';
import { useStore } from '@builder.io/mitosis';

type CardProps = ComponentProps<{
  date: string;
  day: string;
  month: string;
  year: string;
}>;

export default function CardDateLite(props: CardProps) {
  const state = useStore({
    get day() {
      return props.day || asDay(props.date);
    },
    get month() {
      return props.month || asMonth(props.date);
    },
    get year() {
      return props.year || asYear(props.date);
    },
  });
  return (
    <div className="date-field fancy-image bg-black">
      <div className="item-date">
        <div
          className="
        date-wrap
        py-2
        px-4
        text-white
        uppercase
        text-center
        font-black
      "
        >
          <span className="block leading-none text-4xl pb-1">{state.day}</span>
          <span className="block leading-none text-lg pb-1 uppercase">
            {state.month}
          </span>
          <span className="block leading-none text-lg pb-1">{state.year}</span>
        </div>
      </div>
    </div>
  );
}
