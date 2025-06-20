import './rates.scss';
import SectionHeading from "../section_heading/section_heading";
import RedCard from "../red_card/red_card";


const RATE_LIST = [
  {
    title: "Ticket Rates",
    items: [
      {variation: "Adults", price: 10.00},
      {variation: "Children (12 & under)", price: 9.00},
      {variation: "Seniors (65+)", price: 9.00},
      {variation: "Military & First Responders", price: 8.00}
    ]
  },{
    title: "Popcorn Rates",
    items: [
        {variation: "Small", price: 4.00},
        {variation: "Medium", price: 5.50},
        {variation: "Large", price: 6.75},
        {variation: "Jumbo", price: 8.00},
        {variation: "Big Ol Bag", price: 10.00}
    ]
  }
]


const Rates = () => {

  const rates = (rate) => {
    return (
        <>
          <h3>{rate.title}</h3>
              <ul>
              {rate.items.map((item, index) => (
                  <li key={index} className="rateItem"><span>{item.variation}:&nbsp;&nbsp;</span><span>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></li>
              ))}
              </ul>
        </>
    )
  }

  return(
  <section className="rates">
    <SectionHeading heading_text="Rates" />
    <div className="rates-list">
        {RATE_LIST.map((rate, index) => (
            <RedCard block_content={rates(rate)} key={index} />
        ))}
    </div>
  </section>
)};

export default Rates;