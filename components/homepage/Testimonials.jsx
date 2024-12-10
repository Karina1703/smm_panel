"use client";

import { useTranslations } from "next-intl";
import { Container } from "./Container";
import Image from "next/image";

function QuoteIcon(props) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

const Testimonials = () => {
  const t = useTranslations("Testimonials");

  const testimonials = [
    [
      {
        content: t("Olivia Evans Review"),
        author: {
          name: "Olivia Evans",
          role: "CEO at Luxe Living LLC",
          image: "/assets/images/avatars/avatar-1.webp",
        },
      },
      {
        content: t("David Nguyen Review"),
        author: {
          name: "David Nguyen",
          role: "Director at Velocity Industries",
          image: "/assets/images/avatars/avatar-4.webp",
        },
      },
    ],
    [
      {
        content: t("Benjamin Kim Review"),
        author: {
          name: "Benjamin Kim",
          role: "Founder & CTO of Digital Dream",
          image: "/assets/images/avatars/avatar-5.webp",
        },
      },
      {
        content: t("Chloe Lee Review"),
        author: {
          name: "Chloe Lee",
          role: "CEO of Fit & Fresh Foods",
          image: "/assets/images/avatars/avatar-2.webp",
        },
      },
    ],
    [
      {
        content: t("Michael Patel Review"),
        author: {
          name: "Michael Patel",
          role: "Founder & CCO of Blissful Bouquets",
          image: "/assets/images/avatars/avatar-3.webp",
        },
      },
      {
        content: t("Victoria Lewis Review"),
        author: {
          name: "Victoria Lewis",
          role: "Project Manager at Skyline Design Co",
          image: "/assets/images/avatars/avatar-6.webp",
        },
      },
    ],
  ];

  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-white dark:bg-gray-900 pt-20 pb-20 sm:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("Loved by business & customers worldwide")}
          </h2>
          <p className="mt-5 max-w-prose mx-auto text-lg leading-8 text-gray-600 dark:text-gray-300">
            {t("Learn how you can benefit")}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute top-6 left-6 fill-slate-500/30" />
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-gray-900 dark:text-gray-100">{testimonial.content}</p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-600 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900 dark:text-slate-100">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">{testimonial.author.role}</div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-500">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Testimonials;
