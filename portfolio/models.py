from django.db import models
# from django.utils.text import slugify
from cloudinary.models import CloudinaryField

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
    PROJECT_TYPE_CHOICES = [
        ('web_app', 'Web Application'),
        ('mobile_app', 'Mobile Application'),
        ('api', 'API/Backend'),
        ('full_stack', 'Full-Stack Solution'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    technologies = models.CharField(max_length=500)  # Comma-separated
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES, default='web_app')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    image = CloudinaryField('image', help_text="Project image")
    demo_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    completion_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', '-completion_date', '-created_at']

    def __str__(self):
        return self.title

    def get_tech_list(self):
        """Returns list of technologies"""
        return [tech.strip() for tech in self.technologies.split(',')]

    def save(self, *args, **kwargs):
        """Auto-generate slug from title if not provided"""
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
            # Ensure uniqueness
            original_slug = self.slug
            counter = 1
            while Project.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)

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
