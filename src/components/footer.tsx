import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  return (
    <footer>
      <div className="w-full py-10 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center md:text-start max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
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
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['|'] before:text-gray-300 dark:before:text-gray-600">
              <a
                className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['|'] before:text-gray-300 dark:before:text-gray-600">
              <a
                className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200"
                href="#"
              >
                Projects
              </a>
            </li>
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['|'] before:text-gray-300 dark:before:text-gray-600">
              <a
                className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200"
                href="#"
              >
                Blog
              </a>
            </li>
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
      </div>
    </footer>
  );
};

export default Footer;
