import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            question: "What time should I arrive?",
            answer: "Please plan to arrive 15 minutes before the ceremony begins. This helps everyone settle in and ensures a smooth, on-time start."
        },
        {
            question: "What is the dress code?",
            answer: "Feel free to come looking your best and comfortable enough to celebrate with us in any of these colours."
        },
        {
            question: "Can I bring a plus-one?",
            answer: "This invitation admits one guest. Should you require further clarification, kindly reach out to the numbers listed for RSVPs."
        },
        {
            question: "Where is the ceremony and cocktail hour taking place?",
            answer: "At the same venue. You will receive details of the location via email once you RSVP."
        },
        {
            question: "Is there parking available?",
            answer: "Yes. Parking is available at the venue. We recommend arriving early to secure a spot."
        },
        {
            question: "Will the ceremony be indoors or outdoors?",
            answer: "Outdoors. Please dress comfortably for the weather."
        },
        {
            question: "Can I take photos during the ceremony?",
            answer: "Photos are welcome, but please be mindful of the photography team."
        },
        {
            question: "What should I do if I can't attend?",
            answer: "Please let us know as soon as possible so we can finalize seating and catering."
        }
    ];

    return (
        <section className="faq-section" id="faqs">
            <div className="container">
                <h2 className="section-title">Common Questions</h2>
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h3 className="faq-question">{faq.question}</h3>
                            <p className="faq-answer">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
