# Deployment Instructions

This document outlines how to deploy your portfolio to GitHub Pages.

## Option 1: Using GitHub Pages with Jekyll (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Create a new repository named `username.github.io` (replace `username` with your GitHub username)
3. This special repository name tells GitHub to serve the contents as a website at `https://username.github.io`

### Step 2: Clone the Repository

```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

### Step 3: Copy Files

Copy all the files from this project into your repository.

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### Step 5: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"

### Step 6: Wait for Deployment

GitHub will automatically build and deploy your site. This might take a few minutes. Once complete, you can access your site at `https://username.github.io`.

## Option 2: Custom Domain (Optional)

### Step 1: Purchase a Domain

Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy, Google Domains).

### Step 2: Configure DNS

1. Go to your domain registrar's DNS settings
2. Add the following A records pointing to GitHub Pages' IP addresses:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Add a CNAME record:
   - Host: www
   - Value: username.github.io (replace with your GitHub username)

### Step 3: Configure GitHub Pages for Custom Domain

1. In your repository settings under GitHub Pages
2. Enter your custom domain (e.g., lecuong.me) in the "Custom domain" field
3. Click "Save"
4. (Recommended) Check "Enforce HTTPS" once the certificate is provisioned

### Step 4: Add CNAME File

Create a file named `CNAME` in the root of your repository with your domain name:

```
lecuong.me
```

This ensures your custom domain setting is preserved when you push changes.

## Updating Your Portfolio

To update your portfolio, you can:

1. Edit the YAML files in the `_data` directory to update your experience, skills, or awards
2. Modify content in Markdown files
3. Add or update images in the `assets/images` directory
4. Update CSS styling in `assets/css/main.css`

After making changes:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub will automatically rebuild and deploy your updated site.

## Local Development (Optional)

To test changes locally before pushing to GitHub:

1. Install Ruby and Jekyll (if not already installed):
   ```bash
   # On macOS/Linux
   gem install bundler jekyll
   
   # On Windows, follow instructions at jekyllrb.com
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the local development server:
   ```bash
   bundle exec jekyll serve
   ```

4. View your site at `http://localhost:4000`