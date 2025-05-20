document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    const input1Field = document.getElementById('input1');
    const input2Field = document.getElementById('input2');
    const digitButtons = document.querySelectorAll('.digit-button');
    const operatorButtons = document.querySelectorAll('.operator-button');
    const calculateButton = document.getElementById('calculate-button');
    const clearButton = document.getElementById('clear-button');
    const backButton = document.getElementById('back-button'); // Получаем кнопку "Назад"

    let currentOperation = null;
    let activeInput = input1Field;

    // Изначально помечаем input1 как активное
    activeInput.classList.add('active');

    // Функция для сброса состояния
    const resetCalculator = () => {
        input1Field.value = '0';
        input2Field.value = '0';
        resultDisplay.value = '';
        resultDisplay.classList.remove('red-background');
        currentOperation = null;
        activeInput.classList.remove('active');
        activeInput = input1Field;
        activeInput.classList.add('active');
    };

    // Обработчики для переключения активного поля ввода при клике
    input1Field.addEventListener('click', () => {
        if (activeInput !== input1Field) {
            activeInput.classList.remove('active');
            activeInput = input1Field;
            activeInput.classList.add('active');
            // При переключении на input1, сбросим операцию
            currentOperation = null;
        }
         // Очищаем поле результата при начале ввода нового числа
        resultDisplay.value = '';
        resultDisplay.classList.remove('red-background');
    });

    input2Field.addEventListener('click', () => {
         if (activeInput !== input2Field) {
            activeInput.classList.remove('active');
            activeInput = input2Field;
            activeInput.classList.add('active');
         }
          // Очищаем поле результата при начале ввода нового числа
         resultDisplay.value = '';
         resultDisplay.classList.remove('red-background');
    });


    // Добавляем обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.textContent;

            // Если в активном поле "0" и вводим не точку, заменяем "0"
            if (activeInput.value === '0' && digit !== '.') {
                activeInput.value = digit;
            }
             // Если в активном поле не "0", просто добавляем цифру
             else if (activeInput.value !== '0') {
                 // Проверяем, чтобы не вводить несколько точек (если точка добавлена в дизайн)
                 // if (digit === '.' && activeInput.value.includes('.')) {
                 //     return;
                 // }
                activeInput.value += digit;
            } else if (digit === '.' && !activeInput.value.includes('.')) {
                 // Особый случай для точки, если начинаем с 0
                 activeInput.value += digit;
            }


             // Очищаем поле результата при начале ввода нового числа
            resultDisplay.value = '';
            resultDisplay.classList.remove('red-background');
        });
    });

    // Добавляем обработчики для кнопок операций
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Сохраняем операцию, только если input1 не пуст (или не "0")
             // Это предотвращает выбор операции без первого числа
            // if (parseFloat(input1Field.value) !== 0 || input1Field.value === '0') { // Или просто if(input1Field.value !== '')
                 currentOperation = button.dataset.operator; // Получаем оператор из data-атрибута
                 // Переключаем активное поле на input2 после выбора операции
                 activeInput.classList.remove('active');
                 activeInput = input2Field;
                 activeInput.classList.add('active');
                  // Очищаем поле результата
                 resultDisplay.value = '';
                 resultDisplay.classList.remove('red-background');
             // } else {
             //     // Опционально: показать сообщение об ошибке или игнорировать нажатие
             //     console.log("Введите первое число перед выбором операции.");
             // }
        });
    });

    // Обработчик для кнопки "Посчитать" (=)
    calculateButton.addEventListener('click', () => {
        const num1 = parseFloat(input1Field.value);
        const num2 = parseFloat(input2Field.value);

        // Проверяем, выбрана ли операция и являются ли введенные значения числами
        if (currentOperation === null || isNaN(num1) || isNaN(num2)) {
            resultDisplay.value = 'Ошибка ввода'; // Более явное сообщение об ошибке
            resultDisplay.classList.remove('red-background');
            // Не сбрасываем поля ввода при ошибке ввода, чтобы пользователь мог исправить
            return;
        }

        let result;
        switch (currentOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    resultDisplay.value = 'Деление на 0';
                    resultDisplay.classList.remove('red-background');
                     // Опционально: сбросить поля ввода или только результат
                    input2Field.value = '0'; // Сбросим только второй ввод
                    activeInput.classList.remove('active');
                    activeInput = input2Field; // Остаемся на втором вводе для исправления
                    activeInput.classList.add('active');
                    return;
                }
                result = num1 / num2;
                break;
            default:
                resultDisplay.value = 'Ошибка операции';
                resultDisplay.classList.remove('red-background');
                resetCalculator(); // Сбросить при неизвестной операции
                return;
        }

         // Округлим результат до разумного количества знаков после запятой, если есть
         if (result % 1 !== 0) { // Если число не целое
             result = parseFloat(result.toFixed(6)); // Округляем до 6 знаков
         }


        // Проверяем условие "число > 15"
        if (result > 15) {
            resultDisplay.value = 'число>15';
            resultDisplay.classList.add('red-background');
        } else {
            resultDisplay.value = result; // Отображаем число
            resultDisplay.classList.remove('red-background');
        }

        // Сброс состояния после вычисления
         input1Field.value = resultDisplay.value; // Оставляем результат в input1 для возможных дальнейших операций
         if (result > 15) { // Если результат был "число>15", не оставляем его как число в input1
             input1Field.value = '0';
         } else {
             input1Field.value = result;
         }
         input2Field.value = '0'; // Сбрасываем второй ввод
         currentOperation = null; // Сбрасываем операцию
         activeInput.classList.remove('active');
         activeInput = input1Field; // Снова делаем input1 активным
         activeInput.classList.add('active');
    });

    // Обработчик для кнопки "Очистить" (C)
    clearButton.addEventListener('click', () => {
        resetCalculator();
    });

    // Обработчик для кнопки "Назад" (←)
    backButton.addEventListener('click', () => {
        let currentValue = activeInput.value;

        if (currentValue.length > 1 && currentValue !== 'Ошибка ввода' && currentValue !== 'Деление на 0') {
            // Удаляем последний символ
            activeInput.value = currentValue.slice(0, -1);
        } else if (currentValue.length === 1 && currentValue !== '0') {
            // Если остался один символ (не 0), ставим 0
            activeInput.value = '0';
        } else if (currentValue === 'Ошибка ввода' || currentValue === 'Деление на 0' || resultDisplay.value === 'число>15') {
             // Если в поле ошибка или "число>15", сбрасываем его
             if (activeInput.value === 'Ошибка ввода' || activeInput.value === 'Деление на 0') {
                 activeInput.value = '0';
             }
             // Если в результате "число>15" и мы на input1 (куда мог быть скопирован результат)
             if (resultDisplay.value === 'число>15') {
                  resultDisplay.value = '';
                  resultDisplay.classList.remove('red-background');
             }
        }
        // Если уже 0 или пусто, ничего не делаем

        // Очищаем поле результата при удалении символа из ввода
        resultDisplay.value = '';
        resultDisplay.classList.remove('red-background');
    });


    // Инициализируем поля ввода нулем при загрузке
    resetCalculator();

});