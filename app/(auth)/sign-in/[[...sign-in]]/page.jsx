"use client";
import changeClerk from "../../../_components/changeClerk";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  changeClerk(".cl-internal-16vtwdp");
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="login-section">
          <img
            alt="sing-in logo"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl ">
              {t("Sign In to FashionFusion")} 🦑
            </h2>

            <Link
              className="inline-block rounded border border-indigo-600 px-12 py-3 mt-4 text-sm font-medium text-indigo-600 transition duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              href="/"
            >
              {t("Home")}
            </Link>

            <p className="mt-4 leading-relaxed text-white/90">
              {t("The FashionFusion website is designed to showcase a wide range of commercial products. It offers a user-friendly interface for customers to browse and purchase items online.")}
            </p>
          </div>
        </section>

        <main className="login-main">
          <div className="max-w-xl lg:max-w-3xl text-center flex flex-col items-center ">
            <div className="relative -mt-16 block lg:hidden mb-4">
              <div className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900">
                <span className="sr-only">{t("Home")}</span>
                <Image width={80} height={80} alt="logo" src={'/logoECommerce-modified-min.png.svg'} loading="lazy" />
                {/* <img src="/logo.svg" alt="" className="text-white" /> */}
              </div>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl  dark:text-white">
                {t("Sign In to FashionFusion")} 🦑
              </h1>
              <Link
                className="inline-block rounded border border-indigo-600 px-12 py-3 mt-2 text-sm font-medium text-indigo-600 transition duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="/"
              >
                {t("Home")}
              </Link>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              {t("The FashionFusion website is designed to showcase a wide range of commercial products. It offers a user-friendly interface for customers to browse and purchase items online.")}
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
