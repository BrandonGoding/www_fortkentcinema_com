import './Membership.css';

function Membership({ data }) {
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
              {plan.emoji && (
                <span className="card-emoji">{plan.emoji}</span>
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
              {plan.valueCallout && (
                <p className="card-value-callout">{plan.valueCallout}</p>
              )}
              <a href={plan.link} target="_blank" className="btn btn-ticket card-btn">Join Now</a>
            </div>
          ))}
        </div>

        {data.footer && (
          <p className="membership-footer">{data.footer}</p>
        )}
      </div>
    </section>
  );
}

export default Membership;
