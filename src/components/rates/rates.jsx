import SectionHeading from "../section_heading/section_heading";

  const RATE_LIST = [
    {
      title: "Ticket Rates",
      items: [
        { variation: "Adults", price: 10.0 },
        { variation: "Children (12 & under)", price: 9.0 },
        { variation: "Seniors (65+)", price: 9.0 },
        { variation: "Matinee/Discount Night", price: 6.0 },
      ],
    },
    {
      title: "Popcorn Rates",
      items: [
        { variation: "Small", price: 4.0 },
        { variation: "Medium", price: 6.0 },
        { variation: "Large", price: 7.0 },
        { variation: "Jumbo", price: 8.0 },
        { variation: "Big Ol Bag", price: 10.0 },
      ],
    },
  ];

  const Rates = () => {
    const rates = (rate) => (
      <>
        <h3 className="text-lg font-bold mb-2 text-red-700">{rate.title}</h3>
        <ul className="space-y-2">
          {rate.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded"
            >
              <span className="font-medium">{item.variation}</span>
              <span className="text-right text-gray-700">
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </li>
          ))}
        </ul>
      </>
    );

    return (
      <section className="py-8">
        <SectionHeading heading_text="Rates" />
           <div className="grid gap-6 md:grid-cols-4">
             <div></div>
          {RATE_LIST.map((rate, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex flex-col"
            >
              {rates(rate)}
            </div>
          ))}
        </div>
      </section>
    );
  };

  export default Rates;