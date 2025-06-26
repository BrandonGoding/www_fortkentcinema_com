import './about_page.scss';
import testImage from './test.jpeg'; // Adjust the path as needed
import articleImage from './bandltheaters.jpeg';

    const AboutPage = () => {
      return (
        <div className="about-page">
          <section className="theater-history">
            <img src={articleImage} alt="Theater History" className="antique-image" />
            <h2>Theater History</h2>
            <p>
              This beloved Fort Kent landmark began life as the Savoy Theater in the late 1910s, transitioning into the Century Theater in 1969 to honor the town's centennial, and evolving further in 2014 into today’s Fort Kent Cinema. Over more than a century, it has continually adapted—from silent films with live music, through the digital revolution, to its current role as a cultural and community hub. Its near-closure during the pandemic was met with community action, showcasing local support for its preservation and future.
            </p>

            <img src={testImage} alt="Fort Kent Cinema Today" className="antique-image" />
            <h2>Fort Kent Cinema Today</h2>
            <p>
              Today, Fort Kent Cinema continues to provide an exceptional movie-going experience with state-of-the-art
              projection and sound systems, while maintaining the classic ambiance that makes our theater unique.
              We are proud to showcase a mix of the latest releases and timeless classics.
            </p>

            <img src={testImage} alt="Support The Fort Kent Cinema" className="antique-image" />
            <h2>Support The Fort Kent Cinema</h2>
            <p>
              Your support helps us keep the spirit of classic cinema alive. Whether it’s attending a show,
              spreading the word, or making a donation, every contribution ensures that Fort Kent Cinema remains
              a cherished part of our community for years to come.
            </p>
          </section>
        </div>
      );
    };

    export default AboutPage;