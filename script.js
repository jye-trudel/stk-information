

document.addEventListener('DOMContentLoaded', () => {
    const stockInput = document.getElementById('stock');
    const stockDropdown = document.getElementById('stock-dropdown');
    const scrapeButton = document.getElementById('scrape-button');
    const resultsDiv = document.getElementById('results');
    const timeframeSelect = document.getElementById('timeframe');


    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Days`;
        timeframeSelect.appendChild(option);
    }

    stockInput.addEventListener('input', handleStockSearch);
    stockInput.addEventListener('focus', () => {
        stockDropdown.style.display = 'block';
    });

    document.addEventListener('click', (event) => {
        if (!stockInput.contains(event.target) && !stockDropdown.contains(event.target)) {
            stockDropdown.style.display = 'none';
        }
    });

    scrapeButton.addEventListener('click', handleScrapeData);
    document.getElementById('export-button').addEventListener('click', exportToCSV);

    async function handleStockSearch(event) {
        const query = event.target.value;
        if (query.length < 2) {
            stockDropdown.style.display = 'none';
            return;
        }

        const stocks = await fetchStockSuggestions(query);
        stockDropdown.innerHTML = stocks.map(stock => `<div>${stock}</div>`).join('');
        stockDropdown.style.display = 'block';
        
        stockDropdown.querySelectorAll('div').forEach(item => {
            item.addEventListener('click', () => {
                stockInput.value = item.textContent;
                stockDropdown.style.display = 'none';
            });
        });
    }

    async function fetchStockSuggestions(query) {
//test function pull from api
        const availableStocks = [
            'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA',
            'NFLX', 'NVDA', 'BABA', 'ORCL', 'INTC', 'CSCO',
            'ADBE', 'PYPL', 'UBER', 'LYFT', 'SQ', 'SNAP',
            'SHOP', 'ZM', 'TWTR', 'PINS', 'SPOT', 'ROKU'
        ];
        return availableStocks.filter(stock => stock.toLowerCase().includes(query.toLowerCase()));
    }

    async function handleScrapeData() {
        const stock = stockInput.value.trim().toUpperCase();
        const days = parseInt(timeframeSelect.value);
        if (!stock || isNaN(days)) {
            alert('Please enter a valid stock and timeframe.');
            return;
        }

        const prices = await scrapeStockData(stock, days);
        displayResults(prices);
    }

    async function scrapeStockData(stock, days) {
        const apiKey = 'REPLACE WITH VANTAGE API KEY';
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=60min&apikey=${apiKey}`);
        const data = await response.json();
    
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
    
        const series = data['Time Series (60min)'];
        const prices = [];
    
        Object.keys(series).forEach(timestamp => {
            if (prices.length < days * 24) {
                const time = timestamp;
                const price = parseFloat(series[timestamp]['4. close']);
                prices.push({ time, price });
            }
        });
    
        return prices;
    }
    
    function displayResults(prices) {
        resultsDiv.innerHTML = prices.map(price => `<div>${price.time}: $${price.price.toFixed(2)}</div>`).join('');
    }

    async function exportToCSV() {
        const stock = stockInput.value.trim().toUpperCase();
        const days = parseInt(timeframeSelect.value);
        if (!stock || isNaN(days)) {
            alert('Please enter a valid stock and timeframe.');
            return;
        }
    
        const prices = await scrapeStockData(stock, days);
        downloadCSV(prices, `${stock}_prices.csv`);
    }
    
    function downloadCSV(data, filename) {
        const csv = data.map(row => Object.values(row).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
});
