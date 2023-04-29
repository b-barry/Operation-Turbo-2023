/** This file should be overriden for each framework. It should return the correct type for a node such ReactNode for react  */
export type SlotUniform = unknown;

/** This file should be overriden for each framework. Ideally this would be implemented in Mitosis.  */
export default function SlotUniform(props: {
  name: string;
  emptyPlaceholder?: any;
}) {
  console.error(
    'This component "SlotUniform" should be overriden for each framework'
  );
  return <p>NOT OVERRIDED</p>;
}
