import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './PrivateRentalsPage.css';

function PrivateRentalsPage() {
  return (
    <div className="rentals-page">
      <Helmet>
        <title>Private Rentals | Fort Kent Cinema</title>
        <meta name="description" content="Host your event at Fort Kent Cinema. Private screenings, birthday parties, gaming events, group bookings, and fundraiser partnerships available." />
        <meta property="og:title" content="Private Rentals | Fort Kent Cinema" />
        <meta property="og:description" content="Host your event at Fort Kent Cinema. Private screenings, birthday parties, gaming events, and more." />
        <meta property="og:url" content="https://www.fortkentcinema.com/rentals" />
        <link rel="canonical" href="https://www.fortkentcinema.com/rentals" />
      </Helmet>
      <div className="rentals-container">
        <div className="rentals-header">
          <Link to="/" className="rentals-back">&larr; Back to Home</Link>
          <h1 className="rentals-title">HOST YOUR EVENT AT FORT KENT CINEMA</h1>
          <p className="rentals-subtitle">Private screenings, birthday parties, gaming events, and more</p>
        </div>

        {/* Birthday Parties */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">BIRTHDAY PARTIES</h2>
          <p className="rentals-section-note">For private celebrations with invited family and friends. You may bring your own DVD or Blu-ray for private viewing.</p>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">BASIC PACKAGE</h3>
              <div className="rental-card-price">$150</div>
              <p className="rental-card-description">A great way to celebrate with a movie and friends.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Bring your own DVD or Blu-ray</li>
                <li>Popcorn for up to 15 guests</li>
              </ul>
            </div>
            <div className="rental-card rental-card--featured">
              <h3 className="rental-card-title">DELUXE PACKAGE</h3>
              <div className="rental-card-price">$250</div>
              <p className="rental-card-description">The ultimate cinema birthday experience.</p>
              <ul className="rental-card-features">
                <li>3-hour private theater rental</li>
                <li>Bring your own DVD or Blu-ray</li>
                <li>Popcorn for up to 25 guests</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">ADD-ONS</h3>
              <div className="rental-card-price">$5+</div>
              <p className="rental-card-description">Customize your party with extras.</p>
              <ul className="rental-card-features">
                <li>Extra guests: $5 per person</li>
                <li>Pizza: cost + 20% handling</li>
                <li>Ice cream sundae bar: $10/person</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Private Screenings */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">PRIVATE SCREENINGS</h2>
          <p className="rentals-section-note">For larger private events. We'll help arrange film licensing and provide a quote.</p>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">WEEKDAY SCREENING</h3>
              <div className="rental-card-price"><span>Starting at </span>$200</div>
              <p className="rental-card-description">Monday through Thursday availability.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Licensed film of your choice</li>
                <li>Up to 50 guests</li>
                <li>Standard concession stand access</li>
                <li>Film licensing quoted separately</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">WEEKEND SCREENING</h3>
              <div className="rental-card-price"><span>Starting at </span>$300</div>
              <p className="rental-card-description">Friday through Sunday, subject to availability.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Licensed film of your choice</li>
                <li>Up to 50 guests</li>
                <li>Standard concession stand access</li>
                <li>Lobby space for pre/post event gathering</li>
                <li>Film licensing quoted separately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Gaming Parties */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">GAMING PARTIES</h2>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">BASIC GAMING</h3>
              <div className="rental-card-price">$175</div>
              <p className="rental-card-description">Game on the big screen with friends.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Bring your own console — we put it on the big screen</li>
                <li>Up to 20 guests</li>
                <li>Bring your own games</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">GAMING + SNACKS</h3>
              <div className="rental-card-price">$225</div>
              <p className="rental-card-description">The full gaming party experience.</p>
              <ul className="rental-card-features">
                <li>3-hour private theater rental</li>
                <li>Bring your own console — we put it on the big screen</li>
                <li>Up to 20 guests</li>
                <li>Popcorn included</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Group Bookings */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">GROUP BOOKINGS</h2>
          <p className="rentals-section-note">Public and institutional events require licensed films. We'll help arrange licensing and provide a quote.</p>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">SCHOOL GROUPS</h3>
              <div className="rental-card-price"><span>Starting at </span>$6 <span>/ student</span></div>
              <p className="rental-card-description">Educational and fun field trip option.</p>
              <ul className="rental-card-features">
                <li>Age-appropriate licensed film</li>
                <li>Small popcorn for each student</li>
                <li>Minimum 20 students</li>
                <li>Chaperones admitted free</li>
                <li>Flexible scheduling during school hours</li>
                <li>Film licensing quoted separately</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">CLUBS &amp; CORPORATE</h3>
              <div className="rental-card-price"><span>Starting at </span>$8 <span>/ person</span></div>
              <p className="rental-card-description">Team building and group entertainment.</p>
              <ul className="rental-card-features">
                <li>Licensed film of your choice</li>
                <li>Popcorn included</li>
                <li>Minimum 25 people</li>
                <li>Lobby space for networking before/after</li>
                <li>Film licensing quoted separately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fundraiser Partnerships */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">FUNDRAISER PARTNERSHIPS</h2>
          <p className="rentals-section-note">Public fundraiser events require licensed films. We'll help arrange licensing and provide a quote.</p>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">OPTION A: TICKET SHARE</h3>
              <div className="rental-card-price">20% <span>back</span></div>
              <p className="rental-card-description">We donate 20% of ticket sales from your event night.</p>
              <ul className="rental-card-features">
                <li>Designated fundraiser screening night</li>
                <li>Film from our current showings</li>
                <li>Your organization promoted on our social media</li>
                <li>Custom lobby signage for your cause</li>
                <li>No upfront cost to your organization</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">OPTION B: FULL RENTAL</h3>
              <div className="rental-card-price"><span>Starting at </span>$175</div>
              <p className="rental-card-description">Rent the theater and sell your own tickets.</p>
              <ul className="rental-card-features">
                <li>Full private theater for your event</li>
                <li>You set your own ticket price and keep profits</li>
                <li>Promotion on our social media channels</li>
                <li>Up to 50 guests</li>
                <li>Film licensing quoted separately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Policies */}
        <details className="rentals-policies">
          <summary>POLICIES &amp; INFORMATION</summary>
          <div className="rentals-policies-content">
            <ul>
              <li>A 50% deposit is required to reserve your date. The remaining balance is due on the day of the event.</li>
              <li>Cancellations made 7+ days in advance receive a full refund. Cancellations within 7 days forfeit the deposit.</li>
              <li>Outside food and drink are not permitted. All food and beverage must be purchased through or arranged with Fort Kent Cinema.</li>
              <li>The renting party is responsible for any damages to the theater or equipment during the event.</li>
              <li>All events must end by 11:00 PM.</li>
              <li>A signed rental agreement is required before confirmation of your booking.</li>
              <li><strong>Birthday parties &amp; gaming</strong>: For invited family and friends only. You may bring your own DVD or Blu-ray. No ticket sales or public advertising permitted.</li>
              <li><strong>Private screenings, group bookings &amp; fundraisers</strong>: Require properly licensed films. We can arrange licensing through our partners - fees vary by film and will be quoted.</li>
              <li>Decorations are allowed but must be approved in advance. No confetti, glitter, or anything that may damage the seats or screen.</li>
            </ul>
          </div>
        </details>

        {/* CTA */}
        <div className="rentals-cta">
          <h2 className="rentals-cta-title">READY TO BOOK?</h2>
          <p className="rentals-cta-text">Contact us to check availability and reserve your event date.</p>
          <div className="rentals-cta-contact">
            <a href="tel:+12072315287">(207) 231-5287</a>
            <a href="mailto:brandon.h.goding@gmail.com">brandon.h.goding@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateRentalsPage;
