import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedMetric: string = '';
  selectedSourceUnit: string = '';
  selectedTargetUnit: string = '';
  inputValue: number = 0;
  convertedValue: number = 0;

  sourceUnits: string[] = [];
  targetUnits: string[] = [];

  unitConversions: { [key: string]: { [key: string]: number } } = {
    // Konversi Panjang (meter)
    Panjang: {
      Meter: 1,
      Kilometer: 0.001,
      Centimeter: 100,
      Millimeter: 1000,
      Yard: 1.09361,
      Foot: 3.28084,
      Inch: 39.3701,
    },
    // Konversi Berat (gram)
    Berat: {
      Gram: 1,
      Kilogram: 0.001,
      Milligram: 1000,
      Ton: 0.000001,
      Pound: 0.00220462,
      Ounce: 0.035274,
    },
  };

  onMetricChange() {
    this.sourceUnits = Object.keys(this.unitConversions[this.selectedMetric]);
    this.targetUnits = Object.keys(this.unitConversions[this.selectedMetric]);
    this.selectedSourceUnit = '';
    this.selectedTargetUnit = '';
    this.inputValue = 0;
    this.convertedValue = 0;
  }


  onSourceUnitChange() {
    // Menonaktifkan opsi yang sama pada dropdown 'ke'
    this.targetUnits = this.targetUnits.filter(unit => unit !== this.selectedSourceUnit);
  
    // Reset selectedTargetUnit jika sama dengan selectedSourceUnit
    if (this.selectedSourceUnit === this.selectedTargetUnit) {
      this.selectedTargetUnit = '';
    }
  
    this.convertValue(); // Memanggil convertValue() setelah perubahan satuan
  }
  
  onTargetUnitChange() {
    // Implement any additional logic if needed when the target unit changes
  }

  convertValue() {
    if (
      this.selectedMetric &&
      this.selectedSourceUnit &&
      this.selectedTargetUnit &&
      this.inputValue !== 0
    ) {
      const sourceToMeter = this.unitConversions[this.selectedMetric][this.selectedSourceUnit];
      const targetToMeter = this.unitConversions[this.selectedMetric][this.selectedTargetUnit];
      this.convertedValue = (this.inputValue * sourceToMeter) / targetToMeter;
    } else {
      this.convertedValue = 0;
    }
  } 
}
