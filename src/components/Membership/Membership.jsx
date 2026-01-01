import './Membership.css';

function Membership({ data }) {
  const featuredPlan = data.plans.find(plan => plan.featured) || data.plans[0];

  return (
    <section className="membership" id="membership">
      <div className="section-container">
        <div className="membership-content">
          <div className="membership-info">
            <h2 className="membership-title">{data.title.toUpperCase()}</h2>
            <p className="membership-description">{data.description}</p>
            <ul className="membership-perks">
              {data.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))}
            </ul>
            <a href="#join" className="btn btn-primary">Learn More</a>
          </div>

          <div className="membership-card">
            {featuredPlan.badge && (
              <span className="card-badge">{featuredPlan.badge.toUpperCase()}</span>
            )}
            <h3 className="card-title">{featuredPlan.name.toUpperCase()}</h3>
            <p className="card-price">
              ${featuredPlan.price} <span>/ {featuredPlan.period}</span>
            </p>
            <p className="card-description">{featuredPlan.description}</p>
            <button className="btn btn-ticket card-btn">Join Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Membership;
