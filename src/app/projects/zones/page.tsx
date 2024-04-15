import Image from "next/image";

const Zones = () => {
  return (
    <div className="flex container justify-center my-24">
      <div className="max-w-2xl space-y-5 md:space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold md:text-3xl">
            Zones Convolution - Spaces On Demand
          </h2>

          <p className="text-lg">
            Zones convolution allows users to find and share impulse responses
            captured in great sounding and unique spaces. Inspired by the{" "}
            <a
              href="https://www.openair.hosted.york.ac.uk"
              className="text-blue-600 decoration-2 hover:underline font-medium"
            >
              Open Air library
            </a>{" "}
            and the popular{" "}
            <a
              className="text-blue-600 decoration-2 hover:underline font-medium"
              href="https://www.audioease.com/altiverb/"
            >
              Altiverb{" "}
            </a>
            plugin, Zones extends their capabilities by providing; a simple,
            intuitive interface to tag, categorise and upload IRs, and a VST/AU
            plugin to search and convolve these IRs directly in the box!
            {/*The online interface and plugin will both become available*/}
            {/*for free upon release.*/}
          </p>
        </div>

        <p className="text-lg">
          {
            "This article aims to showcase some of the features, design and implementation detail of the platform in it's current state."
          }
        </p>

        <figure>
          <Image
            src="/projects/zones/zones_home.gif"
            alt="Zones homepage demo."
            width="1920"
            height="1080"
            className="w-full object-cover rounded-xl"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <figcaption className="mt-3 text-sm text-center text-muted-foreground">
            Zones Convolution
          </figcaption>
        </figure>

        <p className="text-lg text-gray-800 dark:text-gray-200">
          {
            "As we've grown, we've seen how Preline has helped companies such as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their designers closer together to create amazing things. We've also learned that when the culture of sharing is brought in earlier, the better teams adapt and communicate with one another."
          }
        </p>

        <p className="text-lg text-gray-800 dark:text-gray-200">
          {"That's why we are excited to share that we now have a "}
          <a
            className="text-blue-600 decoration-2 hover:underline font-medium"
            href="#"
          >
            free version of Preline
          </a>
          , which will allow individual designers, startups and other small
          teams a chance to create a culture of openness early on.
        </p>

        <blockquote className="text-center p-4 sm:px-7">
          <p className="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal dark:text-gray-200">
            To say that switching to Preline has been life-changing is an
            understatement. My business has tripled and I got my life back.
          </p>
          <p className="mt-5 text-gray-800 dark:text-gray-200">
            Nicole Grazioso
          </p>
        </blockquote>

        <div className="grid grid-cols-2 gap-4 place-content-center">
          <figure>
            <Image
              src="/projects/zones/zones_upload.gif"
              alt="Uploading images to Zones."
              width="1920"
              height="1080"
              className="w-full object-cover rounded-xl"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <figcaption className="mt-3 text-sm text-center text-muted-foreground">
              Uploading images to Zones.
            </figcaption>
          </figure>

          <figure>
            <Image
              src="/projects/zones/zones_delete.gif"
              alt="In browser player."
              width="1920"
              height="1080"
              className="w-full object-cover rounded-xl"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <figcaption className="mt-3 text-sm text-center text-muted-foreground">
              Removing Images from Zones.
            </figcaption>
          </figure>

          <figure>
            <Image
              src="/projects/zones/zones_play.gif"
              alt="In browser player."
              width="1920"
              height="1080"
              className="w-full object-cover rounded-xl"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <figcaption className="mt-3 text-sm text-center text-muted-foreground">
              Listen and convolve Zones in the browser.
            </figcaption>
          </figure>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold dark:text-white">
            Bringing the culture of sharing to everyone
          </h3>

          <p className="text-lg text-gray-800 dark:text-gray-200">
            We know the power of sharing is real, and we want to create an
            opportunity for everyone to try Preline and explore how
            transformative open communication can be. Now you can have a team of
            one or two designers and unlimited spectators (think PMs,
            management, marketing, etc.) share work and explore the design
            process earlier.
          </p>
        </div>

        <ul className="list-disc list-outside space-y-5 pl-5 text-lg text-gray-800 dark:text-gray-200">
          <li className="pl-2">
            Preline allows us to collaborate in real time and is a really great
            way for leadership on the team to stay up-to-date with what
            everybody is working on{" "}
            <a
              className="text-blue-600 decoration-2 hover:underline font-medium"
              href="#"
            >
              said
            </a>{" "}
            Stewart Scott-Curran, Intercoms Director of Brand Design.
          </li>
          <li className="pl-2">
            Preline opened a new way of sharing. Its a persistent way for
            everyone to see and absorb each others work, said David Scott,
            Creative Director at{" "}
            <a
              className="text-blue-600 decoration-2 hover:underline font-medium"
              href="#"
            >
              Eventbrite
            </a>
            .
          </li>
        </ul>

        <p className="text-lg text-gray-800 dark:text-gray-200">
          Small teams and individual designers need a space where they can watch
          the design process unfold, both for themselves and for the people they
          work with – no matter if its a fellow designer, product manager,
          developer or client. Preline allows you to invite more people into the
          process, creating a central place for conversation around design. As
          those teams grow, transparency and collaboration becomes integrated in
          how they communicate and work together.
        </p>
      </div>
    </div>
  );
};

export default Zones;
