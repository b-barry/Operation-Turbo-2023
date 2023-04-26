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
    get dayValue() {
      return props.day || asDay(props.date);
    },
    get monthValue() {
      return props.month || asMonth(props.date);
    },
    get yearValue() {
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
          <span className="block leading-none text-4xl pb-1">{state.dayValue}</span>
          <span className="block leading-none text-lg pb-1 uppercase">
            {state.monthValue}
          </span>
          <span className="block leading-none text-lg pb-1">{state.yearValue}</span>
        </div>
      </div>
    </div>
  );
}
