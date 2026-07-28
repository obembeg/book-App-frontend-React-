import React from "react";
import {
  IoLibraryOutline,
  IoShieldCheckmarkOutline,
  IoGridOutline,
  IoNotificationsOutline,
  IoBarChartOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Features() {
  const features = [
    {
      id: 1,
      icon: IoLibraryOutline,
      title: "Book Management",
      description: "Create, edit, and organize your book collection with ease.",
    },
    {
      id: 2,
      icon: IoShieldCheckmarkOutline,
      title: "Access Control",
      description: "Admin controls to manage user permissions and roles.",
    },
    {
      id: 3,
      icon: IoGridOutline,
      title: "Smart Categories",
      description:
        "Organize books into custom categories for better navigation.",
    },
    {
      id: 4,
      icon: IoNotificationsOutline,
      title: "Real-time Updates",
      description:
        "Get instant notifications on platform changes and newly added books.",
    },
    {
      id: 5,
      icon: IoBarChartOutline,
      title: "Analytics",
      description:
        "Monitor platform activity with insightful statistics and reports.",
    },
    {
      id: 6,
      icon: IoPeopleOutline,
      title: "User Management",
      description:
        "Manage users, assign admin roles, and control platform access.",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 py-20 text-slate-100 animate-fade-in-down">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h1 className="mb-4 bg-linear-to-r from-indigo-300 to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Powerful Features
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
            Everything you need to manage, discover, and enjoy books on one
            premium platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group cursor-pointer rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/20"
              >
                {/* Icon */}
                <div className="mb-6 w-fit rounded-2xl bg-indigo-500/10 p-4 transition-all duration-300 group-hover:bg-indigo-500/20">
                  <Icon className="h-8 w-8 text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <NavLink
            to="/dashboard"
            className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Explore the Library
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Features;
