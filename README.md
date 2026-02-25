# FoodLoop <!-- omit in toc -->

- [Project Structure](#project-structure)
- [My Project Links](#my-project-links)
  - [Semester Project](#semester-project)
  - [Semester Assignments](#semester-assignments)

## Project Structure

- **`/`**: The source code of your main project
- **`/assignments`**: Results of your semester assignments
- **`/docs`**: If using GitHub for documentation (e.g., your final report in Markdown format)

## My Project Links


### Semester Project

- Link to production version: [**Production Version**](https://food-loop-tau.vercel.app/) <!-- Replace with actual URL -->
- Link to final report: [**Final Report**](https://github.com/tonizulim/FoodLoop/blob/main/final_report.md) <!-- Replace with actual URL -->

Test accounts:
- bobis@split.hr - Bobis123!
- kampus.menza@split.hr - Kampus123!
- fastfood.popeye@split.hr - Popeye123!
- konoba.fife@split.hr - Fife123!
- villa.spiza@split.hr - Villa123!
- kantun.paulina@split.hr - Kantun123!
- grill.masal@split.hr - Maslina123!
- pizzeria.gust@split.hr - Gust123!
- restaurant.dvor@split.hr - Dvor123!
- babic@split.hr - Babic123!
- tommy@split.hr - Tommy123!

### Semester Assignments

- Link to Assignment 1: [**Assignment 1**](https://github.com/tonizulim/FoodLoop/blob/main/assignments/1_assignment.md)
- Link to Assignment 2: [**Assignment 2**](https://github.com/tonizulim/FoodLoop/blob/main/assignments/2_assignment.md)
- Link to Assignment 3: [**Assignment 3**](https://github.com/tonizulim/FoodLoop/blob/main/assignments/3_assignment.md)
- Link to Assignment 4: [**Assignment 4**](https://github.com/tonizulim/FoodLoop/blob/main/assignments/4_assignment.md)
- Link to Assignment 5: [**Assignment 5**](https://github.com/tonizulim/FoodLoop/blob/main/assignments/5_assignment.md)

Live at: https://food-loop-tau.vercel.app/

## FoodLoop Description

FoodShare is a web application for sharing food within your local community.
Users can post available food, browse listings on a map, and admins can manage users and listings.

The application is built with Next.js App Router, Better Auth for authentication, Supabase for storage, and PostgreSQL (Drizzle ORM) as the main database.

### 🛠️ Technologies

- Next.js 14 (App Router)
- TypeScript
- Better Auth – Authentication & sessions
- Supabase – Storage and auxiliary services
- PostgreSQL + Drizzle ORM – Main database
- Tailwind CSS + shadcn/ui – Styling

### 📦 Prerequisites

Before running the application, make sure you have:
- Node.js 18+
- npm / pnpm / yarn
- PostgreSQL database
- Supabase project (optional: local or remote)

### ⚙️ Installation

Clone the repository:

- git clone https://github.com/tonizulim/FoodLoop.git
- cd foodshare

Install dependencies:

- npm install or pnpm install

### 🔐 Environment Variables

Create a .env.local file in the root and fill it according to the example below:

- DATABASE_URL / DATABASE_URI – PostgreSQL connection string (used for Drizzle and backend)
- NEXT_PUBLIC_SUPABASE_URL – Your Supabase project URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY – Public anon key for client-side
- SUPABASE_SERVICE_ROLE_KEY – Service role key (server-side only)
- NEXT_PUBLIC_SUPABASE_ANON_KEY 
- NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
- BETTER_AUTH_SECRET – Secret key for Better Auth (random string)
- BETTER_AUTH_URL – Base URL of the application (local: http://localhost:3000)


### 🗄️ Database

The database schema and migrations are defined using Drizzle ORM.

Typical commands if using Drizzle CLI:

- npx drizzle-kit generate
- npx drizzle-kit migrate

### ▶️ Running the Application

For development:

- npm run dev

The app will be available at:

http://localhost:3000

## Project Requirements

### Web Application Requirements

- [ ] The application will be used from a web browser
- [ ] It will be accessible on devices of different sizes
- [ ] Users can search/filter products or services
- [ ] The application will support user login for showing private content
- [ ] One of the public pages will be a blog containing multiple posts with diverse content (images, videos, code snippets)
- [ ] Part of the application's content will be stored in a remote headless CMS system

### Project Demonstration

- [ ] Show the production version of the project or produce a video demonstrating the above requirements
- [ ] The production version will be deployed online (on an appropriate cloud platform [Vercel](https://vercel.com), [Netlify](https://www.netlify.com/) or personal VPS)
- [ ] Conduct usablity evaluation of your web application
- [ ] Analyze the application's performance ([PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] The analysis results will be part of the final report
