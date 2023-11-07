import {StoryblokStory} from 'storyblok-generate-ts'

export interface ColumnStoryblok {
  body?: (
    | ColumnStoryblok
    | ContainerStoryblok
    | FigureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | PageStoryblok
    | TextStoryblok
  )[];
  _uid: string;
  component: "column";
  [k: string]: any;
}

export interface ContainerStoryblok {
  body?: (
    | ColumnStoryblok
    | ContainerStoryblok
    | FigureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | PageStoryblok
    | TextStoryblok
  )[];
  _uid: string;
  component: "container";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface FigureStoryblok {
  image: AssetStoryblok;
  _uid: string;
  component: "figure";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: ColumnStoryblok[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface HeroStoryblok {
  info: RichtextStoryblok;
  introduction: string;
  tagline: string;
  cta: string;
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | ColumnStoryblok
    | ContainerStoryblok
    | FigureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | PageStoryblok
    | TextStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface TextStoryblok {
  text: RichtextStoryblok;
  _uid: string;
  component: "text";
  [k: string]: any;
}
