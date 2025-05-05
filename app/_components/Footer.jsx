// import { useUser } from "@clerk/nextjs";
import Image from "next/image";
// import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useHide } from "./useHide";

const linkPage = [
  {title: 'services', links: ["1on1 Coaching", "Company Review", "Accounts Review", "HR Consulting", "SEO Optimisation"]},
  {title: 'Company', links: ["About", "Meet the Team", "Accounts Review"]},
  {title: 'Helpful Links', links: ["Contact", "FAQs", "Live Chat"]},
];
const securityLinks = ["Terms & Conditions", "Privacy Policy", "Cookies"];

const Footer = () => {
  const hide = useHide();
  const { t } = useTranslation();
  // const {user} = useUser();

  if(hide) return;
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b border-gray-100 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16 dark:border-gray-800">
            <div className="block text-teal-600 lg:hidden dark:text-teal-300">
              <Image loading="lazy"
                width={200}
                height={200}
                alt="logo"
                src={"/logoECommerce-modified-min.png.svg"}
              />
            </div>

            <div className="mt-8 space-y-4 lg:mt-0">
              <span className="hidden h-1 w-10 rounded bg-teal-500 lg:block"></span>

              <div>
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
                  FashionFusion
                </h2>

                <p className="mt-4 max-w-lg text-gray-500 dark:text-gray-400">
                  {t("The FashionFusion website is designed to showcase a wide rangeof commercial products. It offers a user-friendly interfacefor customers to browse and purchase items online. The websiteprovides detailed product descriptions, high-quality images,and secure payment options to ensure a seamless shoppingexperience. With its intuitive navigation and responsivedesign, customers can easily find and buy products of theirchoice. The website also offers customer support and ordertracking features to enhance customer satisfaction andloyalty.")}
                </p>
              </div>

              {/* {!user && <div className="mt-6 w-full">
                <Link href={'/sign-up'} className="mt-1 w-full rounded bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                  {t('Sign Up')}
                </Link>
              </div>} */}
            </div>
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            <div className="hidden text-teal-600 lg:block dark:text-teal-300">
              <Image loading="lazy"
                  width={200}
                  height={200}
                  alt="logo"
                  src={"/logoECommerce-modified-min.png.svg"}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {linkPage.map(item => (
              <div key={item.title}>
                <p className="font-medium text-gray-900 dark:text-white">{t(item.title)}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {item.links.map((link, index) => (
                    <li key={index}>
                      <span className="text-gray-700 transition hover:opacity-75 dark:text-gray-200 cursor-pointer">{t(link)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
              <ul className="flex flex-wrap gap-4 text-xs">
                {securityLinks.map(link => (
                  <li key={link}><span className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">{t(link)}</span></li>
                ))}
              </ul>

              <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
                &copy; {t("2024. FashionFusion. All rights reserved.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
