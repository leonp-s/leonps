import { FC } from "react";
import { BiChevronRight } from "react-icons/bi";

const ImageBackgroundCard: FC<{
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}> = ({ imageAlt, imageUrl, title, description, href }) => {
  return (
    <a
      className={`group relative flex flex-col w-full min-h-[15rem] bg-center bg-cover rounded-xl hover:shadow-lg transition`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      href={href}
    >
      <div className="flex-auto p-4 md:p-6">
        <h3 className="text-xl text-white/[.9] group-hover:text-white">
          <span className="font-bold">{title}</span> {description}
        </h3>
      </div>
      <div className="pt-0 p-4 md:p-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/[.7]">
          Visit the site
          <BiChevronRight />
        </div>
      </div>
    </a>
  );
};

const SeperatedCard: FC<{
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}> = ({ imageAlt, imageUrl, title, description, href }) => {
  return (
    <a className="group rounded-xl overflow-hidden" href={href}>
      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden will-change-transform">
        <img
          className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          src={imageUrl}
          alt={imageAlt}
        />
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
          {title}
        </h3>
        <p className="mt-3 text-gray-800 dark:text-gray-200">{description}</p>
        <p className="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
          Read more
          <BiChevronRight />
        </p>
      </div>
    </a>
  );
};

const Projects = () => {
  return (
    <div className="container py-10 relative">
      <div
        id="projects"
        style={{
          position: "absolute",
          top: "-40px",
        }}
      />
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="font-bold md:text-4xl md:leading-tight dark:text-white">
          Projects
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Here are a few of the projects I have been pursuing recently. Please
          take a look around!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SeperatedCard
          title="Zones Convolution"
          description="Access and convolve a rapidly growing community driven library of impulse responses online or directly from your DAW. Plugin client in JUCE (C++), backend and web client built using NextJS, Lambda, S3, terraform and Algolia."
          imageUrl="/projects/zones/zones_client_browser.png"
          imageAlt="Image Description"
          href="/projects/zones"
        />
        <SeperatedCard
          title="BeanstormOS"
          description="Espresso machine conversion incorperating pressure and temperature control via a native IOS app over BLE. Realtime control in C++, native IOS app in Swift/SwiftUI."
          imageUrl="/projects/beanstorm/beanstorm_portfolio_banner.png"
          imageAlt="BeanstormOS Project Banner"
          href="#"
        />
        <ImageBackgroundCard
          title="Preline"
          description="Press publishes books about
          economic and technological advancement."
          imageUrl="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80"
          imageAlt="Image Description"
          href="#"
        />
        <SeperatedCard
          title="Orbital Delay"
          description="Orbital delay designer built in JUCE (C++). This makes designing delays fast and intuitive, simply drag and drop taps into an orbital pattern."
          imageUrl="/projects/orbital_delay/orbital_delay_banner.png"
          imageAlt="Orbital Delay Project Banner"
          href="#"
        />
        <SeperatedCard
          title="Redshift"
          description="Lightning fast arena shooter built in Unity."
          imageUrl="/projects/redshift/redshift_banner.png"
          imageAlt="RedshiftFPS Banner"
          href="/projects/redshift"
        />
        <SeperatedCard
          title="Onsite"
          description="Optimize your in-person experience with best-in-class capabilities like badge printing and lead retrieval"
          imageUrl="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          imageAlt="Image Description"
          href="#"
        />
      </div>
    </div>
  );
};

export default Projects;
