import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  private systemErrors = {
    1: 'Что-то пошло не так. Обратитесь к разработчику!',
    422: 'Неверные данные'
  };

  constructor(private snackBar: MatSnackBar) { }

  public show(text: string, options = null) {
    this.snackBar.open(text, options.action, {
      duration: 3000,
    });
  }

  public success(text: string, options = {}) {
    this.show(text, {...options, type: 'success'});
  }

  public info(text: string, options = {}) {
    this.show(text, {...options, type: 'info'});
  }

  public danger(text: string, options = {}) {
    this.show(text, {...options, type: 'danger'});
  }

  public error(text: string, options = {}) {
    this.show(text, {...options, type: 'danger'});
  }

  public wrapPromise(
    promise: Promise<any>,
    successMessage: string,
    errorMessage: string = 'Что-то пошло не так!',
    customErrors: {[key: string]: any} = {}
  ): Promise<any> {
    customErrors = {...this.systemErrors, ...customErrors};

    return promise
      .then((res) => {
        this.success(successMessage);
        return res;
      }).catch((e) => {
        const error_code = e.error && e.error.code,
          handler = error_code && customErrors[error_code];

        if (handler) {
          errorMessage = typeof handler === 'function' ?
            handler(error_code) :
            handler;
        }

        errorMessage &&
          this.error(errorMessage);

        throw e;
      });
  }
}
