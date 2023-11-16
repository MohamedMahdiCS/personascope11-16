import React, { useState, useEffect } from 'react';
import styles from './AboutUs.module.css';  // Reuse the styles from AboutUs
import { Link, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


function UserResultsPage() {
    const [menuActive, setMenuActive] = useState(false);
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    const [selectedResult, setSelectedResult] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 4; // Number of results per page
    // Calculate the number of pages
    const pageCount = Math.ceil(results.length / resultsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current results
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);


    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/testResultsRoutes/myresults", {
                headers: { 'x-auth-token': token }
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                console.error("Failed to fetch user results.");
            }
        };

        fetchResults();
    }, []);

    const contact = () => {
        navigate('/contactus');
    };
    const handleResultClick = (result) => {
        setSelectedResult(result);
        setShowModal(true);
    };
    const downloadPDF = async () => {
        const input = document.getElementById('pdfContent');
        const canvas = await html2canvas(input, { scale: 2 }); // Increase scale for better resolution
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297;  // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        const pdf = new jsPDF('p', 'mm');
        let position = 0;
      
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      
        pdf.save('test-result.pdf');
      };
          
      
    
    const displayModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };
    
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    const handleSuggestionsFeedbackPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/suggestions-feedback' } });
        } else {
            navigate('/suggestions-feedback');
        }
    };

    const handlePersonalityTestPage = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/personalityTestPage' } });
        } else {
            navigate('/personalityTestPage');
        }
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    const naturalLeaderFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Congratulations! Your total score places you in the "Natural Leader" category, indicating that you are highly suitable for high-level leadership roles. This report aims to provide a comprehensive analysis of your leadership skills and personality traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">You have demonstrated a strong ability to take initiative in unfamiliar situations and adapt to new challenges. This is a critical skill for high-level leaders who often need to navigate uncharted territories and make quick decisions.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">Your responses indicate that you often step up as the leader when working in a team setting. You also prioritize listening to team members and valuing diversity, which are essential traits for effective leadership and team cohesion.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">Your tendency to act as a mediator in conflicts suggests that you possess strong interpersonal skills and emotional intelligence. These are invaluable traits for leaders who need to manage team dynamics and resolve conflicts efficiently.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You have a strong inclination for self-reflection and actively seek feedback about your performance. This willingness to improve and adapt is crucial for any leader aiming for long-term success.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are comfortable with delegating tasks and trust your team's abilities. You also prioritize tasks based on importance and deadlines, which is essential for effective project management.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your ability to manage stress and high-pressure situations effectively is a strong indicator of your resilience and mental fortitude, qualities that are indispensable in high-stakes leadership roles.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Leadership Roles: Given your strong leadership traits, you are highly recommended for high-level leadership positions, such as Director, VP, or C-level roles.</p>
            <p className="feedback-text">2. Mentorship: Your skills in mentoring and guiding others can be invaluable in a leadership role where training and developing team members is crucial.</p>
            <p className="feedback-text">3. Continuous Learning: While you have scored highly, continuous learning is key to leadership. Consider advanced leadership training and courses to further hone your skills.</p>
            <p className="feedback-text">4. Networking: Utilize your skills in relationship-building to network with other leaders and professionals in your industry.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that you possess the skills, traits, and mindset required for high-level leadership roles. Your strengths in initiative, team leadership, conflict resolution, and self-improvement are particularly noteworthy. We highly recommend that you pursue opportunities that allow you to leverage these skills in a leadership capacity.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you all the best in your future leadership endeavors.</p>
        </div>
            ;

            const teamPlayerFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Congratulations on completing the Leadership Skills and Personality Assessment. Your total score places you in the "Team Player" category, suggesting that you are well-suited for mid-level leadership or specialized roles. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">You've shown a good level of initiative, particularly in familiar settings. While you may not always be the first to step up in completely new situations, you are generally willing to take on responsibilities and challenges.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">Your responses indicate that you are comfortable working in a team and often contribute significantly to team efforts. While you may not always take the lead, you are a key player who helps the team move towards its goals.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">You have a balanced approach to conflict resolution, often helping to mediate disputes or find middle ground. This skill is essential for mid-level leaders who need to maintain team harmony.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You are open to feedback and make an effort to improve, although you may not always seek it out proactively. This trait is important for anyone in a specialized or leadership role, as it allows for continual growth and adaptation.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are generally good at managing tasks and may be comfortable delegating to team members you trust. Your ability to prioritize tasks based on importance and deadlines is a valuable skill in any professional setting.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">You have shown that you can manage stress and high-pressure situations reasonably well, although there may be room for improvement. This is an important skill for anyone in a leadership or specialized role.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Mid-Level Leadership: Your skills and traits make you a strong candidate for mid-level leadership roles, such as team lead or manager, where you can use your team-playing abilities to the fullest.</p>
            <p className="feedback-text">2. Specialized Roles: Given your skills, you may also excel in specialized roles that require a high level of expertise and the ability to work well in a team setting.</p>
            <p className="feedback-text">3. Skill Development: Consider taking courses or workshops to improve areas like proactive self-reflection and stress management.</p>
            <p className="feedback-text">4. Mentorship: Seek out mentors who can guide you in honing your leadership skills and navigating the challenges of mid-level leadership roles.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that you have strong team-playing abilities and are well-suited for mid-level leadership or specialized roles. While you may not naturally gravitate towards high-level leadership positions, your skills are invaluable in a team setting and can be instrumental in achieving collective goals.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you success in your future endeavors, whether they be in leadership or specialized roles.</p>
        </div>
            ;
      
        const contributorFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Thank you for completing the Leadership Skills and Personality Assessment. Your total score places you in the "Contributor" category, suggesting that you are most effective in individual contributor roles. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">Your responses indicate that you may be more comfortable taking initiative in familiar situations rather than unfamiliar ones. This is a valuable trait for individual contributors who need to execute tasks effectively within known parameters.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">While you may not naturally step up as the leader in a team setting, you do contribute to team efforts. Your skills are often best utilized in roles where you can focus on specific tasks.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">You may prefer to avoid conflicts rather than mediate them, which is often suitable for roles that require less interpersonal interaction and more individual focus.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You show some interest in self-improvement but may not actively seek out feedback. This is an area where you could grow to become even more effective in your role.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">You are generally good at managing your own tasks and may prefer to complete them yourself rather than delegating. This trait is often seen in effective individual contributors.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your ability to manage stress and high-pressure situations is moderate. This is an area where improvement could make you even more effective in your role.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Individual Contributor Roles: Your skills and traits are well-suited for roles that allow you to focus on specific tasks, such as analyst, developer, or specialist positions.</p>
            <p className="feedback-text">2. Skill Development: Consider taking courses or workshops to improve in areas like stress management and self-reflection. These skills can make you even more effective in individual contributor roles.</p>
            <p className="feedback-text">3. Team Collaboration: While your strengths lie in individual tasks, the ability to collaborate effectively with a team is also important. Consider team-building activities or training to improve this skill.</p>
            <p className="feedback-text">4. Mentorship: A mentor can provide valuable insights into how to navigate your career path effectively, even in individual contributor roles.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis suggest that you are most effective in individual contributor roles where you can focus on specific tasks. While you may not be inclined towards leadership positions, your skills are invaluable in roles that require a high level of individual expertise and execution.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. We wish you continued success in your career, particularly in roles that allow you to utilize your strengths as an effective individual contributor.</p>
        </div>
            ;
      
        const needsImprovementFeedback = 
            <div className="feedback-container">
            <h1 className="feedback-title">Leadership Skills and Personality Assessment Report</h1>
            <hr />
            <h2 className="feedback-section-title">Executive Summary:</h2>
            <p className="feedback-text">Thank you for participating in the Leadership Skills and Personality Assessment. Your total score places you in the "Needs Improvement" category. This suggests that there are areas where you could benefit from further development, potentially through training or mentorship. This report aims to provide a detailed analysis of your skills and traits based on your responses to the assessment.</p>
            <h2 className="feedback-section-title">Detailed Analysis</h2>
            <h3 className="feedback-subsection-title">Initiative and Adaptability:</h3>
            <p className="feedback-text">Your responses indicate that you may hesitate to take the initiative, particularly in unfamiliar situations. This is an area where training or mentorship could provide valuable guidance.</p>
            <h3 className="feedback-subsection-title">Team Leadership and Collaboration:</h3>
            <p className="feedback-text">You appear to be less comfortable in leadership roles within a team setting. This is an area where you could benefit from specific training to improve your collaboration and leadership skills.</p>
            <h3 className="feedback-subsection-title">Conflict Resolution:</h3>
            <p className="feedback-text">Your approach to conflict resolution may need improvement. Effective communication and negotiation skills are crucial in both leadership and team roles, and this is an area where you could benefit from further development.</p>
            <h3 className="feedback-subsection-title">Self-Reflection and Improvement:</h3>
            <p className="feedback-text">You may not actively seek out feedback or engage in self-reflection. These are important skills for personal and professional growth and are areas where you could improve.</p>
            <h3 className="feedback-subsection-title">Task Management and Delegation:</h3>
            <p className="feedback-text">Your ability to manage tasks and delegate, when necessary, appears to be limited. These are key skills in most professional settings and could be developed through targeted training.</p>
            <h3 className="feedback-subsection-title">Stress Management:</h3>
            <p className="feedback-text">Your responses suggest that you may find it challenging to manage stress and high-pressure situations effectively. This is another area where you could benefit from training or mentorship.</p>
            <h2 className="feedback-section-title">Recommendations:</h2>
            <p className="feedback-text">1. Training Programs: Consider enrolling in training programs that focus on leadership skills, team collaboration, and effective communication.</p>
            <p className="feedback-text">2. Mentorship: Seek out a mentor who can provide personalized guidance and help you identify areas for improvement.</p>
            <p className="feedback-text">3. Self-Improvement: Invest time in self-improvement books, online courses, or workshops that can help you develop the skills you need to improve.</p>
            <p className="feedback-text">4. Feedback Loop: Make it a habit to seek regular feedback from peers and supervisors to continually assess and improve your skills.</p>
            <h2 className="feedback-section-title">Conclusion:</h2>
            <p className="feedback-text">Your score and subsequent analysis indicate that there are several areas where you could benefit from further development. While you may currently be more effective in roles that require less leadership and collaboration, there is room for growth. Training and mentorship are recommended to help you develop the skills you need to become more effective in a wider range of roles.</p>
            <p className="feedback-footer">Thank you for participating in this Leadership Skills and Personality Assessment. Improvement is a continuous journey, and we encourage you to take the steps necessary to develop your skills further.</p>
        </div>
            ;

    const categoryFeedback = {
        "Natural Leader": naturalLeaderFeedback,
        "Team Player": teamPlayerFeedback,
        "Contributor": contributorFeedback,
        "Needs Improvement": needsImprovementFeedback,
    };
    
    
    const handleAboutUsPage = () => {
        navigate('/AboutUs');
    };

    const handleDeleteResult = async (resultId) => {
        const token = localStorage.getItem("token");
        // Add confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this test result?");
        if (!isConfirmed) {
            return; // Do nothing if the user cancels the action
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/testResultsRoutes/${resultId}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
    
            if (response.ok) {
                setResults(prevResults => prevResults.filter(result => result._id !== resultId));
                displayModal("Test result successfully deleted!");
            } else {
                console.error("Failed to delete the test result.");
                displayModal("Failed to delete the test result. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            displayModal("An error occurred while deleting the test result. Please try again.");
        }
    };
    return (
        <div className={styles.pageWrapper}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>PersonaScope</h1>
                </Link>
                <button onClick={toggleDropdown} className={styles.menuButton}>☰</button>

                <div className={showDropdown ? styles.dropdownActive : styles.button_container}>
                    {isLoggedIn && (
                        <>
                            <button className={styles.white_btn} onClick={handleLogout}>
                                Logout
                            </button>
                            <button className={styles.white_btn2} onClick={handlePersonalityTestPage}>
                                Take your Personality Test
                            </button>
                        </>
                    )}
                    <button className={styles.white_btn2} onClick={handleAboutUsPage}>
                        About Us
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className={styles.aboutWrapper}>
                <header className={styles.aboutHeader}>
                    <h1>Your Test Results</h1>
                </header>
                <ul className={styles.resultsList}>
        {currentResults.map((result, index) => (
            <li key={index} className={styles.resultItem} onClick={() => handleResultClick(result)}>
                <p>Date: {new Date(result.date).toLocaleString()}</p>
                <p>Score: {result.score}</p>
                <p>Category: {result.category}</p>
                <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteResult(result._id); }}
                    className={styles.readMoreButton} // Apply the same style as the read more button
                >
                    Delete
                </button>                
                <button className={styles.readMoreButton}>Read More</button>
            </li>
            
        ))}
    </ul>
    <div className={styles.pagination}>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
            <button key={number} onClick={() => paginate(number)}>
                {number}
            </button>
        ))}
    </div>

            </div>

            {/* Modal */}
            {showModal && selectedResult && (
                <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                <div id="pdfContent" className="pdfContent">
                    <h2>Test Result Details</h2>
                    <p>Date: {new Date(selectedResult.date).toLocaleString()}</p>
                    <p>Score: {selectedResult.score}</p>
                    <p>Category: {selectedResult.category}</p>
                    {categoryFeedback[selectedResult.category]}
                </div>
                <button onClick={() => { setShowModal(false); setSelectedResult(null); }}>Close</button>
                </div>

                </div>
            )}
            


            {/* Footer */}
            <footer className={styles.footer}>
    <div className={styles.footerLinks}>
        {isLoggedIn && (
            <span className={styles.footerLink} onClick={handleSuggestionsFeedbackPage}>
                Feedback
            </span>
        )}
        <span className={styles.footerLink} onClick={contact}>
            Contact Us
        </span>
    </div>
    <div className={styles.copyrightText}>
        © {new Date().getFullYear()} Personality Test Web App. All rights reserved.
    </div>
</footer>
        </div>
    );
}

export default UserResultsPage;
