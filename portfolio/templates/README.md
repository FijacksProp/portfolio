# Joshua Olugbemi - Professional Portfolio

A modern, premium Django-ready portfolio website for Joshua Olugbemi, Full-Stack Django Developer and Web Development Instructor.

## 🎨 Design Overview

This portfolio features a sophisticated dark theme with warm golden accents (#d9a35d), exceptional typography using Cormorant Garamond and Work Sans, and smooth micro-interactions throughout. The design philosophy emphasizes "refined technical elegance" - clean, professional, and memorable.

### Key Design Features
- **Dark gradient background** with subtle animation
- **Premium typography** - Cormorant Garamond for headings, Work Sans for body text
- **Smooth animations** - reveal effects, hover transitions, and button interactions
- **Glassmorphism effects** with glow borders
- **Fully responsive** design from mobile to desktop
- **Accessible** color contrast and semantic HTML

## 📁 File Structure

```
portfolio/
├── templates/
│   ├── base.html          # Base template with navigation and footer
│   ├── home.html          # Homepage with hero and highlights
│   ├── about.html         # About page with bio and skills
│   ├── projects.html      # Projects showcase
│   └── contact.html       # Contact form and information
├── static/
│   ├── css/               # (Django will collect here)
│   ├── js/                # (Django will collect here)
│   └── images/            # (Add your project images here)
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## 🚀 Django Integration Guide

### Step 1: Set Up Django Project

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Django
pip install django

# Create Django project
django-admin startproject portfolio_project .

# Create portfolio app
python manage.py startapp portfolio
```

### Step 2: Configure Settings

In `portfolio_project/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'portfolio',  # Add your app
]

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Add templates directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static files configuration
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files configuration (for user uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### Step 3: Create URLs

In `portfolio/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
]
```

In `portfolio_project/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Step 4: Create Views

In `portfolio/views.py`:

```python
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Contact

def home(request):
    """Homepage view"""
    return render(request, 'home.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

def projects(request):
    """Projects page view"""
    # You can add Project model queries here
    return render(request, 'projects.html')

def contact(request):
    """Contact page view with form handling"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
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
```

### Step 5: Create Models

In `portfolio/models.py`:

```python
from django.db import models

class Contact(models.Model):
    """Model for storing contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"

class Project(models.Model):
    """Model for portfolio projects"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    technologies = models.CharField(max_length=500)  # Comma-separated
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def get_tech_list(self):
        """Returns list of technologies"""
        return [tech.strip() for tech in self.technologies.split(',')]

class Skill(models.Model):
    """Model for skills"""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend Development'),
        ('backend', 'Backend Development'),
        ('database', 'Database & Tools'),
        ('expanding', 'Expanding Ecosystem'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['category', 'order']
    
    def __str__(self):
        return self.name
```

### Step 6: Register Models in Admin

In `portfolio/admin.py`:

```python
from django.contrib import admin
from .models import Contact, Project, Skill

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'created_at']
    list_filter = ['featured', 'created_at']
    search_fields = ['title', 'description']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'order']
    list_filter = ['category']
    search_fields = ['name']
```

### Step 7: Run Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser
```

### Step 8: Collect Static Files

```bash
python manage.py collectstatic
```

### Step 9: Run Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` to see your portfolio!

## 📧 Setting Up Email Notifications

To receive email notifications when someone fills the contact form, add to `settings.py`:

```python
# Email configuration (using Gmail as example)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'  # Use App Password, not regular password
DEFAULT_FROM_EMAIL = 'your-email@gmail.com'
```

Update the contact view in `views.py`:

```python
from django.core.mail import send_mail
from django.conf import settings

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # Save to database
        Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        # Send email notification
        email_subject = f'New Contact Form Submission: {subject}'
        email_message = f'Name: {name}\nEmail: {email}\n\nMessage:\n{message}'
        
        send_mail(
            email_subject,
            email_message,
            settings.DEFAULT_FROM_EMAIL,
            ['joshua.olugbemi@example.com'],  # Your email
            fail_silently=False,
        )
        
        messages.success(request, 'Thank you for your message! I\'ll get back to you soon.')
        return redirect('contact')
    
    return render(request, 'contact.html')
```

## 🎨 Customization Guide

### Changing Colors

All colors are centralized in the `<style>` section of `base.html`. Key color values:
- Primary gold: `#d9a35d`
- Dark gold: `#c48d47`
- Background: `#0a0a0a`
- Secondary background: `#0f0f0f`

### Adding Your Own Images

1. Create a `media/projects/` directory
2. Add project images
3. Update the Project model instances through Django admin

### Modifying Content

All content is in the HTML templates. Simply edit:
- `home.html` - Hero section and highlights
- `about.html` - Bio, skills, and timeline
- `projects.html` - Project showcases
- `contact.html` - Contact information

## 🚢 Deployment

### Prepare for Production

1. **Update `settings.py`:**

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
```

2. **Create `requirements.txt`:**

```bash
pip freeze > requirements.txt
```

### Deploy to Heroku

```bash
# Install Heroku CLI
# Create Procfile
echo "web: gunicorn portfolio_project.wsgi" > Procfile

# Install gunicorn
pip install gunicorn

# Create runtime.txt
echo "python-3.11.0" > runtime.txt

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create your-portfolio-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set DEBUG=False

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser
```

### Deploy to PythonAnywhere / DigitalOcean

Follow their respective Django deployment guides. Key steps are similar:
1. Set up virtual environment
2. Install requirements
3. Configure WSGI
4. Set up database
5. Collect static files
6. Configure web server (Nginx + Gunicorn)

## 📱 Features

- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ Contact form with database storage
- ✅ Admin panel for content management
- ✅ SEO-friendly structure
- ✅ Fast loading times
- ✅ Clean, semantic HTML
- ✅ Accessible design
- ✅ Production-ready

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS, JavaScript
- **Backend:** Django 4.x
- **Database:** SQLite (development), PostgreSQL (production recommended)
- **Fonts:** Google Fonts (Cormorant Garamond, Work Sans)
- **Icons:** Heroicons (via SVG)

## 📄 License

This portfolio template is free to use for personal projects. Please customize it and make it your own!

## 🤝 Support

For questions or issues:
- Email: joshua.olugbemi@example.com
- GitHub: @joshuaolugbemi
- LinkedIn: linkedin.com/in/joshuaolugbemi

## 🙏 Credits

Designed and developed by Joshua Olugbemi
Portfolio created with Django and Tailwind CSS
