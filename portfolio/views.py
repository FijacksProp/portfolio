from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Contact, Project, Skill

def home(request):
    """Homepage view"""
    featured_projects = Project.objects.filter(featured=True)[:3]
    skills = Skill.objects.all()[:8]  # Show top 8 skills
    return render(request, 'home.html', {
        'featured_projects': featured_projects,
        'skills': skills
    })

def about(request):
    """About page view"""
    skills = Skill.objects.all()
    return render(request, 'about.html', {'skills': skills})

def projects(request):
    """Projects page view"""
    projects = Project.objects.all()
    return render(request, 'projects.html', {'projects': projects})

def contact(request):
    """Contact page view with form handling"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Validate required fields
        if not all([name, email, subject, message]):
            messages.error(request, 'All fields are required.')
            return redirect('contact')

        # Save to database
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )

        messages.success(request, 'Thank you for your message! I\'ll get back to you soon.')
        return redirect('contact')

    return render(request, 'contact.html')
