import { FC } from "react";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import { Hammer } from "lucide-react";

const ImageBackgroundCard: FC<{
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  cta: string;
  openInNewTab: boolean;
}> = ({ imageAlt, imageUrl, title, description, href, cta, openInNewTab }) => {
  return (
    <a
      className={`group relative flex flex-col w-full min-h-[30rem] bg-center bg-cover rounded-xl hover:shadow-lg transition overflow-hidden`}
      href={href}
      target={openInNewTab ? "_blank" : ""}
    >
      <Image
        className="w-full h-full absolute top-0 left-0 z-0"
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex-auto p-4 md:p-6 z-10">
        <h3 className="text-xl text-white/[.9] group-hover:text-white">
          <span className="font-bold">{title}</span> {description}
        </h3>
      </div>
      <div className="pt-0 p-4 md:p-6 z-10">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/[.7]">
          {cta}
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
  comingSoon?: boolean;
}> = ({ imageAlt, imageUrl, title, description, href, comingSoon }) => {
  const readMoreCta = (
    <p className="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
      Read more
      <BiChevronRight />
    </p>
  );

  const comingSoonCta = (
    <p className="mt-5 inline-flex items-center gap-x-1.5 text-muted-foreground decoration-2 font-medium">
      Under Construction - Check Back Soon
      <Hammer className="w-4 h-4" />
    </p>
  );

  const content = (
    <>
      <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden will-change-transform">
        <Image
          className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
        />
      </div>

      <div className="mt-7">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
          {title}
        </h3>
        <p className="mt-3 text-gray-800 dark:text-gray-200">{description}</p>
        {comingSoon ? comingSoonCta : readMoreCta}
      </div>
    </>
  );

  return comingSoon ? (
    <div className="group rounded-xl overflow-hidden">{content}</div>
  ) : (
    <a className="group rounded-xl overflow-hidden" href={href}>
      {content}
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
        <h2 className="font-bold text-2xl md:text-4xl md:leading-tight dark:text-white">
          Projects
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Here are a few of the hobby projects I have been pursuing recently.
          Please take a look around!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SeperatedCard
          title="Zones Convolution"
          description="Access and convolve a rapidly growing community driven library of impulse responses online or directly from your DAW. Plugin client in JUCE (C++), backend and web client built using NextJS, Lambda, S3, Terraform and Algolia."
          imageUrl="/projects/zones/zones_client_browser.png"
          imageAlt="Image Description"
          href="/projects/zones"
        />
        <SeperatedCard
          title="BeanstormOS"
          description="Espresso machine conversion incorperating pressure and temperature control via a native IOS app over BLE. Realtime control in C++, native IOS app in Swift/SwiftUI."
          imageUrl="/projects/beanstorm/beanstorm_portfolio_banner.png"
          imageAlt="BeanstormOS Project Banner"
          href="/projects/beanstorm"
        />
        <ImageBackgroundCard
          title="Offensive Plugins"
          description="Co-founded plugin development company now collaborating with an artist to create a new range of Slushwave plugins."
          imageUrl="/projects/sinemind/op_banner.png"
          imageAlt="Offensive Plugins Banner"
          href="https://offensiveplugins.com"
          cta="Visit the site"
          openInNewTab={true}
        />
        <ImageBackgroundCard
          title="Redshift"
          description="Lightning fast arena shooter built in Unity (C#)."
          imageUrl="/projects/redshift/redshift_banner.png"
          imageAlt="RedshiftFPS Banner"
          href="/projects/redshift"
          cta="Read more"
          openInNewTab={false}
        />
        <SeperatedCard
          title="Orbital Delay"
          description="Orbital delay designer built in JUCE (C++). This makes designing delays fast and intuitive, simply drag and drop taps into an orbital pattern."
          imageUrl="/projects/orbital_delay/orbital_delay_banner.png"
          imageAlt="Orbital Delay Project Banner"
          href="/projects/orbital-delay"
          comingSoon
        />
        <SeperatedCard
          title="Noteflow"
          description="Logic X MIDI arpeggiator effect clone built using JUCE (C++) as part of a Uni project."
          imageUrl="/projects/note_flow/note_flow_banner.png"
          imageAlt="Noteflow Banner"
          href="/projects/noteflow"
          comingSoon
        />
      </div>
    </div>
  );
};

export default Projects;
