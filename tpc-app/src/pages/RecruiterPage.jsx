import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import logo from '../assests/images/output-onlinepngtools.png';
import '../styles/RecruiterPage.css';

function RecruiterPage() {
    const [companyDetails, setCompanyDetails] = useState({
        company_name: '',
        industry_sector: '',
        company_overview: '',
        website: '',
        locations: [{ location_name: '', address: '' }],
        companyContact: '',
        alternateContact: '',
    });

    const [formData, setFormData] = useState({
        company_name: '',
        placement: {
            job_title: '',
            job_desc: '',
            type_of_employment: '',
            noOfExpectedHires: '',
            jobLocation: '',
            eligibility_criteria: {
                required_qualifications: '',
                skill_requirements: '',
                batch_year_of_study: '',
                minimum_cgpa_grade: '',
                other_criteria: '',
            },
            remote_on_site: '',
            ctcAndBreakup: {
                salary: '',
                bonus: '',
                additional_benefits: '',
            },
            selection_process: {
                recruitment_stages: [
                    'Resume shortlisting',
                    'Technical test',
                    'Interviews',
                ],
                assessment_details: '',
                interview_process: [
                    {
                        round: 1,
                        focus: 'Technical/HR',
                    },
                ],
                expected_timeline: '',
            },
        },
        internship: {
            internship_title: '',
            internship_description: '',
            duration: {
                start_date: '',
                end_date: '',
            },
            type_of_employment: '',
            remote_on_site: '',
            eligibility_criteria: {
                required_qualifications: '',
                skill_requirements: '',
                batch_year_of_study: '',
                minimum_cgpa_grade: '',
                other_criteria: '',
            },
            ctcAndBreakup: {
                stipend: '',
                bonus: '',
                additional_benefits: '',
            },
        },
    });

    const [isInternshipEnabled, setIsInternshipEnabled] = useState(false);

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setCompanyDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Save company details first
            const companyRef = firebase.database().ref(`companies/${companyDetails.company_name}`);
            await companyRef.set(companyDetails);

            // Save job/internship details
            const jobRef = firebase.database().ref(`jobs/${formData.company_name}`);
            await jobRef.set(formData);

            alert('Details submitted successfully!');
        } catch (error) {
            console.error('Error submitting details:', error);
            alert('Failed to submit details. Please try again.');
        }
    };

    return (
        <div>
            <nav className="nav">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/CompanyProfile">Profile</a></li>
                </ul>
            </nav>

                <div className="container">
                    <div className="section">
                        <h2>Company Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="company_name">Company Name *</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={companyDetails.company_name}
                                    onChange={handleCompanyChange}
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="industry_sector">Industry Sector *</label>
                                <input
                                    type="text"
                                    name="industry_sector"
                                    value={companyDetails.industry_sector}
                                    onChange={handleCompanyChange}
                                    placeholder="Enter industry sector"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company_overview">Company Overview *</label>
                                <textarea
                                    name="company_overview"
                                    value={companyDetails.company_overview}
                                    onChange={handleCompanyChange}
                                    placeholder="Provide a brief overview of the company"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website *</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={companyDetails.website}
                                    onChange={handleCompanyChange}
                                    placeholder="Enter the company website URL"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyContact">Company Contact *</label>
                                <input
                                    type="tel"
                                    name="companyContact"
                                    value={companyDetails.companyContact}
                                    onChange={handleCompanyChange}
                                    placeholder="Enter company contact number"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="alternateContact">Alternate Contact</label>
                                <input
                                    type="tel"
                                    name="alternateContact"
                                    value={companyDetails.alternateContact}
                                    onChange={handleCompanyChange}
                                    placeholder="Enter alternate contact number"
                                />
                            </div>

                            <h3>Placement Details</h3>
                            <div className="form-group">
                                <label htmlFor="placement.job_title">Job Title *</label>
                                <input
                                    type="text"
                                    name="placement.job_title"
                                    value={formData.placement.job_title}
                                    onChange={handleFormChange}
                                    placeholder="Enter job title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.job_desc">Job Description *</label>
                                <input
                                    type="text"
                                    name="placement.job_desc"
                                    value={formData.placement.job_desc}
                                    onChange={handleFormChange}
                                    placeholder="Describe the job responsibilities"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.type_of_employment">Type of Employment *</label>
                                <input
                                    type="text"
                                    name="placement.type_of_employment"
                                    value={formData.placement.type_of_employment}
                                    onChange={handleFormChange}
                                    placeholder="Enter type of employment"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.noOfExpectedHires">No. of Expected Hires *</label>
                                <input
                                    type="number"
                                    name="placement.noOfExpectedHires"
                                    value={formData.placement.noOfExpectedHires}
                                    onChange={handleFormChange}
                                    placeholder="Enter expected number of hires"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.jobLocation">Job Location *</label>
                                <input
                                    type="text"
                                    name="placement.jobLocation"
                                    value={formData.placement.jobLocation}
                                    onChange={handleFormChange}
                                    placeholder="Enter job location"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.remote_on_site">Remote/On-site/Hybrid *</label>
                                <input
                                    type="text"
                                    name="placement.remote_on_site"
                                    value={formData.placement.remote_on_site}
                                    onChange={handleFormChange}
                                    placeholder="Enter work model"
                                    required
                                />
                            </div>

                            <h3>Eligibility Criteria for Placement</h3>
                            <div className="form-group">
                                <label htmlFor="placement.eligibility_criteria.required_qualifications">Required Qualifications *</label>
                                <input
                                    type="text"
                                    name="placement.eligibility_criteria.required_qualifications"
                                    value={formData.placement.eligibility_criteria.required_qualifications}
                                    onChange={handleFormChange}
                                    placeholder="Enter required qualifications"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.eligibility_criteria.skill_requirements">Skill Requirements *</label>
                                <input
                                    type="text"
                                    name="placement.eligibility_criteria.skill_requirements"
                                    value={formData.placement.eligibility_criteria.skill_requirements}
                                    onChange={handleFormChange}
                                    placeholder="Enter skill requirements"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.eligibility_criteria.batch_year_of_study">Batch Year of Study *</label>
                                <input
                                    type="text"
                                    name="placement.eligibility_criteria.batch_year_of_study"
                                    value={formData.placement.eligibility_criteria.batch_year_of_study}
                                    onChange={handleFormChange}
                                    placeholder="Enter eligible batch year(s)"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.eligibility_criteria.minimum_cgpa_grade">Minimum CGPA/Grade *</label>
                                <input
                                    type="text"
                                    name="placement.eligibility_criteria.minimum_cgpa_grade"
                                    value={formData.placement.eligibility_criteria.minimum_cgpa_grade}
                                    onChange={handleFormChange}
                                    placeholder="Enter minimum CGPA or grade"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.eligibility_criteria.other_criteria">Other Criteria</label>
                                <input
                                    type="text"
                                    name="placement.eligibility_criteria.other_criteria"
                                    value={formData.placement.eligibility_criteria.other_criteria}
                                    onChange={handleFormChange}
                                    placeholder="Enter any other criteria"
                                />
                            </div>

                            <h3>CTC and Breakup for Placement</h3>
                            <div className="form-group">
                                <label htmlFor="placement.ctcAndBreakup.salary">Salary *</label>
                                <input
                                    type="text"
                                    name="placement.ctcAndBreakup.salary"
                                    value={formData.placement.ctcAndBreakup.salary}
                                    onChange={handleFormChange}
                                    placeholder="Enter expected salary"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.ctcAndBreakup.bonus">Bonus/Incentives</label>
                                <input
                                    type="text"
                                    name="placement.ctcAndBreakup.bonus"
                                    value={formData.placement.ctcAndBreakup.bonus}
                                    onChange={handleFormChange}
                                    placeholder="Enter bonus or incentives"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.ctcAndBreakup.additional_benefits">Additional Benefits</label>
                                <input
                                    type="text"
                                    name="placement.ctcAndBreakup.additional_benefits"
                                    value={formData.placement.ctcAndBreakup.additional_benefits}
                                    onChange={handleFormChange}
                                    placeholder="Enter any additional benefits"
                                />
                            </div>

                            <h3>Selection Process for Placement</h3>
                            <div className="form-group">
                                <label htmlFor="placement.selection_process.assessment_details">Assessment Details *</label>
                                <input
                                    type="text"
                                    name="placement.selection_process.assessment_details"
                                    value={formData.placement.selection_process.assessment_details}
                                    onChange={handleFormChange}
                                    placeholder="Enter assessment details"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="placement.selection_process.expected_timeline">Expected Timeline *</label>
                                <input
                                    type="text"
                                    name="placement.selection_process.expected_timeline"
                                    value={formData.placement.selection_process.expected_timeline}
                                    onChange={handleFormChange}
                                    placeholder="Enter expected timeline"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Include Internship Details?</label>
                                <input
                                    type="checkbox"
                                    checked={isInternshipEnabled}
                                    onChange={() => setIsInternshipEnabled(!isInternshipEnabled)}
                                />
                            </div>

                            {isInternshipEnabled && (
                                <>
                                    <h3>Internship Details</h3>
                                    <div className="form-group">
                                        <label htmlFor="internship.internship_title">Internship Title *</label>
                                        <input
                                            type="text"
                                            name="internship.internship_title"
                                            value={formData.internship.internship_title}
                                            onChange={handleFormChange}
                                            placeholder="Enter internship title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.internship_description">Internship Description *</label>
                                        <textarea
                                            name="internship.internship_description"
                                            value={formData.internship.internship_description}
                                            onChange={handleFormChange}
                                            placeholder="Describe the internship responsibilities"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.duration.start_date">Internship Start Date *</label>
                                        <input
                                            type="date"
                                            name="internship.duration.start_date"
                                            value={formData.internship.duration.start_date}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.duration.end_date">Internship End Date *</label>
                                        <input
                                            type="date"
                                            name="internship.duration.end_date"
                                            value={formData.internship.duration.end_date}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.type_of_employment">Type of Employment *</label>
                                        <input
                                            type="text"
                                            name="internship.type_of_employment"
                                            value={formData.internship.type_of_employment}
                                            onChange={handleFormChange}
                                            placeholder="Enter type of employment"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.remote_on_site">Remote/On-site/Hybrid *</label>
                                        <input
                                            type="text"
                                            name="internship.remote_on_site"
                                            value={formData.internship.remote_on_site}
                                            onChange={handleFormChange}
                                            placeholder="Enter work model"
                                            required
                                        />
                                    </div>

                                    <h3>Eligibility Criteria for Internship</h3>
                                    <div className="form-group">
                                        <label htmlFor="internship.eligibility_criteria.required_qualifications">Required Qualifications *</label>
                                        <input
                                            type="text"
                                            name="internship.eligibility_criteria.required_qualifications"
                                            value={formData.internship.eligibility_criteria.required_qualifications}
                                            onChange={handleFormChange}
                                            placeholder="Enter required qualifications"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.eligibility_criteria.skill_requirements">Skill Requirements *</label>
                                        <input
                                            type="text"
                                            name="internship.eligibility_criteria.skill_requirements"
                                            value={formData.internship.eligibility_criteria.skill_requirements}
                                            onChange={handleFormChange}
                                            placeholder="Enter skill requirements"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.eligibility_criteria.batch_year_of_study">Batch Year of Study *</label>
                                        <input
                                            type="text"
                                            name="internship.eligibility_criteria.batch_year_of_study"
                                            value={formData.internship.eligibility_criteria.batch_year_of_study}
                                            onChange={handleFormChange}
                                            placeholder="Enter eligible batch year(s)"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.eligibility_criteria.minimum_cgpa_grade">Minimum CGPA/Grade *</label>
                                        <input
                                            type="text"
                                            name="internship.eligibility_criteria.minimum_cgpa_grade"
                                            value={formData.internship.eligibility_criteria.minimum_cgpa_grade}
                                            onChange={handleFormChange}
                                            placeholder="Enter minimum CGPA or grade"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.eligibility_criteria.other_criteria">Other Criteria</label>
                                        <input
                                            type="text"
                                            name="internship.eligibility_criteria.other_criteria"
                                            value={formData.internship.eligibility_criteria.other_criteria}
                                            onChange={handleFormChange}
                                            placeholder="Enter any other criteria"
                                        />
                                    </div>

                                    <h3>CTC and Breakup for Internship</h3>
                                    <div className="form-group">
                                        <label htmlFor="internship.ctcAndBreakup.stipend">Stipend *</label>
                                        <input
                                            type="text"
                                            name="internship.ctcAndBreakup.stipend"
                                            value={formData.internship.ctcAndBreakup.stipend}
                                            onChange={handleFormChange}
                                            placeholder="Enter stipend amount"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.ctcAndBreakup.bonus">Bonus/Incentives</label>
                                        <input
                                            type="text"
                                            name="internship.ctcAndBreakup.bonus"
                                            value={formData.internship.ctcAndBreakup.bonus}
                                            onChange={handleFormChange}
                                            placeholder="Enter bonus or incentives"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internship.ctcAndBreakup.additional_benefits">Additional Benefits</label>
                                        <input
                                            type="text"
                                            name="internship.ctcAndBreakup.additional_benefits"
                                            value={formData.internship.ctcAndBreakup.additional_benefits}
                                            onChange={handleFormChange}
                                            placeholder="Enter any additional benefits"
                                        />
                                    </div>
                                </>
                            )}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
            );
}

            export default RecruiterPage;