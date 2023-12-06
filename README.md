# Angular Frontend for Analytics Dashboard

This project serves as the frontend for an analytics dashboard that interfaces with a simple "Hello World" API. The API collects logs based on user interactions, which are then visualized through the dashboard.

## Overview

The analytics dashboard comprises several key components:

- **Hello World API**: A basic API that accepts a User ID and generates logs used for analytics.
- **Analytics Dashboard**: A frontend application built using Angular that visualizes data from the API logs.

## Features

The dashboard offers the following functionalities:

- **Time Filter**: Allows users to filter data based on time intervals such as the last 24 hours, last 7 days, or a custom range.
- **Total Unique Users**: Displays the count of unique users who accessed the API within the selected time frame.
- **Total Calls**: Indicates the total number of API calls made during the specified period.
- **Total Failures**: Highlights the count of failed API calls within the chosen time interval.
- **Graphical Representation**: Presents a graph showcasing the trends of users, calls, and failures over the selected time range.
- **Log Table**: Displays logs sorted by timestamp, showing User ID, Timestamp, Status, Error message (if applicable), Request, and Response.

## Tech Stack

- **Frontend Framework**: Angular
- **Backend Language**: Java - Spring Boot - https://github.com/hritikchaudhary/dadc

## Setup and Usage

### Development
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Execute `ng serve` for a development server.
5. Open your browser and navigate to `http://localhost:4200/` to view the dashboard.

### Production
To build the project for production:
1. Run `ng build --prod` to generate the production build.
2. The production-ready files will be available in the `dist/` directory.
3. Host these files on your preferred hosting service or server.
