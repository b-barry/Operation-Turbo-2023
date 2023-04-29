type Target = import('../types/targets').Target;

/** This file should be overriden for each framework. Ideally this would be implemented in Mitosis.  */
export const TARGET: Target = ((): any => {
  throw new Error(
    'Target is not defined. Be sure to create an override file specifying your target like here: https://github.com/builderio/builder/blob/main/packages/sdks/overrides/react-native/src/constants/target.ts'
  );
})();

/** This file should be overriden for each framework. It should return the correct type for a node such ReactNode for react  */
export type NODE_TARGET = unknown;
