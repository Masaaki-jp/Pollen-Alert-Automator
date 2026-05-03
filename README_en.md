# 😷 Pollen Alert Automator (GAS × Google Pollen API)

This is a Google Apps Script (GAS) that utilizes the Google Pollen API to automatically check the daily pollen forecast. 
It automatically registers an alert in your Google Calendar only on days when the pollen level exceeds your **personal sensitivity threshold**.

## ✨ Features

- **Fully Automated**: Runs automatically every morning via a GAS time-driven trigger, allowing you to decide on allergy countermeasures just by checking your calendar.
- **Personalized Threshold Setting**: Instead of relying on general "High/Low" indicators, you can set a specific notification level (`PERSONAL_THRESHOLD`) that matches your own body's sensitivity.
- **Serverless**: No need to build a server. Anyone with a Google account and a web browser can run this for free.

## 🚀 Setup

### 1. Prerequisites
To run this script, you will need the following three things:
1. **Google Cloud API Key**: Create a project in the [Google Cloud Console](https://console.cloud.google.com/), enable the `Pollen API`, and generate an API key.
2. **Google Calendar ID**: Keep the ID of the calendar where you want the alerts registered (usually your Gmail address).
3. **Latitude & Longitude**: Get the latitude and longitude of the location you want to monitor (e.g., your home or office) using Google Maps or a similar service.

### 2. GAS Installation
1. Create a new [Google Apps Script] project from your Google Drive.
2. Copy and paste the code from this repository into `Code.gs`.
3. Update the initial settings (variables) at the top of the code to match your environment.

```javascript
const API_KEY = 'YOUR_API_KEY';
const LAT = 35.5824;  // Latitude of the target location
const LNG = 139.6627; // Longitude of the target location
const CALENDAR_ID = 'your_email@gmail.com'; 
const PERSONAL_THRESHOLD = 1; // Set according to your sensitivity (0~5)
```
3. Tuning the Threshold (PERSONAL_THRESHOLD)
Set the value according to the severity of your hay fever/pollen allergy:

0: None

1: Very Low (Recommended for highly sensitive people who want alerts even for trace amounts)

2: Low

3: Moderate

4: High

5: Very High (Recommended for those who only want to be warned on severe days)

4. Setting the Trigger
From the left menu in the GAS editor, click the "Clock" icon (Triggers) and configure as follows:

Choose which function to run: checkPollenAndAlert

Select event source: Time-driven

Select type of time based trigger: Day timer

Select time of day: 5am to 6am (or your preferred morning time)

Note: Upon the first execution, a Google authorization popup will appear. Click "Advanced" -> "Go to (unsafe)" to grant the necessary permissions.
