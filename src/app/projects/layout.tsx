import { ReactNode } from "react";

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-grow container my-24 gap-8 ">
      <article className="prose prose-slate dark:prose-invert md:prose-lg prose-a:text-blue-600 self-center">
        {children}
      </article>
    </main>
  );
};

export default ProjectsLayout;
