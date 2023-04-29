import {ReactNode} from "react";

/** This file should be overriden for each framework. Ideally this would be implemented in Mitosis.  */
export const TARGET = 'react' as any;

/** This file should be overriden for each framework. It should return the correct type for a node such ReactNode for react  */
export type NODE_TARGET = ReactNode;