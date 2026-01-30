# CheapestCarInsurance - Claude Code Context

## Project Overview
CheapestCarInsurance is a consumer-facing auto insurance comparison and lead generation site. Part of the Quotely family of insurance properties.

**Founder**: Dustin Wyzard
**Tech Stack**: React 18, TypeScript, Vite, TailwindCSS, Vercel

---

## Project Awareness & Context

### Documentation is Source of Truth
- Your knowledge is out of date. Always use fresh documentation
- Check `/research/` directory for scraped documentation
- Read `PLANNING.md` at start of conversations if it exists

### Project Structure
```
CheapestCarInsurance/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   └── utils/          # Utilities
├── public/             # Static assets
├── .claude/            # Claude Code config
├── PRPs/               # Product Requirements Prompts
├── examples/           # Code patterns
└── research/           # Documentation
```

---

## Code Standards

### TypeScript/React Conventions
- Functional components with TypeScript
- Proper type annotations
- React 18 patterns

### Styling
- TailwindCSS for all styling
- Mobile-first responsive design
- Insurance-industry appropriate colors (trust, security)

### File Organization
- **Never create a file longer than 500 lines**
- Group by feature or responsibility

---

## Insurance Industry Context

### CRITICAL COMPLIANCE REQUIREMENTS
- NO guaranteed savings claims ("Save up to X%" requires substantiation)
- NO misleading coverage promises
- Proper state-specific disclaimers
- Clear disclosure of lead generation nature
- No false urgency tactics

### Content Guidelines
- Focus on education and comparison
- Honest about the quote process
- Clear call-to-actions
- Trust signals (security badges, testimonials with permission)

### SEO Focus
- Target "cheap car insurance" and related keywords
- Proper schema markup for insurance content
- Fast loading for mobile users
- Local SEO for state-specific pages

---

## Development Workflow

### Validation Commands
```bash
npm run lint
npm run type-check
npm run build
npm run dev
```

### Deployment
- Vercel deployment
- Check `vercel.json` for configuration

---

## AI Behavior Rules

1. **Insurance compliance first** - never write misleading claims
2. **Never assume missing context** - ask questions
3. **Follow existing patterns** - check examples/
4. **Mobile-first design** - critical for insurance shoppers
5. **SEO optimized** - every page needs proper meta

---

## Related Projects
- `quotely-platform` - Main quoting platform
- `WyzIns` - Sister insurance site
- `quotely.info` - Quotely marketing site
