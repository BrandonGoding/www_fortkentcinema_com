import { Link } from 'react-router-dom';
import './PrivateRentalsPage.css';

function PrivateRentalsPage() {
  return (
    <div className="rentals-page">
      <div className="rentals-container">
        <div className="rentals-header">
          <Link to="/" className="rentals-back">&larr; Back to Home</Link>
          <h1 className="rentals-title">HOST YOUR EVENT AT FORT KENT CINEMA</h1>
          <p className="rentals-subtitle">Private screenings, birthday parties, gaming events, and more</p>
        </div>

        {/* Birthday Parties */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">BIRTHDAY PARTIES</h2>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">BASIC PACKAGE</h3>
              <div className="rental-card-price">$150</div>
              <p className="rental-card-description">A great way to celebrate with a movie and friends.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Movie of your choice (DVD or Blu-Ray)</li>
                <li>Popcorn for up to 15 guests</li>
              </ul>
            </div>
            <div className="rental-card rental-card--featured">
              <h3 className="rental-card-title">DELUXE PACKAGE</h3>
              <div className="rental-card-price">$250</div>
              <p className="rental-card-description">The ultimate cinema birthday experience.</p>
              <ul className="rental-card-features">
                <li>3-hour private theater rental</li>
                <li>Movie of your choice (DVD or Blu-Ray)</li>
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
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">WEEKDAY SCREENING</h3>
              <div className="rental-card-price">$200</div>
              <p className="rental-card-description">Monday through Thursday availability.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Movie of your choice (DVD or Blu-Ray)</li>
                <li>Up to 50 guests</li>
                <li>Standard concession stand access</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">WEEKEND SCREENING</h3>
              <div className="rental-card-price">$300</div>
              <p className="rental-card-description">Friday through Sunday, subject to availability.</p>
              <ul className="rental-card-features">
                <li>2-hour private theater rental</li>
                <li>Movie of your choice (DVD or Blu-Ray)</li>
                <li>Up to 50 guests</li>
                <li>Standard concession stand access</li>
                <li>Lobby space for pre/post event gathering</li>
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
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">SCHOOL GROUPS</h3>
              <div className="rental-card-price">$6 <span>/ student</span></div>
              <p className="rental-card-description">Educational and fun field trip option.</p>
              <ul className="rental-card-features">
                <li>Age-appropriate movie selection</li>
                <li>Small popcorn for each student</li>
                <li>Minimum 20 students</li>
                <li>Chaperones admitted free</li>
                <li>Flexible scheduling during school hours</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">CLUBS &amp; CORPORATE</h3>
              <div className="rental-card-price">$8 <span>/ person</span></div>
              <p className="rental-card-description">Team building and group entertainment.</p>
              <ul className="rental-card-features">
                <li>Movie of your choice (DVD or Blu-Ray)</li>
                <li>Popcorn included</li>
                <li>Minimum 15 people</li>
                <li>Lobby space for networking before/after</li>
                <li>Custom welcome message on screen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fundraiser Partnerships */}
        <section className="rentals-section">
          <h2 className="rentals-section-title">FUNDRAISER PARTNERSHIPS</h2>
          <div className="rentals-grid">
            <div className="rental-card">
              <h3 className="rental-card-title">OPTION A: TICKET SHARE</h3>
              <div className="rental-card-price">20% <span>back</span></div>
              <p className="rental-card-description">We donate 20% of ticket sales from your event night.</p>
              <ul className="rental-card-features">
                <li>Designated fundraiser screening night</li>
                <li>Your organization promoted on our social media</li>
                <li>Custom lobby signage for your cause</li>
                <li>No upfront cost to your organization</li>
              </ul>
            </div>
            <div className="rental-card">
              <h3 className="rental-card-title">OPTION B: FULL RENTAL</h3>
              <div className="rental-card-price">$175</div>
              <p className="rental-card-description">Rent the theater and sell your own tickets.</p>
              <ul className="rental-card-features">
                <li>Full private theater for your event</li>
                <li>You set your own ticket price and keep profits</li>
                <li>Promotion on our social media channels</li>
                <li>Up to 50 guests</li>
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
              <li>Movie selections are subject to licensing availability. We will work with you to find the best option.</li>
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
