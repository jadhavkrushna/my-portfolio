import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science Engineering</h4>
                <h5>SGGSIE&T, Nanded</h5>
              </div>
              <h3>2023 - 2027</h3>
            </div>
            <p>
              Pursuing B.Tech in CSE with a CGPA of 8.52. Building strong
              foundations in data structures, algorithms, and full-stack web
              development.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cybersecurity Virtual Intern</h4>
                <h5>CDAC, NOIDA</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed specialized training in Ethical Hacking and Penetration
              Testing. Gained hands-on experience with security tools and
              vulnerability assessment. Developed skills in network scanning and
              security audit reporting.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Personal Projects & Open Source</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building full-stack applications like Mediloon (AI-powered pharmacy
              system) and Wanderlust (travel platform). Working with React.js,
              Node.js, FastAPI, MongoDB, and AI/ML integrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
