# GitHub Pages Portfolio for Tran Le Cuong

This repository contains a Jekyll-based portfolio website that can be easily deployed to GitHub Pages.

## Repository Structure

```
portfolio-site/
│
├── _config.yml                # Jekyll configuration
├── index.md                   # Home page
├── _layouts/                  # Layout templates
│   ├── default.html           # Main layout template
│   └── home.html              # Home page layout
│
├── _includes/                 # Reusable components
│   ├── header.html            # Navigation header
│   ├── footer.html            # Footer 
│   ├── about.html             # About section
│   ├── experience.html        # Experience section
│   ├── skills.html            # Skills section
│   └── contact.html           # Contact section
│
├── _data/                     # Data files (YAML/JSON)
│   ├── experience.yml         # Work experience data
│   ├── skills.yml             # Skills data
│   └── awards.yml             # Awards data
│
├── assets/                    # Static assets
│   ├── css/                   # Stylesheets
│   │   └── main.css           # Main CSS file
│   ├── js/                    # JavaScript
│   │   └── main.js            # Main JS file
│   └── images/                # Images
│       └── profile.jpg        # Your profile picture
│
└── README.md                  # Repository documentation
```

## Setup Instructions

### 1. Copy Files

Copy all the files from this project into your repository.

### 2. Update Content

Update the content in the following files:
- `_config.yml`: Site configuration
- `_data/*.yml`: Your personal information, experience, skills, and awards
- Add your profile picture to `assets/images/`

### 3. Test Locally (Optional)

To test your site locally before deploying:

1. Install Jekyll and Bundler:
   ```bash
   gem install jekyll bundler
   ```

2. Build and serve the site:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` in your browser

### 4. Deploy to GitHub Pages

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to your repository settings on GitHub, navigate to "Pages", and ensure your site is being built from the main branch

3. Your site will be available at `https://username.github.io` (it may take a few minutes to build)

## Content Updates

To update your portfolio, you only need to edit the markdown and YAML files:

- Edit files in `_data/` to update your experience, skills, awards
- Edit HTML files in `_includes/` if you want to change section layouts
- The main page content is in `index.md`

## Customization

- **Styles**: Edit `assets/css/main.css` to customize the look
- **Layout**: Modify templates in `_layouts/` and components in `_includes/`
- **Configuration**: Change site settings in `_config.yml`