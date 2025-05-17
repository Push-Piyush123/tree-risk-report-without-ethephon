# 🌴 Tree Risk Reporter - Design Thinking Project

## 📌 Overview

**Tree Risk Reporter** is a responsive and user-friendly web application developed as part of a **Design Thinking Project**. It empowers students and faculty to report **unsafe coconut trees** on campus, and allows administrators to **track risks**, **take action**, and **record Ethephon treatments** to prevent coconut formation and accidents.

---

## 💡 Problem Statement

> Falling coconuts and branches from coconut trees on campus pose a safety risk to students and faculty. 

---

## ✅ Our Solution

I developed a  digital solution:

1. **Risk Reporting System** – Allows users to report unsafe trees with images and locations.


---

## 🧑‍💻 Features

## 📁 Features

- 🔍 **Risk Filter Dropdown** — View all reports, risky trees, or safe trees.
- 📷 **Base64 Image Preview** — Visual display of tree condition from user-uploaded image.
- ✅ **Mark "Action Taken"** — Admins can update tree reports with a click.
- 📅 **Timestamp Tracking** — Automatically logs date when action is taken.
- 🧭 **Two Dashboard Views**:
  - **Risky Tree Dashboard** — Shows only reports marked as risky.
  - **Action Taken Dashboard** — Lists risky reports that have had action taken.
- 🚫 Safe tree reports show `"Action: Not Required"`.

## 🛠️ Technologies Used

- Supabase (PostgreSQL + Auth + Storage)
- JavaScript (ES modules)
- HTML/CSS
- Font Awesome for icons

---

## 🛠️ Technologies Used

| Technology    | Purpose                        |
|---------------|--------------------------------|
| **HTML/CSS**  | Frontend structure & styling   |
| **JavaScript**| Frontend interactivity         |
| **Supabase**  | Authentication & database      |
| **FontAwesome**| Icons and visuals             |

---

## 📁 Project Structure
📦 tree-risk-reporter/

├── 📄 index.html # Main user interface for reporting tree risks

├── 📄 admin.html # Admin dashboard for managing reports and treatments

├── 📄 admin.js # Admin dashboard logic (Supabase queries, UI updates)

├── 📄 index.js # User-side logic (report submission)

├── 📄 admin.css # Styling for admin dashboard

├── 📄 style.css # Styling for index page

├── 📄 README.md # Project overview and documentation

