/*
 * Copyright 2015 Alexander Orlov <alexander.orlov@loxal.net>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.loxal.example.kotlin.bmi_calculator

import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLInputElement
import kotlin.browser.document

class BMIcalculator {
    private val bmiChart = document.getElementById("bmiChart") as HTMLImageElement
    private val bmiMarker = document.getElementById("bmiMarker") as HTMLImageElement
    private val weight = document.getElementById("weight") as HTMLInputElement
    private val height = document.getElementById("height") as HTMLInputElement
    private val metric = document.getElementById("metric") as HTMLInputElement
    private val imperial = document.getElementById("imperial") as HTMLInputElement
    private val heightUnitLabel = document.getElementById("heightUnitLabel") as HTMLElement
    private val weightUnitLabel = document.getElementById("weightUnitLabel") as HTMLElement
    private val bmi = document.getElementById("bmiValue") as HTMLDivElement
    private val lbInKg = 0.45359237;
    private val inInCm = 2.54;
    private var weightInKg: Double = safeParseDouble(weight.value)!!
    private var heightInCm: Double = safeParseDouble(height.value)!!
    private var isMetricMeasurement = true

    private fun initListeners() {
        weight.onclick = { // TODO consolidate onclick & onkeyup in something as onchange once Kotlin supports it
            showBMI()
        }

        weight.onkeyup = { // TODO consolidate onclick & onkeyup in something as onchange once Kotlin supports it
            showBMI()
        }

        height.onclick = { // TODO consolidate onclick & onkeyup in something as onchange once Kotlin supports it
            showBMI()
        }

        height.onkeyup = { // TODO consolidate onclick & onkeyup in something as onchange once Kotlin supports it
            showBMI()
        }

        imperial.onclick = {
            calculateImperialBMI()
        }

        metric.onclick = {
            calculateMetricBMI()
        }
    }

    private fun setMetaValues() {
        if (isMetricMeasurement) {
            setMetric()
        } else {
            convertMetricToImperial()
        }
    }

    private fun changeToMetric() {
        metric.checked = true
        isMetricMeasurement = true

        setMetricLabels()
        val cmTooPrecise = convertInToCm(safeParseDouble(height.value)!!).toString()
        val kgTooPrecise = convertLbToKg(safeParseDouble(weight.value)!!).toString()
        height.value = cmTooPrecise.substringBefore('.') + '.' + cmTooPrecise.substringAfter('.').substring(0, 2)
        weight.value = kgTooPrecise.substringBefore('.') + '.' + kgTooPrecise.substringAfter('.').substring(0, 2)
    }

    private fun changeToImperial() {
        imperial.checked = true
        isMetricMeasurement = false

        setImperialLabels()
        val inTooPrecise = convertCmToIn(safeParseDouble(height.value)!!).toString()
        val lbTooPrecise = convertKgToLb(safeParseDouble(weight.value)!!).toString()
        height.value = inTooPrecise.substringBefore('.') + '.' + inTooPrecise.substringAfter('.').substring(0, 2)
        weight.value = lbTooPrecise.substringBefore('.') + '.' + lbTooPrecise.substringAfter('.').substring(0, 2)
    }

    private fun calculateMetricBMI() {
        changeToMetric()
        showBMI()
    }

    private fun calculateImperialBMI() {
        changeToImperial()
        showBMI()
    }

    private fun calculateBMI(): Double {
        setMetaValues()

        return weightInKg / Math.pow(heightInCm, 2.0) * 1e4;
    }

    private fun showBMI() {
        val bmiValue: String
        if (isMetricMeasurement) {
            bmiValue = calculateBMI().toString().substringBefore('.') + ',' + calculateBMI().toString().substringAfter('.')
            // TODO l10n is not supported yet
        } else {
            bmiValue = calculateBMI().toString()
        }
        bmi.textContent = "BMI: ${bmiValue.substring(0, 5)}" // TODO good enough for 99.9% (proper rounding is not supported by Kotlin yet)
        putBMImarker(safeParseDouble(weight.value)!!, safeParseDouble(height.value)!!)
    }

    private fun setMetric() {
        heightInCm = safeParseDouble(height.value)!!
        weightInKg = safeParseDouble(weight.value)!!
    }

    private fun convertMetricToImperial() {
        heightInCm = convertInToCm(safeParseDouble(height.value)!!)
        weightInKg = convertLbToKg(safeParseDouble(weight.value)!!)
    }

    private fun convertCmToIn(cm: Double): Double {
        return cm / inInCm
    }

    private fun convertKgToLb(kg: Double): Double {
        return kg / lbInKg
    }

    private fun convertInToCm(inches: Double): Double {
        return inches * inInCm
    }

    private fun convertLbToKg(lb: Double): Double {
        return lb * lbInKg
    }

    private fun kgToXscale(kg: Double): Double {
        val chartLeftZero = 10
        val chartOffsetForScale = 39
        val kgStart = 40.0
        val xPerKg = 4.116
        val visibleWeight = kg - kgStart

        return (chartLeftZero + chartOffsetForScale) + (visibleWeight * xPerKg)
    }

    private fun cmToYscale(cm: Double): Double {
        val chartGround = bmiChart.height
        val chartOffsetForScale = 31.5
        val cmStart = 148

        val yPerCm = 7.62
        val visibleHeight = cm - cmStart

        return (chartGround - chartOffsetForScale) - (visibleHeight * yPerCm)
    }

    private fun putBMImarker(kg: Double, cm: Double) {
        val x = kgToXscale(kg)
        val y = cmToYscale(cm)

        bmiMarker.style.cssText = "position: absolute; top: ${y}px; left: ${x}px;"
    }

    init {
        setBMIChartSize()
        initListeners()

        showBMI()
    }

    private fun setBMIChartSize() {
        bmiChart.width = 590
        bmiChart.height = 480
    }

    private fun setMetricLabels() {
        heightUnitLabel.textContent = "cm:"
        weightUnitLabel.textContent = "kg:"
    }

    private fun setImperialLabels() {
        heightUnitLabel.textContent = "in:"
        weightUnitLabel.textContent = "lb:"
    }
}