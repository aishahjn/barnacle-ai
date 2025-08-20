import React from 'react';
import { TEAM_MEMBERS } from '../../constants/aboutConstants';

const TeamMemberCard = ({ name, role, bio, image }) => {
  return (
    <div className="relative group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="h-64 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-cyan-600">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-teal-500 font-semibold mb-4">{role}</p>
        <p className="text-gray-700 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {bio}
        </p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="font-semibold text-teal-500 tracking-[0.2em] uppercase text-2xl md:text-3xl">
            OUR TEAM
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-8">
            Meet the Experts
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our diverse team combines decades of experience in technology, engineering, and sustainability to deliver innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;