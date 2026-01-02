import { useState, useEffect } from 'react';
import './MembershipCalculator.css';

const MEMBERSHIP_TYPES = [
  { id: 'individual', name: 'Individual', price: 60, freeTickets: 0, isFamily: false },
  { id: 'cinema-supporter', name: 'Cinema Supporter', price: 120, freeTickets: 1, isFamily: false },
  { id: 'family', name: 'Family', price: 150, freeTickets: 0, isFamily: true },
  { id: 'family-plus', name: 'Family Plus', price: 250, freeTickets: 4, isFamily: true },
];

const PRICING = {
  tickets: {
    regular: { matinee: 8, evening: 12 },
    member: { matinee: 6, evening: 8 },
  },
  popcorn: {
    small: { regular: 4.25, member: 3.25 },
    medium: { regular: 5.50, member: 3.50 },
    large: { regular: 6.75, member: 4.75 },
    jumbo: { regular: 8.50, member: 6.50 },
  },
};

function MembershipCalculator({ isOpen, onClose }) {
  const [membershipType, setMembershipType] = useState('individual');
  const [familyMembers, setFamilyMembers] = useState(2);
  const [moviesPerMonth, setMoviesPerMonth] = useState(2);
  const [ticketType, setTicketType] = useState('evening');
  const [popcornSize, setPopcornSize] = useState('medium');
  const [buyPopcorn, setBuyPopcorn] = useState(true);
  const [popcornsPerVisit, setPopcornsPerVisit] = useState(2);

  const selectedMembership = MEMBERSHIP_TYPES.find((m) => m.id === membershipType);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const calculateSavings = () => {
    const membership = selectedMembership;
    const people = membership.isFamily ? familyMembers : 1;
    const popcornCount = membership.isFamily ? popcornsPerVisit : (buyPopcorn ? 1 : 0);
    const monthlyMovies = moviesPerMonth;
    const yearlyMovies = monthlyMovies * 12;

    // Ticket prices
    const regularTicketPrice = PRICING.tickets.regular[ticketType];
    const memberTicketPrice = PRICING.tickets.member[ticketType];

    // Popcorn prices
    const regularPopcornPrice = buyPopcorn ? PRICING.popcorn[popcornSize].regular : 0;
    const memberPopcornPrice = buyPopcorn ? PRICING.popcorn[popcornSize].member : 0;

    // Calculate yearly costs without membership
    const yearlyTicketCostRegular = yearlyMovies * people * regularTicketPrice;
    const yearlyPopcornCostRegular = yearlyMovies * popcornCount * regularPopcornPrice;
    const totalRegularCost = yearlyTicketCostRegular + yearlyPopcornCostRegular;

    // Calculate yearly costs with membership
    const freeTicketsPerYear = membership.freeTickets * 12;
    const paidTickets = Math.max(0, (yearlyMovies * people) - freeTicketsPerYear);
    const yearlyTicketCostMember = paidTickets * memberTicketPrice;
    const yearlyPopcornCostMember = yearlyMovies * popcornCount * memberPopcornPrice;
    const totalMemberCost = yearlyTicketCostMember + yearlyPopcornCostMember + membership.price;

    const savings = totalRegularCost - totalMemberCost;
    const freeTicketValue = freeTicketsPerYear * regularTicketPrice;

    return {
      regularCost: totalRegularCost,
      memberCost: totalMemberCost,
      savings,
      freeTicketsPerYear,
      freeTicketValue,
      membershipPrice: membership.price,
    };
  };

  const results = calculateSavings();

  return (
    <div className="calculator-overlay" onClick={onClose}>
      <div className="calculator-modal" onClick={(e) => e.stopPropagation()}>
        <button className="calculator-close" onClick={onClose} aria-label="Close calculator">
          &times;
        </button>

        <h2 className="calculator-title">MEMBERSHIP CALCULATOR</h2>
        <p className="calculator-subtitle">See how much you could save with a Fort Kent Cinema membership</p>

        <div className="calculator-form">
          <div className="calculator-field">
            <label htmlFor="membership-type">Membership Type</label>
            <select
              id="membership-type"
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
            >
              {MEMBERSHIP_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (${type.price}/year)
                </option>
              ))}
            </select>
          </div>

          {selectedMembership.isFamily && (
            <div className="calculator-field">
              <label htmlFor="family-members">Number of Family Members</label>
              <input
                type="number"
                id="family-members"
                min="2"
                max="10"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Math.max(2, parseInt(e.target.value) || 2))}
              />
            </div>
          )}

          <div className="calculator-field">
            <label htmlFor="movies-per-month">Average Movies Per Month</label>
            <input
              type="number"
              id="movies-per-month"
              min="1"
              max="30"
              value={moviesPerMonth}
              onChange={(e) => setMoviesPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="calculator-field">
            <label htmlFor="ticket-type">Typical Showtime</label>
            <select
              id="ticket-type"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="matinee">Matinee ($8 regular / $6 member)</option>
              <option value="evening">Evening ($12 regular / $8 member)</option>
            </select>
          </div>

          <div className="calculator-field">
            <label htmlFor="popcorn-size">Popcorn Size</label>
            <select
              id="popcorn-size"
              value={buyPopcorn ? popcornSize : 'none'}
              onChange={(e) => {
                if (e.target.value === 'none') {
                  setBuyPopcorn(false);
                } else {
                  setBuyPopcorn(true);
                  setPopcornSize(e.target.value);
                }
              }}
            >
              <option value="none">No popcorn</option>
              <option value="small">Small ($4.25 / $3.25 member)</option>
              <option value="medium">Medium ($5.50 / $3.50 member)</option>
              <option value="large">Large ($6.75 / $4.75 member)</option>
              <option value="jumbo">Jumbo ($8.50 / $6.50 member)</option>
            </select>
          </div>

          {selectedMembership.isFamily && buyPopcorn && (
            <div className="calculator-field">
              <label htmlFor="popcorns-per-visit">Popcorns Purchased Per Visit</label>
              <input
                type="number"
                id="popcorns-per-visit"
                min="0"
                max={familyMembers}
                value={popcornsPerVisit}
                onChange={(e) => setPopcornsPerVisit(Math.max(0, Math.min(familyMembers, parseInt(e.target.value) || 0)))}
              />
              <span className="field-hint">How many popcorns does your family typically share?</span>
            </div>
          )}
        </div>

        <div className="calculator-results">
          <h3 className="results-title">YOUR YEARLY BREAKDOWN</h3>

          <div className="results-comparison">
            <div className="results-column">
              <h4>Without Membership</h4>
              <p className="results-amount">${results.regularCost.toFixed(2)}</p>
            </div>
            <div className="results-column">
              <h4>With {selectedMembership.name}</h4>
              <p className="results-amount">${results.memberCost.toFixed(2)}</p>
              <p className="results-detail">(includes ${results.membershipPrice} membership)</p>
            </div>
          </div>

          <div className={`results-savings ${results.savings > 0 ? 'positive' : 'negative'}`}>
            {results.savings > 0 ? (
              <>
                <span className="savings-label">You Save</span>
                <span className="savings-amount">${results.savings.toFixed(2)}/year</span>
              </>
            ) : (
              <>
                <span className="savings-label">Additional Cost</span>
                <span className="savings-amount">${Math.abs(results.savings).toFixed(2)}/year</span>
                <p className="savings-note">Consider attending more movies to maximize your membership value!</p>
              </>
            )}
          </div>

          {results.freeTicketsPerYear > 0 && (
            <p className="results-bonus">
              Plus {results.freeTicketsPerYear} free tickets/year (${results.freeTicketValue.toFixed(2)} value)
            </p>
          )}
        </div>

        <div className="calculator-fine-print">
          <p>
            <strong>Disclaimer:</strong> This calculator provides a rough estimate for comparison purposes only
            and does not constitute a quote or guarantee of savings. Actual savings will vary based on your
            individual movie-going habits, concession purchases, and any changes to pricing. Popcorn savings
            are calculated based on the selected size; if family members share popcorn or purchase different
            sizes, your actual costs may differ. Membership benefits and pricing are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MembershipCalculator;
