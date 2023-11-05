import {StoryblokStory} from 'storyblok-generate-ts'

export interface HeroStoryblok {
  info: string;
  introduction: string;
  tagline: string;
  cta: string;
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (HeroStoryblok | PageStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}
