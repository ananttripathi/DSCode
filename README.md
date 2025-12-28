# 📊 DSCode - Master Data Science, AI & ML

A comprehensive learning platform inspired by [NeetCode.io](https://neetcode.io) and [NextLeap.app](https://nextleap.app), designed specifically for mastering Data Science, Artificial Intelligence, and Machine Learning through curated problems and structured learning paths.

## 🌟 Features

- **250+ Curated Problems** across 10+ topics
- **Progress Tracking** with localStorage persistence
- **Difficulty Filters** (Easy, Medium, Hard)
- **Real-time Search** functionality
- **Dark Mode** support with preference saving
- **Topic-based Organization** with progress bars
- **Learning Roadmap** with structured path
- **Keyboard Shortcuts** for power users

## 🚀 GitHub Pages Deployment

### Step-by-Step Setup

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/yourusername/DSCode.git
   cd DSCode
   ```

2. **Push to Your GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - DSCode platform"
   git branch -M main
   git remote add origin https://github.com/yourusername/DSCode.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in left sidebar)
   - Under **Source**, select `main` branch
   - Select `/ (root)` folder
   - Click **Save**

4. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io/DSCode/`
   - Initial deployment takes 2-5 minutes

### Custom Domain (Optional)

1. Add a file named `CNAME` in the root with your domain:
   ```
   dscode.yourdomain.com
   ```

2. Configure DNS records at your domain provider:
   ```
   Type: CNAME
   Name: dscode
   Value: yourusername.github.io
   ```

## 📁 Project Structure

```
DSCode/
├── index.html          # Main HTML with all problems
├── styles.css          # Styling with dark mode
├── script.js           # Interactive features
└── README.md          # Documentation
```

## 💻 Local Development

**Option 1: Direct File**
```bash
# Simply open index.html in your browser
open index.html  # Mac
start index.html # Windows
```

**Option 2: Local Server**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# Visit: http://localhost:8000
```

## 🎨 Topics Covered

1. 🐍 Python Fundamentals (20 problems)
2. 📊 NumPy & Pandas (25 problems)
3. 📈 Statistics & Probability (20 problems)
4. 🤖 Machine Learning (30 problems)
5. 🧠 Deep Learning (25 problems)
6. 💬 Natural Language Processing (20 problems)
7. 👁️ Computer Vision (18 problems)
8. 🗄️ SQL for Data Science (22 problems)
9. ⚙️ Feature Engineering (15 problems)
10. 🚀 MLOps & Deployment (15 problems)

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + D` - Toggle dark mode

## 🔧 Customization

### Add New Problems

Edit `index.html`:

```html
<div class="problem-item" data-difficulty="medium" data-topic="ml" data-problem-id="ml_new">
    <div class="problem-checkbox">
        <input type="checkbox" id="ml_new">
        <label for="ml_new"></label>
    </div>
    <div class="problem-content">
        <a href="#" class="problem-title">Your Problem Title</a>
        <span class="badge badge-medium">Medium</span>
    </div>
</div>
```

### Change Theme Colors

Edit `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;  /* Change primary color */
    --accent-hover: #2563eb;     /* Change hover color */
}
```

## 🌐 Alternative Deployment

### Netlify
1. Visit [netlify.com](https://netlify.com)
2. Drag & drop the DSCode folder
3. Done! Auto-deploys on updates

### Vercel
1. Visit [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Deploy with one click

## 🛠️ Technologies

- Pure HTML5, CSS3, JavaScript
- No frameworks or dependencies
- LocalStorage for progress tracking
- Google Fonts (Inter)

## 📱 Browser Support

✅ Chrome, Firefox, Safari, Edge (modern versions)
✅ Mobile browsers (iOS/Android)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📋 Future Enhancements

- [ ] Problem solutions/explanations
- [ ] Streak tracking
- [ ] Video tutorials integration
- [ ] Coding playground
- [ ] User authentication
- [ ] Progress sharing

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- Inspired by [NeetCode.io](https://neetcode.io)
- Inspired by [NextLeap.app](https://nextleap.app)
- Font: Inter by Rasmus Andersson

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/DSCode/issues)
- 💡 Feature Requests: Open an issue
- ⭐ Star this repo if you find it helpful!

---

**Made with ❤️ for the Data Science Community**

[Live Demo](https://yourusername.github.io/DSCode/) | [Report Bug](https://github.com/yourusername/DSCode/issues) | [Request Feature](https://github.com/yourusername/DSCode/issues)

