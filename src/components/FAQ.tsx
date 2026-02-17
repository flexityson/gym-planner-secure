import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'How do I generate a workout plan?',
    a: 'Go to Planner, choose your target muscle groups, duration, and intensity, then click Generate Workout Plan. Your plan and nutrition targets will appear in the results.',
  },
  {
    q: 'What are the activity levels?',
    a: 'Sedentary = little or no exercise. Light = 1–3 days/week. Moderate = 3–5 days/week. Active = 6–7 days/week. Very Active = very hard exercise or physical job.',
  },
  {
    q: 'Is this app medical advice?',
    a: 'No. GYM PLANNER CAMTECH is for informational purposes only. Always consult a healthcare or fitness professional before starting a new program.',
  },
  {
    q: 'How is my data used?',
    a: 'Your profile and preferences are used only to personalize your workout and nutrition suggestions. We do not sell your data.',
  },
  {
    q: 'Where do the exercise links come from?',
    a: 'We may include links to form guides (e.g. TikTok) for exercises. These are for reference only; we are not responsible for external content.',
  },
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <div className="page-card faq-page">
      <div className="section-header">
        <i className="fas fa-question-circle"></i>
        <h2>FAQ</h2>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openId === index ? 'open' : ''}`}
          >
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenId(openId === index ? null : index)}
            >
              <span>{item.q}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            {openId === index && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
