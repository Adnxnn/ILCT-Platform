
---

# ILCT Platform

## Overview

The ILCT Platform is a collaborative online tool designed to enhance interactive learning and communication within educational or professional settings. It provides users with a range of features, including real-time collaboration tools and session management, all organized within channel-based structures.

## Features

- **Channel-Based Organization:** 
  - Organize discussions, projects, or classes into distinct channels, each with access to various collaborative tools.

- **Jamboard:**
  - A real-time collaborative whiteboard where users can write code, brainstorm, or take notes. Every keystroke is visible to all users within the same channel.
  - **Session Management:** Save, rename, and delete Jamboard sessions for easy access and continuity.

- **Interactive Tools:**
  - Additional tools like notes sections and other interactive components are available within each channel to support diverse collaboration needs.

## Technology Stack

- **Frontend:** React, Material UI
- **Backend:** Node.js
- **Database:** MySQL
- **Real-time Communication:** Socket.io (presumed based on real-time Jamboard features)
- **State Management:** React Context API for managing the `selectedChannel` and other global states.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ilct-platform.git
   cd ilct-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory and add your environment variables.
   
4. **Start the development server:**
   ```bash
   npm start
   ```

## Usage

1. **Channels:**
   - Create or join channels to organize your projects, discussions, or classes.

2. **Jamboard:**
   - Use the Jamboard for real-time collaboration. Save sessions and manage them with options to rename or delete.

3. **Other Tools:**
   - Explore the other interactive tools available within each channel.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

---
