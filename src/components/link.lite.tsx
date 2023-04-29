/** This file should be overriden for each framework. It should return the correct type for a node such ReactNode for react  */
export type LinkLite = unknown;

/** This file should be overriden for each framework. Ideally this would be implemented in Mitosis.  */
export default function LinkLite() {
  console.error('This component "Link" should be overriden for each framework');
  return <p>NOT OVERRIDED</p>;
}
