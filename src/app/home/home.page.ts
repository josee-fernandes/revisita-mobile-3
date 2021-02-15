import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  values:number[] = [];
  operations:string[] = [];

  subDisplay:string = '0';
  display:string = '0';

  result:number = 0;

  settingValue:number = 0; // Responsável por controlar qual valor está sendo inserido
  firstNumber:boolean = true;


  constructor() {}


  // Concatena os números e o ponto para se tornar de fato um valor numérico depois. '1' + '.' + '2' = '1.2' = 1.2

  input(value:string){
    if(this.firstNumber){
      this.subDisplay = '0';
      this.values = [];
      this.operations = [];
      this.settingValue = 0;
      this.firstNumber = false;
    }

    if(this.display === '0') this.display = '';

    this.display += value;
  }

  // Adicionam a operação e o valor na expressão

  divide(){
    if(this.values[this.values.length-1] !== 0 || parseFloat(this.display) !== 0){
      this.operations.push('divide');
      this.values.push(parseFloat(this.display));
      
      if(this.subDisplay === '0') this.subDisplay = '';
  
      if(this.values[this.settingValue] > 0)
        this.subDisplay += `${this.values[this.settingValue]}÷`;
      else
        this.subDisplay += `(${this.values[this.settingValue]})÷`;
      this.display = '0'
      
      this.settingValue++;
    }else console.log('0 não é um valor válido em uma divisão')
  }

  multiply(){
    this.operations.push('multiply');
    this.values.push(parseFloat(this.display));

    if(this.subDisplay === '0') this.subDisplay = '';

    if(this.values[this.settingValue] > 0)
      this.subDisplay += `${this.values[this.settingValue]}×`;
    else
      this.subDisplay += `(${this.values[this.settingValue]})×`;
    this.display = '0';
    
    this.settingValue++;
  }

  subtract(){
    if(this.display == '0') this.display = '-';
    else{
      this.operations.push('subtract');
      this.values.push(parseFloat(this.display));
      
      if(this.subDisplay === '0') this.subDisplay = '';

      if(this.values[this.settingValue] > 0)
        this.subDisplay += `${this.values[this.settingValue]}-`;
      else
        this.subDisplay += `(${this.values[this.settingValue]})-`;
      this.display = '0';
      
      this.settingValue++;
    }
  }
  
  sum(){
    this.operations.push('sum');
    this.values.push(parseFloat(this.display));

    if(this.subDisplay === '0') this.subDisplay = '';

    if(this.values[this.settingValue] > 0)
      this.subDisplay += `${this.values[this.settingValue]}+`;
    else
      this.subDisplay += `(${this.values[this.settingValue]})+`;
    this.display = '0';

    this.settingValue++;
  }


  // Resolve a operação

  solve(){
    this.values.push(parseFloat(this.display));

    console.table(this.values);
    console.table(this.operations);

    let calculating = -1; // -1 : não está calculando | N > -1 : index referente ao valor e operação sendo calculado

    while(true){
      console.log(calculating);
      console.log(this.result);
      if(calculating == -1){
        this.result = this.values[0];
      }else{
        if(this.operations[calculating] == 'divide'){
          this.result /= this.values[calculating + 1];
        }else if(this.operations[calculating] == 'multiply'){
          this.result *= this.values[calculating + 1];
        }else if(this.operations[calculating] == 'subtract'){
          this.result -= this.values[calculating + 1];
        }else if(this.operations[calculating] == 'sum'){
          this.result += this.values[calculating + 1];
        }else {
          this.display = `${this.result}`;
          this.firstNumber = true;
          this.subDisplay = '';
          break;
        }
      }

      calculating++;
    }
  }

  clear(){
    this.values = [];
    this.operations = [];
    
    this.subDisplay = '0';
    this.display = '0';

    this.firstNumber = true;
    this.settingValue = 0;
  }

  switchSign(){
    this.display = `${parseFloat(this.display) * -1}`;
  }
}
