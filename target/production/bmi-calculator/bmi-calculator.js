(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    net: Kotlin.definePackage(null, /** @lends _.net */ {
      loxal: Kotlin.definePackage(null, /** @lends _.net.loxal */ {
        example: Kotlin.definePackage(null, /** @lends _.net.loxal.example */ {
          kotlin: Kotlin.definePackage(null, /** @lends _.net.loxal.example.kotlin */ {
            bmi_calculator: Kotlin.definePackage(null, /** @lends _.net.loxal.example.kotlin.bmi_calculator */ {
              BMIcalculator: Kotlin.createClass(null, function () {
                var tmp$0, tmp$1;
                this.bmiChart_v6mn81$ = document.getElementById('bmiChart');
                this.bmiMarker_wcz4uh$ = document.getElementById('bmiMarker');
                this.weight_qkf607$ = document.getElementById('weight');
                this.height_jgqu3a$ = document.getElementById('height');
                this.metric_lu6733$ = document.getElementById('metric');
                this.imperial_wcpgkq$ = document.getElementById('imperial');
                this.heightUnitLabel_42ibty$ = document.getElementById('heightUnitLabel');
                this.weightUnitLabel_eraell$ = document.getElementById('weightUnitLabel');
                this.bmi_vhimz5$ = document.getElementById('bmiValue');
                this.lbInKg_lapmsm$ = 0.45359237;
                this.inInCm_k26ajn$ = 2.54;
                this.weightInKg_3o6di0$ = (tmp$0 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$0 : Kotlin.throwNPE();
                this.heightInCm_pyaxsr$ = (tmp$1 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$1 : Kotlin.throwNPE();
                this.isMetricMeasurement_lqs1nx$ = true;
                this.setBMIChartSize();
                this.initListeners();
                this.showBMI();
              }, /** @lends _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.prototype */ {
                initListeners: function () {
                  this.weight_qkf607$.onclick = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f(this);
                  this.weight_qkf607$.onkeyup = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f_0(this);
                  this.height_jgqu3a$.onclick = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f_1(this);
                  this.height_jgqu3a$.onkeyup = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f_2(this);
                  this.imperial_wcpgkq$.onclick = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f_3(this);
                  this.metric_lu6733$.onclick = _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator.initListeners$f_4(this);
                },
                setMetaValues: function () {
                  if (this.isMetricMeasurement_lqs1nx$) {
                    this.setMetric();
                  }
                   else {
                    this.convertMetricToImperial();
                  }
                },
                changeToMetric: function () {
                  var tmp$0, tmp$1;
                  this.metric_lu6733$.checked = true;
                  this.isMetricMeasurement_lqs1nx$ = true;
                  this.setMetricLabels();
                  var cmTooPrecise = this.convertInToCm((tmp$0 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$0 : Kotlin.throwNPE()).toString();
                  var kgTooPrecise = this.convertLbToKg((tmp$1 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$1 : Kotlin.throwNPE()).toString();
                  this.height_jgqu3a$.value = Kotlin.modules['stdlib'].kotlin.substringBefore_7uhrl1$(cmTooPrecise, '.') + '.' + Kotlin.modules['stdlib'].kotlin.substringAfter_7uhrl1$(cmTooPrecise, '.').substring(0, 2);
                  this.weight_qkf607$.value = Kotlin.modules['stdlib'].kotlin.substringBefore_7uhrl1$(kgTooPrecise, '.') + '.' + Kotlin.modules['stdlib'].kotlin.substringAfter_7uhrl1$(kgTooPrecise, '.').substring(0, 2);
                },
                changeToImperial: function () {
                  var tmp$0, tmp$1;
                  this.imperial_wcpgkq$.checked = true;
                  this.isMetricMeasurement_lqs1nx$ = false;
                  this.setImperialLabels();
                  var inTooPrecise = this.convertCmToIn((tmp$0 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$0 : Kotlin.throwNPE()).toString();
                  var lbTooPrecise = this.convertKgToLb((tmp$1 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$1 : Kotlin.throwNPE()).toString();
                  this.height_jgqu3a$.value = Kotlin.modules['stdlib'].kotlin.substringBefore_7uhrl1$(inTooPrecise, '.') + '.' + Kotlin.modules['stdlib'].kotlin.substringAfter_7uhrl1$(inTooPrecise, '.').substring(0, 2);
                  this.weight_qkf607$.value = Kotlin.modules['stdlib'].kotlin.substringBefore_7uhrl1$(lbTooPrecise, '.') + '.' + Kotlin.modules['stdlib'].kotlin.substringAfter_7uhrl1$(lbTooPrecise, '.').substring(0, 2);
                },
                calculateMetricBMI: function () {
                  this.changeToMetric();
                  this.showBMI();
                },
                calculateImperialBMI: function () {
                  this.changeToImperial();
                  this.showBMI();
                },
                calculateBMI: function () {
                  this.setMetaValues();
                  return this.weightInKg_3o6di0$ / Math.pow(this.heightInCm_pyaxsr$, 2.0) * 10000.0;
                },
                showBMI: function () {
                  var tmp$0, tmp$1;
                  var bmiValue;
                  if (this.isMetricMeasurement_lqs1nx$) {
                    bmiValue = Kotlin.modules['stdlib'].kotlin.substringBefore_7uhrl1$(this.calculateBMI().toString(), '.') + ',' + Kotlin.modules['stdlib'].kotlin.substringAfter_7uhrl1$(this.calculateBMI().toString(), '.');
                  }
                   else {
                    bmiValue = this.calculateBMI().toString();
                  }
                  this.bmi_vhimz5$.textContent = 'BMI: ' + bmiValue.substring(0, 5);
                  this.putBMImarker((tmp$0 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$0 : Kotlin.throwNPE(), (tmp$1 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$1 : Kotlin.throwNPE());
                },
                setMetric: function () {
                  var tmp$0, tmp$1;
                  this.heightInCm_pyaxsr$ = (tmp$0 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$0 : Kotlin.throwNPE();
                  this.weightInKg_3o6di0$ = (tmp$1 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$1 : Kotlin.throwNPE();
                },
                convertMetricToImperial: function () {
                  var tmp$0, tmp$1;
                  this.heightInCm_pyaxsr$ = this.convertInToCm((tmp$0 = Kotlin.safeParseDouble(this.height_jgqu3a$.value)) != null ? tmp$0 : Kotlin.throwNPE());
                  this.weightInKg_3o6di0$ = this.convertLbToKg((tmp$1 = Kotlin.safeParseDouble(this.weight_qkf607$.value)) != null ? tmp$1 : Kotlin.throwNPE());
                },
                convertCmToIn: function (cm) {
                  return cm / this.inInCm_k26ajn$;
                },
                convertKgToLb: function (kg) {
                  return kg / this.lbInKg_lapmsm$;
                },
                convertInToCm: function (inches) {
                  return inches * this.inInCm_k26ajn$;
                },
                convertLbToKg: function (lb) {
                  return lb * this.lbInKg_lapmsm$;
                },
                kgToXscale: function (kg) {
                  var chartLeftZero = 10;
                  var chartOffsetForScale = 39;
                  var kgStart = 40.0;
                  var xPerKg = 4.116;
                  var visibleWeight = kg - kgStart;
                  return chartLeftZero + chartOffsetForScale + visibleWeight * xPerKg;
                },
                cmToYscale: function (cm) {
                  var chartGround = this.bmiChart_v6mn81$.height;
                  var chartOffsetForScale = 31.5;
                  var cmStart = 148;
                  var yPerCm = 7.62;
                  var visibleHeight = cm - cmStart;
                  return chartGround - chartOffsetForScale - visibleHeight * yPerCm;
                },
                putBMImarker: function (kg, cm) {
                  var x = this.kgToXscale(kg);
                  var y = this.cmToYscale(cm);
                  this.bmiMarker_wcz4uh$.style.cssText = 'position: absolute; top: ' + y + 'px; left: ' + x + 'px;';
                },
                setBMIChartSize: function () {
                  this.bmiChart_v6mn81$.width = 590.0;
                  this.bmiChart_v6mn81$.height = 480.0;
                },
                setMetricLabels: function () {
                  this.heightUnitLabel_42ibty$.textContent = 'cm:';
                  this.weightUnitLabel_eraell$.textContent = 'kg:';
                },
                setImperialLabels: function () {
                  this.heightUnitLabel_42ibty$.textContent = 'in:';
                  this.weightUnitLabel_eraell$.textContent = 'lb:';
                }
              }, /** @lends _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator */ {
                initListeners$f: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.showBMI();
                  };
                },
                initListeners$f_0: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.showBMI();
                  };
                },
                initListeners$f_1: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.showBMI();
                  };
                },
                initListeners$f_2: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.showBMI();
                  };
                },
                initListeners$f_3: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.calculateImperialBMI();
                  };
                },
                initListeners$f_4: function (this$BMIcalculator) {
                  return function () {
                    this$BMIcalculator.calculateMetricBMI();
                  };
                }
              }),
              main: function (args) {
                new _.net.loxal.example.kotlin.bmi_calculator.BMIcalculator();
              }
            })
          })
        })
      })
    })
  });
  Kotlin.defineModule('bmi-calculator', _);
  _.net.loxal.example.kotlin.bmi_calculator.main([]);
}(Kotlin));
