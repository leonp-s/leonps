import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import { FC } from "react";

const FooterLink: FC<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['|'] before:text-gray-300 dark:before:text-gray-600">
      <a
        className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200"
        href={url}
      >
        {title}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-muted">
      <div className="container grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center md:text-start">
        <div>
          <a
            className="flex-none text-xl font-semibold text-black dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Leon Paterson-Stephens
          </a>
        </div>

        <ul className="text-center">
          <FooterLink title="Home" url="#" />
          <FooterLink title="Projects" url="#" />
          <FooterLink title="Blog" url="#" />
        </ul>

        <div className="md:text-right space-x-2">
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-slate-900"
            href="#"
          >
            <BiLogoGithub />
          </a>
          <a
            className="inline-flex justify-center items-center w-8 h-8 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-slate-900"
            href="#"
          >
            <BiLogoLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
