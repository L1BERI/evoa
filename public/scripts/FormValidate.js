var FormValidation = /** @class */ (function () {
    function FormValidation() {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.formElement = document.querySelector('[data-modal-form]');
        this.selectors = {
            nameInput: (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.querySelector('[data-name-input]'),
            nameRow: (_b = this.formElement) === null || _b === void 0 ? void 0 : _b.querySelector('[data-modal-name-row]'),
            contactInput: (_c = this.formElement) === null || _c === void 0 ? void 0 : _c.querySelector('[data-contact-input]'),
            contactRow: (_d = this.formElement) === null || _d === void 0 ? void 0 : _d.querySelector('[data-modal-contacts-row]'),
            projectTextarea: (_e = this.formElement) === null || _e === void 0 ? void 0 : _e.querySelector('[data-modal-project-textarea]'),
            projectRow: (_f = this.formElement) === null || _f === void 0 ? void 0 : _f.querySelector('[data-modal-project-row]'),
            priceInput: (_g = this.formElement) === null || _g === void 0 ? void 0 : _g.querySelector('[data-price-input]'),
            priceRow: (_h = this.formElement) === null || _h === void 0 ? void 0 : _h.querySelector('[data-modal-price-row]'),
            errorMsg: (_j = this.formElement) === null || _j === void 0 ? void 0 : _j.querySelector('[data-modal-error]'),
            submitBtn: (_k = this.formElement) === null || _k === void 0 ? void 0 : _k.querySelector('[data-modal-send]')
        };
        this.validClasses = {
            valid: 'valid',
            invalid: 'invalid',
            invalidRow: 'invalid-row'
        };
        this.nameValidation = function (input) {
            console.log('Мы тут были');
            if (input.value.trim() === '') {
                return {
                    error: 'Заполните поле',
                    status: false
                };
            }
            return { status: true };
        };
        this.contactValidation = function (input, activeType) {
            var value = input.value.trim();
            if (activeType === 'tg') {
                var tgValue = value.split('');
                if (tgValue.length <= 1) {
                    return {
                        error: 'Заполните поле',
                        status: false
                    };
                }
                if (!value.startsWith('@')) {
                    return {
                        error: 'Ник в Telegram должен начинаться с @',
                        status: false
                    };
                }
            }
            else if (activeType === 'mail') {
                if (value === '') {
                    return {
                        error: 'Заполните поле',
                        status: false
                    };
                }
                if (!value.includes('@')) {
                    return {
                        error: 'Вероятно, вы забыли @',
                        status: false
                    };
                }
            }
            else if (activeType === 'phone') {
                var digitsOnly = value.replace(/\D/g, '');
                if (digitsOnly.length < 10) {
                    return {
                        error: 'Введите корректный номер (не менее 10 цифр)',
                        status: false
                    };
                }
            }
            return { status: true };
        };
        this.projectValidation = function (textarea) {
            if (textarea.value.trim() === '') {
                return {
                    error: 'Расскажите о себе',
                    status: false
                };
            }
            return { status: true };
        };
        this.priceValidation = function (input) {
            if (input.value.trim() === '') {
                return {
                    error: 'Заполните поле',
                    status: false,
                };
            }
            return { status: true };
        };
        this.validate = function (type) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            console.log('Мы и тут были');
            if (_this.selectors.nameInput && _this.selectors.contactInput && _this.selectors.priceInput && _this.selectors.projectTextarea) {
                var validRes_1 = {
                    name: _this.nameValidation(_this.selectors.nameInput),
                    contact: _this.contactValidation(_this.selectors.contactInput, type),
                    project: _this.projectValidation(_this.selectors.projectTextarea),
                    price: _this.priceValidation(_this.selectors.priceInput),
                };
                Object.keys(validRes_1).forEach(function (key) {
                    var _a;
                    if (validRes_1[key].status === false) {
                        (_a = _this.formElement) === null || _a === void 0 ? void 0 : _a.classList.add(_this.validClasses.invalid);
                    }
                });
                if (!validRes_1.name.status) {
                    (_a = _this.selectors.nameRow) === null || _a === void 0 ? void 0 : _a.classList.add(_this.validClasses.invalidRow);
                    var errorSpan = (_b = _this.selectors.nameRow) === null || _b === void 0 ? void 0 : _b.querySelector('[data-modal-row-error-text]');
                    if (errorSpan && validRes_1.name.error) {
                        errorSpan.textContent = validRes_1.name.error;
                    }
                }
                else {
                    (_c = _this.selectors.nameRow) === null || _c === void 0 ? void 0 : _c.classList.remove(_this.validClasses.invalidRow);
                }
                if (!validRes_1.contact.status) {
                    (_d = _this.selectors.contactRow) === null || _d === void 0 ? void 0 : _d.classList.add(_this.validClasses.invalidRow);
                    var errorSpan = (_e = _this.selectors.contactRow) === null || _e === void 0 ? void 0 : _e.querySelector('[data-modal-row-error-text]');
                    if (errorSpan && validRes_1.contact.error) {
                        errorSpan.textContent = validRes_1.contact.error;
                    }
                }
                else {
                    (_f = _this.selectors.contactRow) === null || _f === void 0 ? void 0 : _f.classList.remove(_this.validClasses.invalidRow);
                }
                if (!validRes_1.project.status) {
                    (_g = _this.selectors.projectRow) === null || _g === void 0 ? void 0 : _g.classList.add(_this.validClasses.invalidRow);
                    var errorSpan = (_h = _this.selectors.projectRow) === null || _h === void 0 ? void 0 : _h.querySelector('[data-modal-row-error-text]');
                    if (errorSpan && validRes_1.project.error) {
                        errorSpan.textContent = validRes_1.project.error;
                    }
                }
                else {
                    (_j = _this.selectors.projectRow) === null || _j === void 0 ? void 0 : _j.classList.remove(_this.validClasses.invalidRow);
                }
                if (!validRes_1.price.status) {
                    (_k = _this.selectors.priceRow) === null || _k === void 0 ? void 0 : _k.classList.add(_this.validClasses.invalidRow);
                    var errorSpan = (_l = _this.selectors.priceRow) === null || _l === void 0 ? void 0 : _l.querySelector('[data-modal-row-error-text]');
                    if (errorSpan && validRes_1.price.error) {
                        errorSpan.textContent = validRes_1.price.error;
                    }
                }
                else {
                    (_m = _this.selectors.priceRow) === null || _m === void 0 ? void 0 : _m.classList.remove(_this.validClasses.invalidRow);
                }
                return validRes_1;
            }
        };
        this.bindClear = function () {
            var _a, _b, _c, _d;
            (_a = _this.selectors.contactInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', _this.clearRow);
            (_b = _this.selectors.priceInput) === null || _b === void 0 ? void 0 : _b.addEventListener('input', _this.clearRow);
            (_c = _this.selectors.nameInput) === null || _c === void 0 ? void 0 : _c.addEventListener('input', _this.clearRow);
            (_d = _this.selectors.projectTextarea) === null || _d === void 0 ? void 0 : _d.addEventListener('input', _this.clearRow);
        };
        this.clearRow = function (event) {
            event.target.closest('.modal__row').classList.remove('invalid-row');
        };
        this.bindClear();
    }
    return FormValidation;
}());
export var formValidation = new FormValidation();
