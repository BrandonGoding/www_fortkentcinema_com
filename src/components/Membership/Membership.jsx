import { useState } from 'react';
import MembershipCalculator from '../MembershipCalculator';
import './Membership.css';

function Membership({ data }) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="membership" id="membership">
      <div className="section-container">
        <div className="membership-header">
          <h2 className="membership-title">{data.title.toUpperCase()}</h2>
          <p className="membership-description">{data.description}</p>
        </div>

        <div className="membership-plans">
          {data.plans.map((plan) => (
            <div
              key={plan.id}
              className={`membership-card ${plan.featured ? 'membership-card--featured' : ''}`}
            >
              {plan.badge && (
                <span className="card-badge">{plan.badge.toUpperCase()}</span>
              )}
              <h3 className="card-title">{plan.name.toUpperCase()}</h3>
              <p className="card-price">
                ${plan.price} <span>/ {plan.period}</span>
              </p>
              <p className="card-description">{plan.description}</p>
              <ul className="card-perks">
                {plan.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
              <a href={plan.link} target="_blank" className="btn btn-ticket card-btn">Join Now</a>
            </div>
          ))}
        </div>

        <div className="membership-calculator-link">
          <button
            className="calculator-trigger"
            onClick={() => setIsCalculatorOpen(true)}
          >
            Use our membership calculator to see if a membership is right for you
          </button>
        </div>
      </div>

      <MembershipCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}

export default Membership;
