import React from "react";
import "./Resume.css";

const Resume = () => {
    return (
        <div className="resume">
            <header className="header">
                <h1>Braedon Merlo</h1>
                <p>29 Sailmaker Court, San Rafael CA, 94903 | (925) 984-0197 | merlobraedon@cityuniversity.edu</p>
            </header>

            <section className="section">
                <h2>Education</h2>
                <div className="education">
                    <h3>Master of Science in Cyber Securtiy</h3>
                    <p>City University of Seattle | Seattle WA</p>
                    <p>GPA 3.9</p>
                    <h3>Bachelor of Arts in Cinema & Television Arts</h3>
                    <p>Cal State University Northridge | Northridge CA</p>
                    <p>GPA 2.9</p>
                </div>
            </section>

            <section className="section">
                <h2>Projects</h2> 
                <div className="projects">
                    <h3>Personal Website</h3>
                    <p>
                        Built a personal website using React and deployed it on Github Pages
                    </p>
                    <p>
                        Source Code:{" "}
                        <a href="https://organic-carnival-rrg4x7r4g742x56r-3000.app.github.dev/"
                        target="_blank"
                        rel="noopener no reffer"
                        >
                            https://github.com/braedonmerlodev/cs628-pe-braedon
                        </a>
                    </p>
                </div>

            </section>

        </div>
    )
}

export default Resume;