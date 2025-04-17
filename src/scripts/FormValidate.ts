class FormValidation{
    

    formElement = document.querySelector('[data-modal-form]')

    selectors = {
        nameInput: this.formElement?.querySelector<HTMLInputElement>('[data-name-input]'),
        nameRow: this.formElement?.querySelector<HTMLElement>('[data-modal-name-row]'),
        contactInput: this.formElement?.querySelector<HTMLInputElement>('[data-contact-input]'),
        contactRow: this.formElement?.querySelector('[data-modal-contacts-row]'),
        projectTextarea: this.formElement?.querySelector<HTMLTextAreaElement>('[data-modal-project-textarea]'),
        projectRow: this.formElement?.querySelector('[data-modal-project-row]'),
        priceInput: this.formElement?.querySelector<HTMLInputElement>('[data-price-input]'),
        priceRow: this.formElement?.querySelector('[data-modal-price-row]'),
        errorMsg: this.formElement?.querySelector('[data-modal-error]'),
        submitBtn: this.formElement?.querySelector('[data-modal-send]')
    }

    validClasses = {
        valid:'valid',
        invalid: 'invalid',
        invalidRow: 'invalid-row'
    }

    constructor(){
        this.bindClear()
    }

    nameValidation = (input: HTMLInputElement) => {
        console.log('Мы тут были');
        
        if (input.value.trim() === '') {
          return {
            error: 'Заполните поле',
            status: false
          };
        }
        return { status: true };
      };
    
      contactValidation = (input: HTMLInputElement, activeType: string) => {
        const value = input.value.trim();
        
        if (activeType === 'tg') {
            const tgValue = value.split('')
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
          
          const digitsOnly = value.replace(/\D/g, '');
          if (digitsOnly.length < 10) {
            return {
              error: 'Введите корректный номер (не менее 10 цифр)',
              status: false
            };
          }
        }
    
        return { status: true };
      }

      projectValidation = (textarea: HTMLTextAreaElement)=> {
        if(textarea.value.trim() === ''){
            return {
                error: 'Расскажите о себе',
                status: false
            }
        }
        return { status: true }
      }
        
      priceValidation = (input: HTMLInputElement)=>{
        if(input.value.trim() === ''){
            return {
                error: 'Заполните поле',
                status: false,
            }
        }
        return { status: true}
      }

      validate = (type: string) => {
        console.log('Мы и тут были');
        
        if(this.selectors.nameInput && this.selectors.contactInput && this.selectors.priceInput && this.selectors.projectTextarea){
            const validRes =  {
                name: this.nameValidation(this.selectors.nameInput),
                contact: this.contactValidation(this.selectors.contactInput, type),
                project: this.projectValidation(this.selectors.projectTextarea),
                price: this.priceValidation(this.selectors.priceInput),
            }
            type ValidKeys = keyof typeof validRes;
            (Object.keys(validRes) as ValidKeys[]).forEach(key => {
                if (validRes[key].status === false){
                    this.formElement?.classList.add(this.validClasses.invalid)
                }
            })
            if(!validRes.name.status){
                this.selectors.nameRow?.classList.add(this.validClasses.invalidRow) 
                const errorSpan = this.selectors.nameRow?.querySelector<HTMLSpanElement>('[data-modal-row-error-text]')
                
                if (errorSpan && validRes.name.error) {
                    errorSpan.textContent = validRes.name.error;
                  }
            } else {
                this.selectors.nameRow?.classList.remove(this.validClasses.invalidRow)
            }
            if(!validRes.contact.status){
                this.selectors.contactRow?.classList.add(this.validClasses.invalidRow)
                const errorSpan = this.selectors.contactRow?.querySelector<HTMLSpanElement>('[data-modal-row-error-text]');
                
                if (errorSpan && validRes.contact.error) {
                    errorSpan.textContent = validRes.contact.error;
                  }
            } else {
                this.selectors.contactRow?.classList.remove(this.validClasses.invalidRow)
            }
            if(!validRes.project.status){
                this.selectors.projectRow?.classList.add(this.validClasses.invalidRow)
                const errorSpan = this.selectors.projectRow?.querySelector<HTMLSpanElement>('[data-modal-row-error-text]');
                
                if (errorSpan && validRes.project.error) {
                    errorSpan.textContent = validRes.project.error;
                  }
            } else {
                this.selectors.projectRow?.classList.remove(this.validClasses.invalidRow)
            }
            if(!validRes.price.status){
                this.selectors.priceRow?.classList.add(this.validClasses.invalidRow)
                const errorSpan = this.selectors.priceRow?.querySelector<HTMLSpanElement>('[data-modal-row-error-text]');
                
                if (errorSpan && validRes.price.error) {
                    errorSpan.textContent = validRes.price.error;
                  }
            } else {
                this.selectors.priceRow?.classList.remove(this.validClasses.invalidRow)
            }
            return validRes
        }
      
      }
      bindClear = () => {
        this.selectors.contactInput?.addEventListener('input', this.clearRow)
        this.selectors.priceInput?.addEventListener('input', this.clearRow)
        this.selectors.nameInput?.addEventListener('input', this.clearRow)
        this.selectors.projectTextarea?.addEventListener('input', this.clearRow)
      }

      clearRow = (event: any)=> {
        event.target.closest('.modal__row').classList.remove('invalid-row')
      }
}

export const formValidation = new FormValidation()

