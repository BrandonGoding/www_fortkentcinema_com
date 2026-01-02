import './GiftCardCTA.css';

function GiftCardCTA() {
  return (
    <section className="gift-card-cta">
      <div className="gift-card-cta__content">
        <h2 className="gift-card-cta__title">GIVE THE GIFT OF CINEMA</h2>
        <a
          href="https://app.squareup.com/gift/MLWDCWWHFATH1/order"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ticket"
        >
          Purchase An E-Gift Card
        </a>
      </div>
    </section>
  );
}

export default GiftCardCTA;
