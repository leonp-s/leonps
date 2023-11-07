import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

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

export interface CardStoryblok {
  variant: "" | "overlay" | "separated";
  title: string;
  info: RichtextStoryblok;
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  image: AssetStoryblok;
  _uid: string;
  component: "card";
  [k: string]: any;
}

export interface ColumnStoryblok {
  body?: (
    | CardStoryblok
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
    | CardStoryblok
    | ColumnStoryblok
    | ContainerStoryblok
    | FigureStoryblok
    | GridStoryblok
    | HeroStoryblok
    | PageStoryblok
    | TextStoryblok
  )[];
  max_width:
    | ""
    | "max-w-3xl"
    | "max-w-2xl"
    | "max-w-xl"
    | "max-w-lg"
    | "max-w-md"
    | "max-w-sm"
    | "max-w-xs"
    | "max-w-none"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  _uid: string;
  component: "container";
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
    | CardStoryblok
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
