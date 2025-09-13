import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HiStar, HiArrowLeft } from 'react-icons/hi';

// --- MOCK DATA for all offers from all users ---
const allOffers = [
  { _id: 'o1', skillName: 'React Development', offeredBy: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane', rating: 4.8, wants: 'SEO Optimization' },
  { _id: 'o2', skillName: 'React Development', offeredBy: 'Alex Ray', avatarUrl: 'https://i.pravatar.cc/150?u=alexray', rating: 4.5, wants: 'Copywriting' },
  { _id: 'o3', skillName: 'Guitar Lessons', offeredBy: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=maria', rating: 5.0, wants: 'Content Writing' },
  { _id: 'o4', skillName: 'Guitar Lessons', offeredBy: 'Tom Chen', avatarUrl: 'https://i.pravatar.cc/150?u=tom', rating: 4.2, wants: 'Video Editing' },
  { _id: 'o5', skillName: 'Public Speaking', offeredBy: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john', rating: 4.9, wants: 'Graphic Design' },
];
// --- END MOCK DATA ---

// A simple star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <HiStar
            key={index}
            className={`h-5 w-5 ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        );
      })}
      <span className="text-gray-600 text-sm ml-2">{rating.toFixed(1)}</span>
    </div>
  );
};

const OfferPage = () => {
  const { skillName } = useParams(); // Get the skill name from the URL
  const [offers, setOffers] = useState([]);
  
  // Replace hyphens with spaces for matching with mock data
  const formattedSkillName = skillName.replace(/-/g, ' ');

  useEffect(() => {
    // Filter the mock data to find offers for the specific skill
    const relevantOffers = allOffers.filter(
      offer => offer.skillName.toLowerCase() === formattedSkillName.toLowerCase()
    );
    setOffers(relevantOffers);
  }, [formattedSkillName]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white to-emerald-100">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/skills" className="inline-flex items-center gap-x-2 text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
              <HiArrowLeft />
              Back to All Skills
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900">Offers for "{formattedSkillName}"</h1>
          <p className="mt-2 text-lg text-gray-600">Choose a tutor that fits your needs.</p>
          
          <div className="mt-10 space-y-8">
            {offers.length > 0 ? (
              offers.map(offer => (
                <div key={offer._id} className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                  <img src={offer.avatarUrl} alt={offer.offeredBy} className="w-24 h-24 rounded-full flex-shrink-0" />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900">{offer.offeredBy}</h3>
                    <div className="mt-1"><StarRating rating={offer.rating} /></div>
                    <p className="mt-2 text-sm text-gray-600">Wants in Exchange: <span className="font-semibold text-gray-800">{offer.wants}</span></p>
                  </div>
                  <button className="w-full sm:w-auto flex-shrink-0 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700">
                    Send Request
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-2xl font-semibold">No offers found for this skill yet.</h3>
                <p className="mt-2">Check back later or explore other skills!</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OfferPage;