const myFunctions = require('./stock_portfolio.js');

//Testing creation of stock portfolio object
test('Testing creation', () => {
    const target = {};
    let person = new myFunctions.StockPortfolio();
    const result = person.portfolio;
    expect(target).toEqual(result);
});