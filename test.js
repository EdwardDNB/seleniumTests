const { Builder, By, Key, until } = require('selenium-webdriver');
const math = require('mathjs'); // Використовуємо mathjs для обчислень

(async function example() {
    // Створюємо новий екземпляр браузера
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Відкриваємо сторінку
        await driver.get('http://suninjuly.github.io/math.html');

        // Читаємо значення змінної x
        let xElement = await driver.findElement(By.id('input_value'));
        let x = await xElement.getText();

        // Обчислюємо математичну функцію від x
        let answer = String(math.log(Math.abs(12 * Math.sin(Number(x)))));

        // Вводимо відповідь в текстове поле
        let answerField = await driver.findElement(By.id('answer'));
        await answerField.sendKeys(answer);

        // Вибираємо checkbox "I'm the robot"
        let checkbox = await driver.findElement(By.id('robotCheckbox'));
        await checkbox.click();

        // Вибираємо radiobutton "Robots rule!"
        let radiobutton = await driver.findElement(By.id('robotsRule'));
        await radiobutton.click();

        // Натискаємо кнопку Submit
        let submitButton = await driver.findElement(By.css('button.btn-default'));
        await submitButton.click();

        // Затримка для перегляду результату перед закриттям
        await driver.sleep(5000);

    } finally {
        // Закриваємо браузер
        await driver.quit();
    }
})();
