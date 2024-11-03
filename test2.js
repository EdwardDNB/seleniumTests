const { Builder, By, until } = require('selenium-webdriver');

// Функція для автоматизації тестування
(async function testDemoStore() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Відкрити головну сторінку
        await driver.get('http://demo-store.seleniumacademy.com');

        // Перехід по всіх сторінках головного меню
        const menuItems = await driver.findElements(By.css('#nav a'));
        for (let item of menuItems) {
            const pageUrl = await item.getAttribute('href');
            await driver.get(pageUrl);
            console.log(`Перехід на сторінку: ${pageUrl}`);
            await driver.sleep(1000); // пауза для навігації між сторінками
        }

        // Реєстрація нового користувача
        await driver.get('http://demo-store.seleniumacademy.com/customer/account/create/');
        await driver.findElement(By.id('firstname')).sendKeys('John');
        await driver.findElement(By.id('lastname')).sendKeys('Doe');
        await driver.findElement(By.id('email_address')).sendKeys(`john.doe${Date.now()}@example.com`);
        await driver.findElement(By.id('password')).sendKeys('Password123');
        await driver.findElement(By.id('confirmation')).sendKeys('Password123');
        await driver.findElement(By.css('button[title="Register"]')).click();

        // Перевірити реєстрацію
        await driver.wait(until.elementLocated(By.css('.welcome-msg')), 5000);
        console.log('Реєстрація успішна');

        // Довільний функціонал - пошук товару
        await driver.get('http://demo-store.seleniumacademy.com');
        await driver.findElement(By.id('search')).sendKeys('phone');
        await driver.findElement(By.css('button[title="Search"]')).click();

        // Перевірка результатів пошуку
        await driver.wait(until.elementLocated(By.css('.category-products')), 5000);
        console.log('Пошук товару успішно завершено');

    } catch (error) {
        console.error(`Помилка під час виконання: ${error}`);
    } finally {
        await driver.quit();
    }
})();
