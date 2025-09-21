import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
const AboutContent = () => {
  // Dummy data
  const aboutText =
    'Licensed electrician with 8+ years of experience. Specializing in residential and commercial electrical work. I take pride in delivering quality work on time and within budget.';
  const experience = '8 years';
  const certifications = [
    'Licensed Electrician',
    'OSHA 30 Certified',
    'Master Electrician',
  ];

  return (
    <div className="bg-white p-2 ">
      <h2 className="text-2xl font-semibold mb-2">About</h2>
      <p className="text-gray-700 mb-6">{aboutText}</p>

      {/* Experience & Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg mb-1">Experience</h4>
          <p className="text-gray-600">{experience}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-1">Certifications</h4>
          <ul className="list-none pl-0">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Background Check & Insurance */}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2 text-green-600">
          <ShieldCheck size={16} />
          <span>Background Checked</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          {/* < size={16} /> */}
          <span>Insured</span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
