import type { ArgTypes, Tag } from '@storybook/csf';

type AnyJson = boolean | number | string | null | Array<AnyJson> | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
export type CsfString = string;

interface AnnotationsConfig {
  parameters?: JsonMap;
  args?: JsonMap;
  argTypes?: ArgTypes;
  tags?: Tag[];
  // FIXME: need ArrowFunctionExpression in magicast
  // decorators?: JSAnnotation[];
  // loaders?: JSAnnotation[];
  // render?: JSAnnotation;
  // play?: JSAnnotation;
}
export interface MetaConfig extends AnnotationsConfig {
  title?: string;
}
export interface StoryConfig extends AnnotationsConfig {
  name?: string;
}
export type StoryConfigs = Record<string, StoryConfig>;

export interface DynamicConfig {
  baseCsf: CsfString;
  stories: () => Promise<StoryConfigs> | StoryConfigs;
}

export interface IComponentState {
  [key: string]: ValueType | undefined;
  slots?: IComponentSlot[];
  readonly containerStyles?: Record<string, string | number>;
}

export type ValueType = string | number | boolean | object | object[];
export type FitStorybook = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'unknown';

interface IComponentSlot {
  readonly name?: string;
  readonly content: string;
}

export interface IGenerateStateArgs {
  readonly componentName: string;
  readonly states: IComponentState[];
  readonly excludedPropsFromTitle?: string[];
  readonly fits?: FitStorybook[];
  readonly variants?: string[];
  readonly appearances?: string[];
  readonly cardClassList?: string[];
  readonly cardItemAccessibilityAttributes?: string;
  readonly containerStyles?: Record<string, string | number>;
}
