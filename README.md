# Stock Data Scraper

The Stock Data Scraper is a web-based application that allows users to input stock symbols, select a timeframe, and retrieve historical stock price data. The application can also export the data to a CSV file for further analysis.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)

## Features

- **Search Stock Symbols:** As you type in the stock symbol input, a dropdown of matching stock symbols appears for easy selection.
- **Select Time Frame:** Choose the number of days for which you want to scrape stock data.
- **Retrieve Stock Data:** Fetch stock price data using the Alpha Vantage API.
- **Export to CSV:** Download the retrieved data as a CSV file for further analysis.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jye-trudel/information-stocks.git
   cd information-stocks

## Usage

Open index.html in a Web Browser:

Use any modern web browser to open index.html and start using the application.
Set up the API Key:

Replace the apiKey variable in script.js with your own Alpha Vantage API key.
Usage
Enter Stock Symbol:

Type the stock symbol into the input box. A dropdown will suggest matching symbols.
Select Time Frame:

Choose how many days of data you want to scrape from the dropdown menu.
Scrape Data:

Click the "Scrape Data" button to retrieve the historical stock prices.
View and Export Data:

The results will be displayed on the page. Click "Export to CSV" to download the data.


## Technologies
- **HTML/CSS:** For the structure and styling of the web application.
- **JavaScript:** For handling user interactions and data fetching.
- **Alpha Vantage API:** To fetch historical stock price data.


### Additional Suggestions

- **API Key:** Ensure you have an Alpha Vantage API key, as the code makes requests to this API.
- **Browser Compatibility:** Tested on Google Chrome, minimal tests conducted on alternative browsers.
- **Security:** please be mindful about using this tool and tools alike. also canot be used for profit purposes.


