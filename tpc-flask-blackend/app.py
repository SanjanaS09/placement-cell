import re
import spacy
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load SpaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Predefined job roles and required skills (Example Dataset)
jobs = {
    "Software Engineer": ["Python", "Java", "Data Structures", "Algorithms", "Machine Learning", "Django", "Flask"],
    "Data Scientist": ["Python", "R", "Machine Learning", "Deep Learning", "NLP", "Statistics", "SQL"],
    "Embedded Systems Engineer": ["C", "C++", "Microcontrollers", "RTOS", "PCB Design", "IoT"],
    "Mechanical Design Engineer": ["AutoCAD", "SolidWorks", "FEA", "Matlab", "Product Design"]
}

# Function to extract skills from resume
def extract_skills(text):
    doc = nlp(text)
    skills = []
    for token in doc:
        if token.ent_type_ in ["ORG", "PRODUCT", "WORK_OF_ART"] or token.pos_ in ["NOUN", "PROPN"]:
            skills.append(token.text)
    return list(set(skills))

# Function to match resume with job roles
def match_jobs(resume_skills):
    scores = {}
    for job, required_skills in jobs.items():
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([" ".join(resume_skills), " ".join(required_skills)])
        similarity = cosine_similarity(tfidf_matrix)[0][1]
        scores[job] = similarity
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)

# Function to find missing skills
def suggest_skills(resume_skills, job):
    required_skills = set(jobs[job])
    missing_skills = required_skills - set(resume_skills)
    return list(missing_skills)

# Sample resume text
resume_text = "Experienced in Python, Java, and Flask. Worked on Machine Learning projects and data processing."  
resume_skills = extract_skills(resume_text)

# Get best job match
matched_jobs = match_jobs(resume_skills)
best_job = matched_jobs[0][0] if matched_jobs else "No match found"

# Suggest missing skills
missing_skills = suggest_skills(resume_skills, best_job) if best_job in jobs else []

# Output results
print(f"Extracted Skills: {resume_skills}")
print(f"Best Matched Job: {best_job}")
print(f"Missing Skills to Learn: {missing_skills}")
