import { ReactNode } from "react";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-grow container my-24 gap-8 max-w-4xl">
      <article className="prose prose-slate dark:prose-invert md:prose-lg prose-a:text-blue-600 prose-img:rounded prose-figure:flex prose-figure:flex-col prose-figure:items-center max-w-none prose-p:text-justify">
        {children}
      </article>
    </main>
  );
};

export default ProjectsLayout;
