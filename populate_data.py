#!/usr/bin/env python
"""
Script to populate the portfolio database with sample data.
Run this after migrations are applied.
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Portfolio_Project.settings')
django.setup()

from portfolio.models import Project, Skill

def create_sample_data():
    """Create sample projects and skills"""

    # Clear existing data
    Project.objects.all().delete()
    Skill.objects.all().delete()

    # Create sample skills
    skills_data = [
        # Frontend
        {'name': 'HTML5', 'category': 'frontend', 'description': 'Semantic markup and accessibility', 'order': 1},
        {'name': 'CSS3', 'category': 'frontend', 'description': 'Responsive design and animations', 'order': 2},
        {'name': 'JavaScript', 'category': 'frontend', 'description': 'ES6+ and DOM manipulation', 'order': 3},
        {'name': 'React', 'category': 'frontend', 'description': 'Component-based UI development', 'order': 4},
        {'name': 'Tailwind CSS', 'category': 'frontend', 'description': 'Utility-first CSS framework', 'order': 5},

        # Backend
        {'name': 'Python', 'category': 'backend', 'description': 'Full-stack development', 'order': 1},
        {'name': 'Django', 'category': 'backend', 'description': 'Web framework and REST APIs', 'order': 2},
        {'name': 'Node.js', 'category': 'backend', 'description': 'JavaScript runtime', 'order': 3},
        {'name': 'Express.js', 'category': 'backend', 'description': 'Node.js web framework', 'order': 4},

        # Database
        {'name': 'PostgreSQL', 'category': 'database', 'description': 'Relational database management', 'order': 1},
        {'name': 'MongoDB', 'category': 'database', 'description': 'NoSQL document database', 'order': 2},
        {'name': 'Redis', 'category': 'database', 'description': 'In-memory data structure store', 'order': 3},

        # Expanding
        {'name': 'Docker', 'category': 'expanding', 'description': 'Containerization', 'order': 1},
        {'name': 'AWS', 'category': 'expanding', 'description': 'Cloud computing platform', 'order': 2},
        {'name': 'Git', 'category': 'expanding', 'description': 'Version control system', 'order': 3},
    ]

    for skill_data in skills_data:
        Skill.objects.create(**skill_data)
        print(f"Created skill: {skill_data['name']}")

    # Create sample projects
    projects_data = [
        {
            'title': 'E-Commerce Platform',
            'description': 'A full-featured e-commerce platform built with Django, featuring user authentication, payment processing, inventory management, and admin dashboard.',
            'short_description': 'Complete e-commerce solution with Django',
            'technologies': 'Python, Django, PostgreSQL, Stripe, HTML5, CSS3, JavaScript',
            'featured': True,
        },
        {
            'title': 'Task Management App',
            'description': 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
            'short_description': 'Real-time task management for teams',
            'technologies': 'React, Node.js, Socket.io, MongoDB, Express.js',
            'featured': True,
        },
        {
            'title': 'Personal Finance Tracker',
            'description': 'A comprehensive personal finance management tool with budgeting, expense tracking, financial goals, and detailed reporting.',
            'short_description': 'Track expenses and manage budgets',
            'technologies': 'Python, Django, Chart.js, SQLite, Bootstrap',
            'featured': True,
        },
        {
            'title': 'Weather Dashboard',
            'description': 'A responsive weather dashboard that displays current conditions and forecasts for multiple locations with beautiful data visualizations.',
            'short_description': 'Weather data visualization dashboard',
            'technologies': 'JavaScript, D3.js, OpenWeather API, HTML5, CSS3',
            'featured': False,
        },
        {
            'title': 'Blog Platform',
            'description': 'A modern blogging platform with markdown support, SEO optimization, comment system, and social media integration.',
            'short_description': 'Modern blogging platform with SEO',
            'technologies': 'Django, Markdown, PostgreSQL, Tailwind CSS',
            'featured': False,
        },
    ]

    for project_data in projects_data:
        Project.objects.create(**project_data)
        print(f"Created project: {project_data['title']}")

    print("\nSample data created successfully!")
    print(f"Created {Skill.objects.count()} skills and {Project.objects.count()} projects")

if __name__ == '__main__':
    create_sample_data()