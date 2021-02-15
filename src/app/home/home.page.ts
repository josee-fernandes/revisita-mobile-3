import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  firstValue:number = 0;
  secondValue:number = 0;
  result:string = '0';
  operation:string = '';
  concat:string = '';
  pos:number = 0;

  constructor() {}


  // Concatena os números e o ponto para se tornar de fato um valor numérico depois. '1' + '.' + '2' = '1.2' = 1.2

  number(number:string){
      this.concat += number;
      
      if(this.result == '0' || this.pos == 1)
        this.result = number;
      else
        this.result += number;
  }


  // Define os valores para cálculo

  setValue(){
    if(this.pos === 0){
      this.firstValue = parseFloat(this.concat);
      this.pos = 1;
    }
    else
      this.secondValue = parseFloat(this.concat);
    this.concat = '';
  }


  // Definem operação e o primeiro valor

  divide(){
    this.operation = 'divide';
    this.setValue();
  }

  multiply(){
    this.operation = 'multiply';
    this.setValue();
  }

  subtract(){
    this.operation = 'subtract';
    this.setValue();
  }
  
  sum(){
    this.operation = 'sum';
    this.setValue();
  }


  // Resolve a operação

  solve(){
    this.setValue();

    switch(this.operation){
      case 'divide':
        if(this.firstValue === 0){
          this.result = '0 não é divisível';
        }else if(this.secondValue === 0){
          this.result = 'Não é possível dividir por 0';
        }else this.result = (this.firstValue / this.secondValue).toString();  
      break;
      case 'multiply':
        this.result = (this.firstValue * this.secondValue).toString();
      break;
      case 'subtract':
        this.result = (this.firstValue - this.secondValue).toString();
      break;
      case 'sum':
        this.result = (this.firstValue + this.secondValue).toString();
      break;
      default:
        this.result = 'Operação não selecionada.';
      break;  
    }
  }

  clear(){
    this.result = '0';
    this.operation = '';
    this.concat = '';
    this.firstValue = 0;
    this.secondValue = 0;
    this.pos = 0;
  }

  switchSign(){
    
  }
}
